import React, { useEffect, useState } from "react";
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
  Badge,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HostelRooms = ({ handleEdit }) => {
  const navigator = useNavigate();

  const [mydata, setData] = useState([]);
  const [del, setDel] = useState();

  const handleClick = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/rooms/${id}`
      );
      // const del = mydata.filter((item) => {
      //     return mydata?._id !== item?._id;
      // })
      // setData(del)
      navigator("/");
      //   navigator("/Add-Rooms");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/hostels"
        );
        const rooms = response.data.data.flatMap((item) => item.rooms);
        setData(rooms);
        console.log(rooms, "rooms data");
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const render = mydata?.map((items) => {
    const { image, title, _id } = items;
    return (
      <>
        <Grid
          item
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            aliginItems: "center",
            // overflow: "auto",
          }}
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
        >
          <Box
            sx={{
              width: "160px",
              height: "160px",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              borderRadius: "15px",
              postion: "reletive",
            }}
          >
            <Box
              sx={{
                postion: "absolute",
                color: "white",
                backgroundColor: "black",
                marginTop: "-10px",
                zIndex: "-10",
              }}
            >
              <Typography sx={{ marginLeft: "2px" }}>{title}</Typography>
            </Box>
            <Box
              onClick={() => handleClick(_id)}
              sx={{
                cursor: "pointer",
                marginTop: "-30px",
                zIndex: "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "20px",
                width: "20px",
                postion: "relative",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                marginLeft: "92%",
                paddingTop: "1px",
              }}
            >
              x
            </Box>
            <Box
              onClick={() => {
                navigator("/edit", { state: items });
              }}
              sx={{
                transition: "all linear 0.30s",
                cursor: "pointer",
                marginLeft: "38px",
                marginTop: "60px",
                position: "absolute",
                border: "solid 1px white",
                height: "25px",
                width: "80px",
                borderRadius: "20px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Edit
            </Box>
          </Box>
        </Grid>
      </>
    );
  });

  return <Grid container>{render}</Grid>;
};

export default HostelRooms;
