import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Table } from "react-bootstrap";
import user from "../../assests/images/AuthPic.jpg";
import { UserRooms } from "../../constants/apiEndPoints/index.js";
import httpRequest from "../../axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import RoomsCards from "../Cards/index.jsx";
import Nav from "../common/nav/Nav.tsx";
import { FaCircleUser } from "react-icons/fa6";

import { FaTimes } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [AllRooms, setAllrooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const Response = await httpRequest.get(UserRooms, {
          headers: {
            Authorization: user?.token,
          },
        });

        if (Response.status === 200 || Response.status === 201) {
          setAllrooms(Response?.data?.data?.bookedRooms);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
      }
    };

    fetchRooms();
  }, []);

  // console.log(user.user.hostel._id,'user....');

  return (
    <>
      <Nav />

      <Grid container>
        <Grid
          className="bg-cover"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "55vh",
            backgroundColor: "gray",
          }}
        >
          <Typography sx={{ marginTop: "20px", color: "white" }} variant="h4">
            {user?.user?.name} {user?.user?.lastName}
          </Typography>
          {/* <Typography
            sx={{ marginTop: "5px", color: "white" }}
            variant="h6"
          ></Typography> */}
          <div
            className="person-img"
            style={{
              backgroundColor: "white",
              height: "120px",
              width: "120px",
              borderRadius: "50%",
              transform: "translateY(150px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <FaCircleUser style={{ fontSize: "120px" }} /> */}
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-120px",
            // border:'solid 1px red'
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              backgroundImage: `url(${user})`,
              backgroundSize: "cover",
              // border:'solid 1px red'
            }}
          ></Box>
        </Grid>
        <Box sx={{ width: "86%", marginLeft: "7%", marginTop: "-100px" }}>
          <Typography sx={{ marginTop: "20px" }} variant="h4">
            My Booked Rooms
          </Typography>
          <Typography sx={{ marginTop: "20px", width: "80%" }} variant="h6">
            There are your rooms which you booked!
          </Typography>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginTop: "50px", marginBottom: "50px" }}
          >
            {" "}
            {AllRooms
              ? AllRooms.map((Rooms) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      xl={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RoomsCards username={user} Rooms={Rooms} />
                    </Grid>
                  );
                })
              : "No Rooms Found"}
          </Grid>
          {/* <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>PAID</th>
              </tr>
            </thead>
            <tbody> */}
          {/* {orders.map((order) => ( */}
          {/* <tr>
                <td></td>
                <td></td>
                <td> */}
          {/* {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )} */}
          {/* paid */}
          {/* </td>
              </tr> */}
          {/* ))} */}
          {/* </tbody>
          </Table> */}
        </Box>
      </Grid>
    </>
  );
};

export default Profile;
