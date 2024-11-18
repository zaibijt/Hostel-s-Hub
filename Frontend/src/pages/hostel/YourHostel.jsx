import React, { useState } from "react";
import axios from "../../axios/index.js";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Button,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  CardMedia,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import Popup from "../../component/muicomponent/Popup.tsx";
import { Auth } from "../../assests/index.jsx";
import { useSelector } from "react-redux";
import HostelRooms from "./HostelRooms.jsx";
import Nav from "../../component/common/nav/Nav.tsx";
import Footer from "../../component/common/footer/Footer.tsx";

const YourHostel = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [allroomsbyid, setAllroomsbyid] = React.useState([]);

  React.useEffect(() => {
    // setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/hostels"
        );
        setAllroomsbyid(response.data.data);
        console.log(response.data.data, "dddd");
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [editdata, setEditdata] = useState();
  const [editmode, setEditMode] = useState();

  const handleEdit = (items) => {
    setOpen(true);
    setEditdata(items);
    setEditMode(true);
  };

  return (
    <>
      <Nav />
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            // border:'10px solid red',
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              height: "80vh",
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "10px solid blue",
            }}
            item
            xs={6}
          >
            <Box
              sx={{
                // backgroundSize: "cover",
                backgroundImage: `url(${user?.user?.hostel?.image})`,
                height: "100%",
                width: "100%",
                backgroundSize: "100% 100%",
                // border: "10px solid blue",
              }}
            ></Box>
          </Grid>
          <Grid
            sx={{
              height: "60%",
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // border: "10px solid blue",
              overflowY: "auto",
            }}
            item
            xs={6}
          >
            <HostelRooms handleEdit={handleEdit} />
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
                fontWeight: 700,
                ":hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={handleClickOpen}
            >
              Add Rooms
            </Button>
            <Popup
              editmode={editmode}
              editdata={editdata}
              open={open}
              setOpen={setOpen}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default YourHostel;
