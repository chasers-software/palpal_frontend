import { React, useContext, useEffect } from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import { Box, IconButton, Button, Typography, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import { TransactionContext } from "../context/TransactionContext";
import { useParams } from "react-router-dom";

const WatchVideo = () => {
  const { hash, name } = useParams();
  const { getAllVideos, videosData, likeContent } =
    useContext(TransactionContext);
  const currentVideo = videosData.find(
    (video) =>
      video?.contentHash.split("/")[0] === hash &&
      video?.contentHash.split("/")[1] === name
  );
  useEffect(() => {
    getAllVideos();
  }, []);

  console.log("current video", currentVideo);
  return (
    <>
      <Header />
      {currentVideo ? (
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
              url={`https://ipfs.io/ipfs/${hash}/${name}`}
            />
            <Box pt={2}>
              <Typography variant="h4">{currentVideo.title}</Typography>
            </Box>
            <Box
              mt={1}
              mb={1}
              sx={{
                display: "flex",
                justifyContents: "flex-start",
                color: "#6d6d6e",
              }}
            >
              <AccountCircleIcon size="small" />
              <Typography ml={1} component="span">
                {currentVideo.creator.substr(0, 10)}...
              </Typography>
            </Box>
            <Typography color="#6d6d6e">
              {moment([[currentVideo.uploadDate]]).fromNow()}
            </Typography>
            <Box
              mt={2}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Box>
                <IconButton onClick={() => likeContent(currentVideo.contentId)}>
                  <ThumbUpIcon />
                </IconButton>
                <Typography component="span">
                  {currentVideo?.likeCount}
                </Typography>
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
            <Typography>{currentVideo?.commentCount} Comments</Typography>
            <Box className="comment_input" sx={{ margin: "10px auto" }}>
              <TextField size="small" label="Enter your comment"></TextField>
              <Button
                component="span"
                variant="contained"
                sx={{ display: "inline-block", marginLeft: "10px" }}
              >
                Post
              </Button>
            </Box>
            <Box className="comments">
              <Typography>Wallet Address</Typography>
              <Typography>Comment</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" alignContent="center">
          No such Video
        </Typography>
      )}
    </>
  );
};

export default WatchVideo;
