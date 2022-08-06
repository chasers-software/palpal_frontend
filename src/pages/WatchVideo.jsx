import { React, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ReactPlayer from "react-player";
import {
  Box,
  IconButton,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PaidIcon from "@mui/icons-material/Paid";
import CommentIcon from "@mui/icons-material/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import { TransactionContext } from "../context/TransactionContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const WatchVideo = () => {
  const { id } = useParams();
  const {
    getAllVideos,
    videosData,
    likeContent,
    commentContent,
    giveATip,
    comments,
    getComments,
    getAllTippers,
    tipsData,
    loading,
    setLoading,
    isMining,
  } = useContext(TransactionContext);
  const [comment, setComment] = useState("");
  const [tipsOpen, setTipsOpen] = useState(false);

  const currentVideo = videosData.find(
    (video) =>
      // video?.contentHash.split("/")[0] === hash &&
      // video?.contentHash.split("/")[1] === name
      video?.contentId === Number(id)
  );

  useEffect(() => {
    setLoading(true);
    getAllVideos();
  }, []);

  useEffect(() => {
    if (currentVideo) {
      getComments(currentVideo.contentId);
    }
  }, [currentVideo]);

  useEffect(() => {
    if (currentVideo) {
      getAllTippers(currentVideo.contentId);
    }
  }, [currentVideo]);

  // function postComment() {
  //   try {
  //     commentContent(3, comment);
  //     console.log("Commetnt", comment);
  //   } catch (error) {
  //     console.log("Error on commenting", error);
  //   }
  // }
  isMining && toast.loading("Mining...", { autoClose: false });

  console.log("current video", currentVideo);
  return (
    <>
      <Header />
      {loading ? (
        <CircularProgress
          sx={{ margin: "auto", position: "absolute", top: "48%", left: "48%" }}
        />
      ) : (
        <>
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
                  url={`https://ipfs.io/ipfs/${currentVideo.contentHash}`}
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
                    {currentVideo.creator}
                  </Typography>
                </Box>
                <Typography color="#6d6d6e">
                  {moment(currentVideo.uploadDate).fromNow()}
                </Typography>
                <Box
                  mt={2}
                  sx={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Box>
                    <IconButton
                      onClick={() => likeContent(currentVideo.contentId)}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography component="span">
                      {currentVideo?.likeCount}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setTipsOpen(true);
                      }}
                    >
                      <PaidIcon />
                    </IconButton>
                    <Typography component="span">
                      {currentVideo?.tipCount}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <PaidIcon />
                    </IconButton>
                    <Button
                      onClick={() => giveATip(currentVideo.contentId)}
                      color="primary"
                      size="small"
                    >
                      Tip Creator
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box p={3} ml={5} sx={{ flex: 0.3 }}>
                <IconButton onClick={console.log("increase like")}>
                  <CommentIcon />
                </IconButton>
                <Typography>{currentVideo?.commentCount} Comments</Typography>
                <Box className="comment_input" sx={{ margin: "10px auto" }}>
                  <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    size="small"
                    label="Enter your comment"
                  ></TextField>

                  <Button
                    onClick={() =>
                      commentContent(currentVideo.contentId, comment)
                    }
                    component="span"
                    variant="contained"
                    sx={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    Post
                  </Button>
                </Box>
                {comments.map((cmt) => {
                  return (
                    <Box className="comments">
                      <Card sx={{ mb: 3 }}>
                        <CardContent>
                          <Typography fontSize={13}>{cmt[0]}</Typography>
                          <Typography fontWeight={500}>{cmt[1]}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Typography variant="h6" alignContent="center">
              No such Video
            </Typography>
          )}
          <Dialog onClose={() => setTipsOpen(false)} open={tipsOpen}>
            <DialogTitle>Tips</DialogTitle>
            {tipsData.length > 0 ? (
              <List sx={{ pt: 0 }}>
                {tipsData.map((tipper) => (
                  <ListItem key={tipper}>
                    <ListItemAvatar>
                      <Avatar>
                        <PaidIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${tipper} - 0.01 MATIC`} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <List sx={{ pt: 0 }}>
                <ListItem>
                  <ListItemText primary={`No Tips Received`} />
                </ListItem>
              </List>
            )}
          </Dialog>
        </>
      )}
    </>
  );
};

export default WatchVideo;
