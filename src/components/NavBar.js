import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "./UserContext";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../styles/customStyles.css";

const NavBar = () => {
  const { user, logout } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="animated-navbar">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          My Site
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <IconButton
                onClick={handleMenu}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  Welcome, {user.username}
                </Typography>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link
                to="/"
                style={{
                  marginRight: theme.spacing(2),
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
              <Link
                to="/register"
                style={{
                  marginRight: theme.spacing(2),
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Login
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
