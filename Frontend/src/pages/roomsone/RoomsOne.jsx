import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import user from "../../assests/images/AuthPic.jpg";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import httpRequest from "../../axios";
import { BookRoom } from "../../constants/apiEndPoints";
import Nav from "../../component/common/nav/Nav.tsx";
import { TiStarFullOutline } from "react-icons/ti";
import { HiMiniUserCircle } from "react-icons/hi2";
import Footer from "../../component/common/footer/Footer.tsx";
import Rating from "../../component/Rating/Rating.jsx";
import "./style.css";

const RoomsOne = () => {
  const { state } = useLocation();
  const [loading, setloading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [duration, setDuration] = useState("1 Month");

  // console.log(state?.data?.price, 'state data');

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const calculatePrice = () => {
    if (duration === "1 Month") {
      return state?.data?.price * 1;
    }
    return state?.data?.price;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    e.preventDefault();
    setloading(true);
    const obj = {
      roomId: state?.data?._id,
      userId: user?.user?._id,
      user: user?.user,
      price: calculatePrice(),
      title: state?.data?.title,
    };

    navigate("/payment", { state: { data: obj } });

    try {
      const Response = await httpRequest.post(BookRoom, obj, {
        headers: {
          Authorization: user?.token,
        },
      });

      if (Response.status === 200 || Response.status === 201) {
        if (Response?.data?.message === "Access denied. No token provided.") {
          toast.success(Response?.data?.message);
          // console.log('asdfsf');
          // navigate('/login');
        } else {
          // toast.success(Response?.data?.message);
        }
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      navigate("/login");
    } finally {
      setloading(false);
    }
  };

  const Starsnumber = (number) => {
    const stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(<TiStarFullOutline style={{ color: "yellow" }} key={i} />);
    }
    return stars;
  };

  const reviws = state?.data?.reviews.map((items) => {
    const { userfirstname, userlastname, text } = items;
    return (
      <>
        <Box
          sx={{
            width: "95%",
            marginTop: "10px",
            display: "flex",
            justifyContent: "start",
            marginBottom: "4px",
          }}
        >
          <Box sx={{ height: "50px", width: "9%", borderRaduis: "50%" }}>
            <HiMiniUserCircle
              style={{
                height: "35px",
                width: "35px",
                color: "gray",
                marginTop: "-5px",
                marginLeft: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              minHeight: "50px",
              width: "91%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontWeight: "700",
                  // border: 'solid 1px orange',
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                {userfirstname}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "5px",
                  fontWeight: "700",
                  color: "#fff",
                  // border: 'solid 1px blue',
                  textTransform: "capitalize",
                }}
              >
                {userlastname}
              </Typography>
            </Box>

            {/* <Rating value={parseInt(rating)} /> */}
            <Typography
              sx={{
                textAlign: "justify",
                color: "#fff",
                // border: 'solid 1px green',
              }}
            >
              {text}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            // border: 'solid 1px green',
            width: "86%",
            marginLeft: "4%",
          }}
        ></Box>
      </>
    );
  });

  const RatingStars = ({ data }) => {
    const sum = state?.data?.rating.reduce((t, r) => t + parseInt(r.rating), 0);
    const average = sum / state?.data?.rating.length;
    const number = Math.floor(average);
    return (
      <>
        <div style={{ display: "flex", width: "100px" }}>
          <div style={{ posion: "relative", width: "90%" }}>
            <div style={{ position: "absolute" }}>
              <TiStarFullOutline style={{ color: "gray" }} />
              <TiStarFullOutline style={{ color: "gray" }} />
              <TiStarFullOutline style={{ color: "gray" }} />
              <TiStarFullOutline style={{ color: "gray" }} />
              <TiStarFullOutline style={{ color: "gray" }} />
            </div>
            <div style={{ position: "absolute" }}>
              {number === 0 ? Starsnumber(5) : Starsnumber(number)}
            </div>
          </div>
          <div style={{ marginTop: "-3px" }}>
            ({state?.data?.reviews.length})
          </div>
        </div>
      </>
    );
  };

  const data = [
    {
      name: "Security",
      check: true,
    },
    {
      name: "Neat And Clean",
      check: true,
    },
    {
      name: "Wifi",
      check: true,
    },
    {
      name: "Flexible Area",
      check: true,
    },
    {
      name: "Furniture",
      check: true,
    },
    {
      name: "Kicten",
      check: true,
    },
    {
      name: "Parking",
      check: true,
    },
    {
      name: "Daily Mess",
      check: true,
    },
    {
      name: "ElectricCity Avalbility",
      check: true,
    },
    {
      name: "Cooling Assets (AC)",
      check: true,
    },

    {
      name: "Wall Painted",
      check: true,
    },
    {
      name: "Clean Envirment",
      check: true,
    },
    {
      name: "Air Conditionar",
      check: true,
    },
    {
      name: "Clean Envirment",
      check: true,
    },
    {
      name: "Breakfast",
      check: true,
    },
    {
      name: "Lunch",
      check: true,
    },
  ];
  <h2>Google Map</h2>
  const tags = data.map((items) => {
    const { name } = items;
    return (
      <>
        <div
          style={{
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "#EDEDED",
            padding: "10px",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <h1 style={{ fontSize: "10px" }}>{name}</h1>
        </div>
      </>
    );
  });

  return (
    <>
      <Nav />
      <Grid
        sx={{
          marginTop: "-100px",
          // border:'12px solid red',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          marginLeft: "10%",
          marginBottom: "20px",
          backgroundColor: "rgba(255,255,255,0.2)",
          padding: "20px",
          boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.2)",
        }}
        container
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // border:'12px solid gray',
            height: "600px",
          }}
        >
          <Box
            sx={{
              // marginTop: "20px",
              width: "480px",
              height: "450px",
              backgroundImage: `url(${state?.data?.image})`,
              backgroundSize: "cover",
              // border:'12px solid yellow'
            }}
          ></Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexDirection: "column",

            paddingTop: "140px",
            // border:'1px solid orange',
            // height:'400px'
          }}
        >
          <Typography
            className="content"
            sx={{
              marginTop: "20px",
              //  border:'12px solid orange',
              textTransform: "uppercase",
              fontSize: "25px",
              fontWeight: "bold",
              color: "black",
            }}
            variant="h4"
          >
            {state?.data?.title}
          </Typography>
          <Typography
            sx={{
              marginTop: "5px",
              marginBottom: "10px",
              //  border:'2px solid green',
              fontSize: "18px",
              textTransform: "capitalize",
              color: "black  ",
            }}
            variant="h6"
          >
            Capacity: {state?.data?.capacity} person
          </Typography>
          {/* Duration */}
          <InputLabel id="duration-label">Duration</InputLabel>
          <Select
            sx={{
              width: "100%",
              // border:'2px solid pink',
              height: "50px",
            }}
            labelId="duration-label"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleDurationChange}
          >
            <MenuItem value="1 Month">1 Month</MenuItem>
            <MenuItem disabled value="1 Year">
              1 Year
            </MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              //  border:'12px solid yellowgreen'
            }}
          >
            <Button
              disabled={loading}
              sx={{
                marginTop: "10px",
                height: "35px",
                width: "200px",
                border: "solid 1px black",
                color: "black",
                borderRaduis: "15px",
                //  border:'2px solid brown',
              }}
              onClick={handleSubmit}
            >
              {loading ? "Boking..." : "Book Now"}
            </Button>
            <Box
              sx={{
                marginTop: "8px",
                marginLeft: "15px",
                // minWidth: "100px",
                backgroundColor: "black",
                borderRaduis: "15px",
                padding: "5px 10px",
                color: "white",
                //  border:'1px solid skyblue',
                height: "35px",
              }}
            >
              {/* {`${duration === "1 Year" ? "12 * 25" : "1 * 25"
                } = ${calculatePrice()} $`} */}
              <div
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  //  border:'1px solid aqua',
                  height: "100%",
                }}
              >
                <p style={{ color: "white", paddingTop: "5px" }}>
                  {state?.data?.price} Rupess
                </p>
                <p
                  style={{
                    display: "flex",
                    color: "white",
                    marginLeft: "10px",
                    paddingTop: "5px",
                  }}
                >
                  Per Month
                </p>
              </div>
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px" }}>{RatingStars(state?.data)}</Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
              // border:'12px solid red',
              height: "160px",
            }}
          >
            <Typography
              sx={{ marginTop: "10px", fontSize: "16px", fontWeight: "600" }}
            >
              Reviews ({state?.data.reviews.length})
            </Typography>
            <Box
              sx={{
                marginTop: "10px",
                width: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                backgroundColor: "rgba(0,0,0,0.5)",
                // border: "2px solid blue",
              }}
            >
              {reviws}
            </Box>
          </Box>
          <Typography
            sx={{ marginTop: "10px", fontSize: "16px", fontWeight: "600" }}
          >
            Reviews stars (Each users)
          </Typography>
          {state?.data?.rating.map((reviews) => (
            <Rating
              value={reviews.rating}
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            />
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // border:'2px solid blue',
            // borderTop:'1px solid gray'
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
              // border:'2px solid green',
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                marginTop: "20px",
                border: "0px solid red",
                //  borderBottom:'1px solid gray',
                width: "200px",
                padding: "0",
                paddingBottom: "5px",
              }}
              variant="h4"
            >
              Description:
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
                width: "80%",
                //  border:'2px solid pink',
              }}
              variant="h6"
            >
              {state?.data?.description}
              {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex culpa qui perferendis exercitationem, pariatur officia excepturi placeat corrupti accusamus quo. Quos aspernatur suscipit vero vitae beatae assumenda saepe optio odit! */}
            </Typography>
          </Box>

          <div
            className="gmap_canvas"
            style={{
              marginTop: "20px",
              overflow: "hidden",
              background: "none!important",
              width: "100%",
              height: "400px",
              //  border:'2px solid yellow',
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>{tags}</div>

            <h2>Google Map</h2>
            <iframe
              className="gmap_iframe"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${state?.data?.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
              style={{ width: "100%", height: "400px", padding: "10px" }}
              title="Google Map"
            ></iframe>

            {/* <a href="https://embed-googlemap.com">google map embed html</a> */}
          </div>
        </Box>
      </Grid>
      <Footer />
    </>
  );
};

export default RoomsOne;
