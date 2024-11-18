import React, { useState } from "react";
import {
  Drawer,
  List,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import NavItems from "./NavItems.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../lib/Redux/slices/userslice.jsx";
import hostelhublogo from "../../../assests/images/hostelhublogo.png";
import { LinkContainer } from "react-router-bootstrap";
import { NavDropdown } from "react-bootstrap";
const Nav = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [open, setOpen] = useState(false);
  const [ShowProfileDrop, setShowProfileDrop] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <NavItems intoDrawer={true} />
      </List>
    </Box>
  );

  // console.log(user.user.isOwner, 'user ....');

  const navigate = useNavigate();

  return (
    <>
      <Box>
        <AppBar position="static" sx={{}}>
          <Toolbar sx={{ backgroundColor: "black" }}>
            {isMdScreen && (
              <IconButton
                onClick={toggleDrawer(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <LinkContainer to="/" style={{ cursor: "pointer" }}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <img
                  src={hostelhublogo}
                  alt="description"
                  style={{ height: "70px", width: "80px" }}
                />
              </Box>
            </LinkContainer>

            {!isMdScreen && <NavItems intoDrawer={false} />}
            {user?.user?.hostel ? (
              <Link to={"/Add-Rooms"}>
                <Button
                  color="inherit"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ color: "#fff" }}
                >
                  Add Rooms
                </Button>
              </Link>
            ) : !user?.user?.isOwner ? (
              <a
                href="#hostels"
                style={{
                  display: "block",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  border: "solid 1px white",
                  color: "white",
                }}
              >
                Book Now
              </a>
            ) : (
              <Link to={"/addhostel"}>
                <Button
                  color="inherit"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ color: "#fff" }}
                >
                  Add Hostel
                </Button>
              </Link>
            )}

            {isAuthenticated && user !== null ? (
              <div style={{ position: "relative" }}>
                <Button
                  color="inherit"
                  onClick={() => setShowProfileDrop(!ShowProfileDrop)}
                  startIcon={<PersonIcon />}
                  sx={{ color: "#fff" }}
                >
                  {user?.user?.name + " " + user?.user?.lastName}
                </Button>
                {ShowProfileDrop && (
                  <div
                    style={{
                      width: "100%",
                      padding: "20px",
                      backgroundColor: "white",
                      position: "absolute",
                      left: "0",
                      top: "100%",
                      color: "black",
                      zIndex: 1,
                      borderRadius: "6px",
                    }}
                  >
                    {/* <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/profile"}
                    > */}
                    <LinkContainer
                      to="/profile"
                      style={{ marginBottom: "5px" }}
                    >
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {/* <p style={{ cursor: "pointer" }}>Profile</p>
                    </Link> */}
                    {/* <p style={{ cursor: "pointer" }} onClick={handleLogout}>
                      Logout
                    </p> */}

                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <Button
                  color="inherit"
                  startIcon={<PersonIcon />}
                  sx={{ color: "#fff" }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
    </>
  );
};

export default Nav;
