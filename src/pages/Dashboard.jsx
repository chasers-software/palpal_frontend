import React, { useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import { TransactionContext } from "../context/TransactionContext";

const Dashboard = () => {
  const { getAllVideos, videosData } = useContext(TransactionContext);

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <>
      <Header />
      <Box p={2}>
        <Grid container spacing={2}>
          {videosData.map((video, index) => {
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
