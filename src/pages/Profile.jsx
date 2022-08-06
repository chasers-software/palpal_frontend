import React, { useContext } from "react";
import Header from "../components/Header";
import { Typography, Grid, Avatar, Paper } from "@mui/material";
import { TransactionContext } from "../context/TransactionContext";

const Profile = () => {
  const { currentAccount } = useContext(TransactionContext);
  return (
    <>
      <Header />
      <Paper
        elevation={1}
        style={{
          padding: 30,
          height: "75vh",
          width: "85vw",
          margin: "100px auto",
        }}
      >
        <Grid container>
          <Grid item sx={{ my: "1rem", ml: "10px" }}>
            <Avatar
              src="https://cdn.vox-cdn.com/thumbor/WkwPB916XqeN2jj_gK0aCEPW_RA=/0x0:1400x1050/920x613/filters:focal(662x361:886x585):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67194273/avatar_the_last_airbender_image.0.jpeg"
              alt="passportPhoto"
              sx={{ width: 300, height: 300 }}
            />
          </Grid>
          <Grid item sx={{ my: "1rem", ml: "160px" }}>
            <Typography variant="h4">Account Details</Typography>
            <br />

            <div>
              <Typography variant="h6" color="#67696b">
                Wallet Address
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currentAccount}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Profile;
