import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import moment from "moment";

const VideoInfo = ({ title, date, likes, dislikes }) => {
  return (
    <div className="singleVideo__videoInfo">
      <div className="singleVideo__container">
        <div className="singleVideo__videoTitle">
          <h2>{title}</h2>
          <span className="videoCard__timestamp">{moment(date).fromNow()}</span>
        </div>
        <div className="singleVideo__buttons">
          <div className="singleVideo_reviews">
            <div className="singleVideo__thumbs">
              <Button startIcon={<ThumbUpAltIcon />}>{likes}</Button>
              <Button startIcon={<ThumbDownIcon />}>{dislikes}</Button>
            </div>
          </div>
          <Button className="invertIcon" startIcon={<AttachMoneyIcon />}>
            Donate
          </Button>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
