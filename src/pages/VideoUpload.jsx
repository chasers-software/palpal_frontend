import React, { useState, useContext } from "react";
import Header from "../components/Header";
import { Web3Storage } from "web3.storage";
import { API_TOKEN } from "../utils/constants";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { TransactionContext } from "../context/TransactionContext";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoid, setVideoId] = useState("");
  const [videoname, setVideoname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <>
      <Header />
      <div>
        <div>Video Upload</div>;
        <input
          type="file"
          accept="video/*"
          name="video"
          onChange={getFiles}
        ></input>
        Choose thumbnail
        <input
          type="file"
          accept="image/*"
          name="video"
          onChange={getThumbnail}
        ></input>
        <TextField
          label="Video Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
        />
        <TextField
          label="Video Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="off"
          inputProps={{ style: { fontSize: 15 } }}
          InputLabelProps={{ style: { fontSize: 15, color: "GrayText" } }}
        />
        <button onClick={storeFiles}>Upload</button>
      </div>

      <div>Watch Video</div>
      {videoid && thumbnailId ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ReactPlayer
            controls
            url={`https://ipfs.io/ipfs/${videoid}/${videoname}`}
            light={`https://ipfs.io/ipfs/${thumbnailId}/${thumbnailName}`}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default VideoUpload;
