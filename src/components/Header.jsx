import React from "react";
import "./Header.css";
import { Menu, Search, VideoCall } from "@mui/icons-material";
import { Box, Avatar, Typography, IconButton, InputBase } from "@mui/material";

function Header() {
  return (
    <Box className="header">
      <Box className="header__left">
        <IconButton>
          <Menu />
        </IconButton>
        <Typography ml={1} fontWeight={500}>
          Pal Pal
        </Typography>
      </Box>
      <Box className="header__input">
        <InputBase
          id="outlined-search"
          placeholder="Search Videos"
          type="search"
          size="small"
          fullWidth
        />
        <IconButton>
          <Search />
        </IconButton>
      </Box>
      <Box className="header__right">
        <IconButton>
          <VideoCall />
        </IconButton>
        <IconButton>
          <Avatar
            alt="Avatar"
            src="https://cdn.vox-cdn.com/thumbor/WkwPB916XqeN2jj_gK0aCEPW_RA=/0x0:1400x1050/920x613/filters:focal(662x361:886x585):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67194273/avatar_the_last_airbender_image.0.jpeg"
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
