import React, { useState, useContext } from "react";
import Header from "../components/Header";
import { Web3Storage } from "web3.storage";
import { API_TOKEN } from "../utils/constants";
import ReactPlayer from "react-player";
import { Box, Input, Typography, Button, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { TransactionContext } from "../context/TransactionContext";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoid, setVideoId] = useState("");
  const [videoname, setVideoname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [thumbnailId, setThumbnailId] = useState("");

  const { uploadVideoData } = useContext(TransactionContext);

  function getFiles(event) {
    event.preventDefault();
    const fileInput = event.target;
    setVideo(fileInput.files[0]);
    setVideoname(fileInput.files[0].name);
  }
  function getThumbnail(event) {
    event.preventDefault();
    const fileInput = event.target;
    setThumbnailName(fileInput.files[0].name);
    setThumbnail(fileInput.files[0]);
  }

  function makeStorageClient() {
    return new Web3Storage({ token: API_TOKEN });
  }
  //upload title, thumbnail, video in ipfs
  async function storeFiles() {
    try {
      const client = makeStorageClient();
      const cid = await client.put([video]);
      setVideoId(cid);
      console.log("stored files with cid:", cid);
      const thumbnailid = await storeThumbnail();
      setThumbnailId(thumbnailid);
      console.log("cid for thumb", thumbnailid);

      const contentHash = cid + `/${videoname}`;
      const thumbnailHash = thumbnailid + `/${thumbnailName}`;
      const detailHash = JSON.stringify({
        title: title,
        description: description,
        uploadDate: new Date(),
      });

      uploadVideoData(contentHash, thumbnailHash, detailHash);

      return cid;
    } catch (error) {
      console.log("Error storing files:", error);
    }
  }

  async function storeThumbnail() {
    try {
      const client = makeStorageClient();
      const cid = await client.put([thumbnail]);
      console.log("thubnail cid:", cid);
      console.log("TITLE:", title);

      // some function to store on blockchain

      return cid;
    } catch (error) {
      console.log("Error storing thumbnail:", error);
    }
  }
  const handleUpload = () => {
    console.log(video, thumbnail, title);
    if (video && thumbnail && title && !isSubmitted) {
      setIsSubmitted(true);
      storeFiles();
    } else {
      window.alert("All fields are requried!");
    }
  };

  return (
    <>
      <Header />
      <Box pl={5} sx={{ display: "flex" }}>
        <Paper elevation={3}>
          <Box
            p={5}
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              flex: 0.4,
            }}
          >
            <Box>
              <Typography mb={1}>Upload Video</Typography>
              <input
                required
                type="file"
                accept="video/*"
                label="Video"
                onChange={getFiles}
              />
            </Box>
            <Box>
              <Typography mb={1}>Choose thumbnail</Typography>
              <input
                required
                type="file"
                accept="image/*"
                label="Thumbnail"
                onChange={getThumbnail}
              />
            </Box>
            <Box>
              <TextField
                required
                label="Video Title"
                variant="outlined"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
              />
            </Box>
            <Box>
              <TextField
                label="Video Description"
                variant="outlined"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </Box>
            <Button variant="contained" onClick={handleUpload}>
              {isSubmitted ? (
                videoid && thumbnailId ? (
                  <Typography>Uploaded</Typography>
                ) : (
                  <>
                    <Typography mr={5}>Uploading...</Typography>
                    <CircularProgress sx={{ color: "#ffff" }} />
                  </>
                )
              ) : (
                <Typography>Upload</Typography>
              )}
            </Button>
          </Box>
        </Paper>
        <Box sx={{ flex: 0.2 }}></Box>
        <Box
          sx={{
            justifyContent: "center",
            alignContent: "center",
            flex: 0.4,
          }}
        >
          {videoid && thumbnailId ? (
            <ReactPlayer
              controls
              url={`https://ipfs.io/ipfs/${videoid}/${videoname}`}
              light={`https://ipfs.io/ipfs/${thumbnailId}/${thumbnailName}`}
            />
          ) : (
            <Typography>Upload Video to Watch it Here.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default VideoUpload;
