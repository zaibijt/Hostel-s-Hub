import React, { useEffect } from "react";
import Slider from "react-slick";
import './HomeSlider.css'
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
  Paper,
  InputBase,
  Divider,
} from "@mui/material";
import "./Home.css";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import MenuItems from "../../component/muicomponent/MenuItems.tsx";
import { useNavigate } from "react-router-dom";

export default function HomeSlider() {

  const navigate = useNavigate()

  var settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const city = [
    { title: "lahore" },
    { title: "multan" },
    { title: "gujrawala" },
    { title: "islamabad" },
  ];

  const sliderdata = [
    {
      img: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?q=80&w=1495&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      img: "https://cdn.pixabay.com/photo/2018/06/27/07/45/college-student-3500990_1280.jpg",
    },
    {
      img: "https://images.pexels.com/photos/5137980/pexels-photo-5137980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const items = sliderdata.map((items) => {
    return (
      <>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${items.img})`,
            backgroundSize: "cover",
          }}
        ></Box>
      </>
    );
  });

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: "-20",
          backgroundColor: "black",
          opacity: "0.7",
          height: "100vh",
          width: "100%",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: "-40",
          height: "100vh",
          width: "100%",
        }}
      >
        <Slider {...settings}>{items}</Slider>
      </Box>
      <Box
        sx={{
          postion: "absolute",
          width: "100%",
          height: "100vh",
          zIndex: "40",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'column'
        }}
      >


        <Typography sx={{ color: 'white', fontSize: '35px', textTransform:'uppercase', fontWeight:'600', textAlign:'center', padding:'10px', width:'90%'}} >
        HostelHub connects students with hostels
        </Typography>
        <Typography sx={{ color: 'white', fontSize: '16px', marginTop:'10px', width:'55%', textAlign:'center'}} >We are providing comprehensive platform designed to seamlessly connect students with a wide range of hostel accommodations.</Typography>
        <Button onClick={() => navigate('/filter')} sx={{
          '&:hover': {
            backgroundColor: 'black',color:'white' // Change background color on hover
          }, backgroundColor: 'white', color: 'black', marginTop: '40px',padding:'10px 20px', 
        }} >Let's Go</Button>
        <div className="container">
  <div className="chevron"></div>
  <div className="chevron"></div>
  <div className="chevron"></div>
</div>


        {/* <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
            marginTop: "-25px",
            height: "55px",
            backgroundColor: "transparent",
            border: "solid 2px white",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuItems homeslider={true} data={city} />
          </IconButton>
          <Divider />
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search Your Hostel"
            inputProps={{ "aria-label": "google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
        </Paper> */}
      </Box>
      {/* <Box className="mouse"></Box> */}
    </Box>
  );
}
