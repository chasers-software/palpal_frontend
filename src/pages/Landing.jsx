import React, { useContext } from "react";
import landingImage from "../images/landing.png";
import { Box, Button, Typography } from "@mui/material";
import { TransactionContext } from "../context/TransactionContext";
import Dashboard from "./Dashboard";

const Landing = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  return currentAccount ? (
    <Dashboard />
  ) : (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ display: "flex", textAlign: "center", padding: "20px" }}>
        <Box sx={{ flex: 0.5 }}>
          <Typography
            fontWeight={600}
            variant="h4"
            sx={{ marginTop: "20%", marginBottom: "20px" }}
          >
            Pal Pal: A Decentralized
            <br />
            Video sharing plaform
          </Typography>
          <img src={landingImage} width="300px" alt="landing_image" />
        </Box>
        <Box
          sx={{
            flex: 0.05,
            borderRight: "2px solid grey",
            height: "95vh",
          }}
        />

        <Box sx={{ flex: 0.45, marginTop: "20%" }}>
          <Typography fontWeight={600} variant="h4">
            Create Memories with PalPal
          </Typography>
          <Button
            sx={{ margin: "5%" }}
            onClick={connectWallet}
            variant="contained"
            color="primary"
          >
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
