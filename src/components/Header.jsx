import React, { useContext } from "react";
import "./Header.css";
import {
  AccountCircle,
  Logout,
  Menu as MenuIcon,
  Search,
  VideoCall,
} from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  Link,
  Box,
  Avatar,
  Typography,
  IconButton,
  InputBase,
  ListItemIcon,
} from "@mui/material";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";

function Header({ getSearchResults }) {
  const { logout } = useContext(TransactionContext);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/");
    logout();
  };
  return (
    <Box className="header">
      <Box className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link
          sx={{ textDecoration: "none", color: "inherit" }}
          component={BrowserLink}
          to="/"
        >
          <Typography ml={1} fontWeight={500}>
            Pal Pal
          </Typography>
        </Link>
      </Box>
      <Box className="header__input">
        <InputBase
          id="outlined-search"
          placeholder="Search Videos"
          type="search"
          size="small"
          fullWidth
          onChange={(e) => {
            getSearchResults(e.target.value);
          }}
        />
        <IconButton>
          <Search />
        </IconButton>
      </Box>
      <Box className="header__right">
        <IconButton onClick={() => navigate("/upload")}>
          <VideoCall />
        </IconButton>
        <IconButton onClick={handleClick}>
          <Avatar
            alt="Avatar"
            src="https://cdn.vox-cdn.com/thumbor/WkwPB916XqeN2jj_gK0aCEPW_RA=/0x0:1400x1050/920x613/filters:focal(662x361:886x585):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/67194273/avatar_the_last_airbender_image.0.jpeg"
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Header;
