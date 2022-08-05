import React from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";

const WatchVideo = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ReactPlayer
          controls
          url="https://ipfs.io/ipfs/bafybeih5ggkymjjsxisyqpvavqzhmmvygtdtrbu5s4hmprhrnjicxo5lau/2.mp4"
        />
      </Box>
    </>
  );
};

export default WatchVideo;
