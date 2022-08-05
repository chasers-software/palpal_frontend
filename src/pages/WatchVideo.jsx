import React from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import { Box, IconButton, Button, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment";

const WatchVideo = () => {
  return (
    <>
      <Header />
      <Box p={5} sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          p={3}
          sx={{
            flex: 0.7,
          }}
        >
          <ReactPlayer
            width="100%"
            controls
            url="https://ipfs.io/ipfs/bafybeih5ggkymjjsxisyqpvavqzhmmvygtdtrbu5s4hmprhrnjicxo5lau/2.mp4"
          />
          <Box pt={2}>
            <Typography variant="h4">Video Title</Typography>
          </Box>
          <Box mt={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography component="span">
              {moment([[2007, 0, 29]]).fromNow()}
            </Typography>
            <Box>
              <IconButton onClick={console.log("increase like")}>
                <ThumbUpIcon />
              </IconButton>
              <Typography component="span">Like Count</Typography>
            </Box>

            <Button color="primary" variant="contained" size="small">
              Tip Creator
            </Button>
          </Box>
        </Box>
        <Box p={3} ml={5} sx={{ flex: 0.3 }}>
          <IconButton onClick={console.log("increase like")}>
            <CommentIcon />
          </IconButton>
          <Typography>Comments</Typography>
        </Box>
      </Box>
    </>
  );
};

export default WatchVideo;
