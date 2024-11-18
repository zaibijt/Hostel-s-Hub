import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Auth } from "../../assests";
import './Paralex.css'
import Slider from "react-slick";
import { TiStarFullOutline } from "react-icons/ti";

const Paralex = () => {
  const img = 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600'


  const sliderdata = [
    {
      img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

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

  const items = sliderdata.map((items) => {
    return (
      <>
        <Box
          sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Corrected from alignItmes to alignItems
            flexDirection: 'column',
          }}
        >

          <Box
            sx={{
              borderRadius: '50%', // Corrected from borderRaduis to borderRadius
              height: '70px',
              width: '70px',
              backgroundImage:`url(${items.img})`,
              backgroundSize:'cover',
              backgroundPosition:'center',
            }}
          ></Box>
          <h1 style={{ marginTop: '10px',color:'white' }} >Json David</h1>
           <div style={{display:'flex', color:'yellow' }} ><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /><TiStarFullOutline /></div>
          <p style={{color:'white', fontStyle: 'italic', lineHeight: '25px', width: '50%', textAlign: 'center', marginTop: '20px', display: 'flex' }} > <span style={{ fontSize: '40px', transform: 'translateY(-20px)' }} >"</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis est sint eius quidem nulla. Neque exercitationem ducimus perferendis quaerat et, non quo provident itaque obcaecati ea debitis vitae officiis alias? <span style={{ fontSize: '40px', transform: 'translateY(70px)' }} >"</span> </p>
        </Box>
      </>
    );
  });

  return (
    <>
      {/* <Box
        sx={{
          backgroundAttachment: "fixed",
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            opacity: "0.7",
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        ></Box>
        <Box
          sx={{
            width: "86%",
            position: "absolute",
            height: "max-content",
            paddingTop: "10px",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{ width: "86%", textAlign: "center", color: "white" }}
          >
            Discover comfort and affordability with our hostel booking service. Whether you're a solo traveler or in a group, our carefully curated hostels offer a welcoming atmosphere and modern amenities. Choose from a variety of locations worldwide, each providing a unique cultural experience. Book now for a budget-friendly stay without compromising on quality.
          </Typography>
          <Button
            sx={{
              border: "solid 1px white",
              borderRadius: "15px",
              color: "white",
              transition: "all linear 0.30s",
              marginTop: "20px",
            }}
          >
            On Development
          </Button>
        </Box>
      </Box> */}

      <Box
        sx={{
          // position: "absolute",
          // zIndex: "-40",
          position:'relative',
          height: "100vh",
          width: "100%",
          backgroundImage: 'url(https://images.pexels.com/photos/5137980/pexels-photo-5137980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div style={{ backgroundColor: 'black', opacity: '0.5', width: '100%', height: '100%', zIndex: '20', position: 'absolute' }} ></div>
        <div style={{ width: '100%', height: '100%', position: 'absolute',zIndex:'25' }} >
          <Slider {...settings}>{items}</Slider>
        </div>
      </Box>

    </>
  );
};

export default Paralex;
