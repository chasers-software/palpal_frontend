import React, { useState } from "react";
import Header from "../components/Header";
import { Web3Storage } from "web3.storage";
import { API_TOKEN } from "../utils/constants";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoid, setVideoId] = useState("");
  const [videoname, setVideoname] = useState("");

  function getFiles(event) {
    event.preventDefault();
    const fileInput = event.target;
    setVideo(fileInput.files[0]);

    // videoid = storeFiles(fileInput.files);
    // videoname = fileInput.files[0].name;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: API_TOKEN });
  }
  async function storeFiles() {
    try {
      const client = makeStorageClient();
      const cid = await client.put([video]);
      console.log("stored files with cid:", cid);
      return cid;
    } catch (error) {
      console.log("Error storing files:", error);
    }
  }
  return (
    <>
      {/* <Header /> */}
      <div>Video Upload</div>;
      <input type="file" name="video" onChange={getFiles}></input>
      <button onClick={storeFiles}>Upload</button>
      {
        // TODO: add react player to automatically play upladede video
      }
      <div>Watch Video</div>
      {
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ReactPlayer
            controls
            url={`https://ipfs.io/ipfs/${videoid}/${videoname}`}
          />
        </Box>
      }
    </>
  );
};

export default VideoUpload;
