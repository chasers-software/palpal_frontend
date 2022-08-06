import React, { useState } from "react";
import Header from "../components/Header";
import { Web3Storage } from "web3.storage";
import { API_TOKEN } from "../utils/constants";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoid, setVideoId] = useState("");
  const [videoname, setVideoname] = useState("");

  function getFiles(event) {
    event.preventDefault();
    const fileInput = event.target;
    setVideo(fileInput.files[0]);
    setVideoname(fileInput.files[0].name);

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
      setVideoId(cid);
      console.log("stored files with cid:", cid);
      return cid;
    } catch (error) {
      console.log("Error storing files:", error);
    }
  }
  return (
    <>
      <Header />
      <div>Video Upload</div>;
      
      <input type="file" name="video" onChange={getFiles}></input>
      <button onClick={storeFiles}>Upload</button>
      {
        // TODO: add react player to automatically play upladede video
      }
      <div>Watch Video</div>
      {videoid?    <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ReactPlayer
            controls
            url={`https://ipfs.io/ipfs/${videoid}/${videoname}`}
            light='https://placehold.it/640x360.jpg'

          />
        </Box> : <Box sx={{ display: 'flex',justifyContent: "center" }}>
        <ReactPlayer
            controls
            url={`https://ipfs.io/ipfs/bafybeig4u7vl7l26umcebftwy55qh7fi5y4w7pgysrshfdf3iqelej5bpi/Venice_5.mp4`}
            light='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'

          />
    </Box>}


      {
        // <Box sx={{ display: "flex", justifyContent: "center" }}>
        //   <ReactPlayer
        //     controls
        //     url={`https://ipfs.io/ipfs/${videoid}/${videoname}`}
        //   />
        // </Box>
      }
    </>
  );
};

export default VideoUpload;
