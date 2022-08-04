import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const VideoCard = ({ video }) => {
  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <img src={video.thumbnail} height="200px" alt="" />
        <Typography>{video.title}</Typography>
      </Paper>
    </>
  );
};

export default VideoCard;
