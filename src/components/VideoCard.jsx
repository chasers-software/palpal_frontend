import React from "react";
import { Link, Paper, Typography } from "@mui/material";
import { Link as BrowserLink } from "react-router-dom";
const VideoCard = ({ video }) => {
  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <Link
          component={BrowserLink}
          sx={{ textDecoration: "none", color: "inherit" }}
          to={`video/${video.videoHash}`}
        >
          <img src={video.thumbnail} height="200px" alt="" />
          <Typography>{video.title}</Typography>
        </Link>
      </Paper>
    </>
  );
};

export default VideoCard;
