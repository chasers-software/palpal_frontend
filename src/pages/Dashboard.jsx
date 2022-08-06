import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import { TransactionContext } from "../context/TransactionContext";

const Dashboard = () => {
  const { getAllVideos, videosData, loading, setLoading } =
    useContext(TransactionContext);
  const [allVideos, setAllVideos] = useState(videosData);

  const getSearchResults = (searchText) => {
    const videos = videosData.filter(
      (video) =>
        video.title.toLowerCase().includes(searchText.toLowerCase()) ||
        video.creator.includes(searchText)
    );
    setAllVideos(videos);
  };

  useEffect(() => {
    setAllVideos(videosData);
  }, [videosData]);

  useEffect(() => {
    setLoading(true);
    getAllVideos();
  }, []);

  return (
    <>
      <Header getSearchResults={getSearchResults} />
      {loading ? (
        <CircularProgress
          sx={{ margin: "auto", position: "absolute", top: "48%", left: "48%" }}
        />
      ) : (
        <>
          <Box p={2}>
            <Grid container spacing={2}>
              {allVideos.map((video, index) => {
                return (
                  <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
                    <VideoCard video={video} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
