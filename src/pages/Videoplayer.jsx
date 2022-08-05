import React, { useEffect, useContext, useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";

const Videoplayer = () => {
  return (
    <>
      <Header />
      <Container className="video-player">
        <Box className="video-player__contents">
          <iframe
            title="video-player"
            width="853"
            height="480"
            autoPlay
            src={`https://ipfs.io/ipfs/QmRbk54WHHAaTQKWRfgofreMww4sgxVgxosC6f7Z42Kh9Z`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      </Container>
    </>
  );
};

export default Videoplayer;
