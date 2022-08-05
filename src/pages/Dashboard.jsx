import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
const dummyVideos = [
  {
    thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
    title:
      "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
    description:
      "Watch the official music video for Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] by Shakira Listen to Shakira: https://Shakira.lnk.to/listen_YD",
    thumbnailHash: "0x001",
    videoHash: "0x002",
  },
  {
    thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
    title:
      "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
    description:
      "Watch the official music video for Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] by Shakira Listen to Shakira: https://Shakira.lnk.to/listen_YD",
    thumbnailHash: "0x001",
    videoHash: "0x002",
  },
  {
    thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
    title:
      "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
    description:
      "Watch the official music video for Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] by Shakira Listen to Shakira: https://Shakira.lnk.to/listen_YD",
    thumbnailHash: "0x001",
    videoHash: "0x002",
  },
  {
    thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
    title:
      "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
    description:
      "Watch the official music video for Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] by Shakira Listen to Shakira: https://Shakira.lnk.to/listen_YD",
    thumbnailHash: "0x001",
    videoHash: "0x002",
  },
  {
    thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
    title:
      "Shakira - Waka Waka (This Time for Africa) (The Official 2010 FIFA World Cup™ Song)",
    description:
      "Watch the official music video for Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] by Shakira Listen to Shakira: https://Shakira.lnk.to/listen_YD",
    thumbnailHash: "0x001",
    videoHash: "0x002",
  },
];

const Dashboard = () => {
  return (
    <>
      <Header />
      <Box p={2}>
        <Grid container spacing={2}>
          {dummyVideos.map((video, index) => {
            return (
              <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
                <VideoCard video={video} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
