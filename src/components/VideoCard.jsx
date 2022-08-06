import React from "react";
import { Box, Link, Paper, Typography } from "@mui/material";
import { Link as BrowserLink } from "react-router-dom";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const VideoCard = ({ video }) => {
  return (
    <>
      <Paper sx={{ overflow: "hidden" }}>
        <Link
          component={BrowserLink}
          sx={{ textDecoration: "none", color: "inherit" }}
          to={`video/${video?.contentId}`}
        >
          <img
            src={`https://ipfs.io/ipfs/${video?.thumbnailHash}`}
            height="200px"
            alt=""
            width="100%"
          />
          <Box p={2}>
            <Box sx={{ display: "flex", justifyContents: "flex-start" }}>
              <AccountCircleIcon size="small" />
              <Typography ml={1} component="span">
                {video.creator.substr(0, 10)}...
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContents: "flex-start" }}>
              <SmartDisplayIcon size="small" />
              <Typography ml={1} fontWeight={600}>
                {video?.title}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Paper>
    </>
  );
};

export default VideoCard;
