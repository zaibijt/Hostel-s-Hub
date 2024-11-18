import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav from "../../component/common/nav/Nav.tsx";
import HostelCard from "../hostel/HostelCard";
import axios from "../../axios";
import { IoFilter } from "react-icons/io5";
import { Select } from "antd";
import styles from "./FilterRooms.css";
// import { Footer } from 'antd/es/layout/layout';
import Footer from "../../component/common/footer/Footer.tsx";

const FilterRooms = () => {
  const [Rooms, setAllRooms] = useState();
  const [filterdata, setFilterdata] = useState();
  const [searchedData, setSearchedData] = useState([]);
  const [inputval, setInputval] = useState();
  const [applay, setApplay] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [value, setValue] = useState(5000);
  const [but1, setBut1] = useState(false);
  const [but2, setBut2] = useState(false);
  const [but3, setBut3] = useState(false);
  const [menu, setMenu] = useState();

  // const handleChangeMenu = (e) => {
  //     setMenu(e.target.value)
  // }

  const handleButton = (type) => {
    if (type === "b1") {
      setBut1(true);
      setBut2(false);
      setBut3(false);
    }
    if (type === "b2") {
      setBut1(false);
      setBut2(true);
      setBut3(false);
    }
    if (type === "b3") {
      setBut1(false);
      setBut2(false);
      setBut3(true);
    }
  };

  const [location, setLocation] = useState();

  const img =
    "https://images.unsplash.com/photo-1586214601498-4dbcfd0bf2c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zdGVsfGVufDB8fDB8fHww";

  useEffect(() => {
    const Getalldata = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/rooms");
        // console.log(response.data.data, 'get all rooms');
        setAllRooms(response.data.data);
        setFilterdata(response.data.data);
        setLocation(response.data.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    Getalldata();
  }, []);

  const renderHostelCard =
    Rooms === null || Rooms === undefined
      ? "no data found"
      : Rooms.length <= 0
      ? "loading"
      : searchedData?.length >= 1
      ? searchedData?.map((items) => (
          <>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={items._id}
            >
              <HostelCard isFilter={true} roomsbyhostel={items} data={items} />
            </Grid>
          </>
        ))
      : filterdata?.map((items) => (
          // <div>
          //     <img src={items.image} />
          // </div>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={items._id}
          >
            <HostelCard isFilter={true} roomsbyhostel={items} data={items} />
          </Grid>
        ));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // console.log(value, 'value,,,,');
  };

  const handleCheckboxChange1 = (e) => {
    setCheck1(!check1);
  };
  const handleCheckboxChange2 = (e) => {
    setCheck2(!check2);
  };
  const handleCheckboxChange3 = (e) => {
    setCheck3(!check3);
  };

  const handleinput = (e) => {
    var storedData = filterdata;

    setInputval(e.target.value);
    if (e.target.value.length <= 0 || null) {
      setSearchedData([]);
      setFilterdata(filterdata);
    } else {
      // if (e.target.value !== '') {
      const filteredData = storedData?.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedData(filteredData);
      // console.log(searchedData, 'search....');
      // } else {
      //     setFilterdata(storedData)
      //     // setSearchedData(storedData);
      // }
    }
  };

  const ByCategory = () => {
    const fdata = Rooms.filter((item) => {
      switch (true) {
        // case !check1 && !check2 && !check3:
        //     return item;
        case check1 && check2 && check3:
          return ["simple", "standard", "premium"].includes(item.category);
        case check1 && check2:
          return ["simple", "standard"].includes(item.category);
        case check1 && check3:
          return ["simple", "standard"].includes(item.category);
        case check2 && check3:
          return ["simple", "standard"].includes(item.category);
        case check1:
          return item.category === "simple";
        case check3:
          return item.category === "premium";
        case check2:
          return item.category === "standard";
        default:
          return item; // No filtering
      }
    });
    return fdata;
    // console.log(fdata, 'by category');
  };

  const ByRatting = (valuedata) => {
    var filteredArr;
    if (!but1 && !but2 && !but3) {
      return (filteredArr = valuedata);
    } else {
      // console.log('eee');
      const filteredArr = valuedata.filter((item) => {
        // console.log(item, 'ra');
        if (item.rating.length > 0) {
          // console.log('inot ');
          const averageRating =
            item.rating.reduce((sum, curr) => sum + curr.rating, 0) /
            item.rating.length;
          console.log(Math.floor(averageRating), "avv");
          // return averageRating <= (but1 ? 2 : but2 ? 4 : but3 ? 5 : 5 );
          if (but3) {
            return Math.floor(averageRating) === 5;
          }
          if (but2) {
            return (
              Math.floor(averageRating) >= 3 && Math.floor(averageRating) <= 4
            );
          }
          if (but1) {
            return (
              Math.floor(averageRating) >= 1 && Math.floor(averageRating) <= 3
            );
          }
        }
        // return item
      });
      return filteredArr;
    }
  };

  const ByMinValue = (categorydata) => {
    const filtered = !categorydata
      ? Rooms
      : categorydata.filter((item) => item.price <= value);
    return filtered;
  };

  const handleApplay = () => {
    const categorydata = ByCategory();
    const valuedata = ByMinValue(categorydata);
    const ratingdata = ByRatting(valuedata);
    setLocation(categorydata);
    setFilterdata(ratingdata);
    // setApplay(true)
  };

  const handleRemove = () => {
    setSearchedData([]);
    setBut1(false);
    setBut2(false);
    setBut3(false);
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setValue(5000);
    setInputval(null);
    setFilterdata(Rooms);
  };

  const handleChangeMenu = (e) => {
    var Fdata = filterdata;
    var data;
    var newValue = e.target.value;

    if (newValue === "all") {
      console.log(location, "location data");
      setFilterdata(location);
      console.log(filterdata, "all if");
    } else {
      console.log("not all if ");
      data = Fdata?.filter((items) => {
        return newValue === items.near;
      });
      setFilterdata(data);
    }
  };

  return (
    <>
      <Nav />
      <Box
        className="banner-img"
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            opacity: "0.5",
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" sx={{ color: "white" }}>
            Your Simple Rooms
          </Typography>
          {/* <div className="container" style={{ width: '70%', textAlign: 'center', marginTop: '15px' }}>
                        <form>
                            <div className="wrapper">
                                <div className="search-container">
                                    <select style={{ width: '40%', paddingLeft: '10px', }} id="near" name="near" class="select" onChange={handleChangeMenu}>
                                        <option value="all">Select Your University</option>
                                        <option value="punjab">Punjab university</option>
                                        <option value="umt">Umt university</option>
                                        <option value="uet">Uet university</option>
                                        <option value="superior">Superior university</option>
                                        <option value="sargoda">Sargoda university</option>
                                        <option value="ucp">Ucp university</option>
                                        <option value="ripha">Ripha university</option>
                                        <option value="education">Education university</option>
                                    </select>
                                    <input type="text" className="date-from input" placeholder="Check In > Check Out" />
                                    <input type="text" className="date-to input" placeholder="Number of people" />
                                    <button type="submit" className="button">Search</button>
                                </div>
                            </div>
                        </form>
                    </div> */}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "65px",
          width: "80%",
          marginLeft: "10%",
          // border: "10px solid green",
          marginBottom: "65px",
        }}
      >
        <Box sx={{}}>
          <Grid container sx={{}}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alginItems: "center",
                background: "black",
                color: "white",
                height: "57px",
                borderRadius: "12px 0 12px 0",
                // margin: "0 20px 0 0 ",
              }}
            >
              <h3 className="find-room" style={{ marginTop: "15px" }}>
                Find Your Fav Rooms
              </h3>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Box
                sx={{
                  width: "94%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TextField
                  value={inputval}
                  onChange={handleinput}
                  placeholder="Search Here ...."
                  sx={{ width: "100%", marginBottom: "20px" }}
                />
              </Box>
              {/* <Box sx={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center',border:'3px solid green' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <IoonClick={handleClick} style={{ fontSize: '20px', cursor: 'pointer' }} />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Booked</MenuItem>
                                    <MenuItem onClick={handleClose}>UnBooken</MenuItem>
                                </Menu>
                            </Box> */}
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          sx={
            {
              // border: '3px solid red',
            }
          }
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
            }}
          >
            <Box
              className="filter-box"
              sx={{
                borderRadius: "1px",
                // border: 'solid 1px gray',
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "max-content",
              }}
            >
              <Button
                onClick={handleRemove}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  marginTop: "-20px",
                  "&:hover": {
                    backgroundColor: "black", // Set hover background color to transparent
                  },
                }}
              >
                Clear Filters
              </Button>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alginItems: "center",
                  flexDirection: "column",
                  border: "1px solid lightgray",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <h5 className="filter-heading">By Rating</h5>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alginItems: "center",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    onClick={() => handleButton("b1")}
                    sx={{
                      width: "100%",
                      border: "solid 1px lightgray ",
                      color: but1 ? "white" : "black",
                      backgroundColor: but1 ? "black" : "white",
                    }}
                  >
                    Lowest
                  </Button>
                  <Button
                    onClick={() => handleButton("b2")}
                    sx={{
                      width: "100%",
                      border: "solid 1px lightgray ",
                      color: but2 ? "white" : "black",
                      backgroundColor: but2 ? "black" : "white",
                    }}
                  >
                    Good
                  </Button>
                  <Button
                    onClick={() => handleButton("b3")}
                    sx={{
                      width: "100%",
                      border: "solid 1px lightgray ",
                      color: but3 ? "white" : "black",
                      backgroundColor: but3 ? "black" : "white",
                      fontSize: "13px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Excelent
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alginItems: "center",
                  flexDirection: "column",
                  border: "1px solid lightgray",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <h5 className="filter-heading">By Price</h5>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="filter-range">From 5000</div>
                  <input
                    className="input"
                    defaultValue="5000"
                    value={value}
                    onChange={handleChange}
                    style={{ height: "2px", background: "black" }}
                    type="range"
                    min="5000"
                    max="30000"
                  />
                  <div className="filter-range">To 30000</div>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alginItems: "center",
                  width: "100%",
                  flexDirection: "column",
                  border: "1px solid lightgray",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alginItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h5 className="filter-heading">By Category</h5>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alginItems: "center",
                    }}
                  >
                    <input
                      checked={check1}
                      onChange={(e) => handleCheckboxChange1(e)}
                      type="checkbox"
                    />
                    <Box sx={{ marginLeft: "5px" }}> Simple</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alginItems: "center",
                    }}
                  >
                    <input
                      checked={check2}
                      onChange={(e) => handleCheckboxChange2(e)}
                      type="checkbox"
                    />
                    <Box sx={{ marginLeft: "5px" }}>Standard</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alginItems: "center",
                    }}
                  >
                    <input
                      checked={check3}
                      onChange={(e) => handleCheckboxChange3(e)}
                      type="checkbox"
                    />
                    <Box sx={{ marginLeft: "5px" }}>Primuim</Box>
                  </Box>
                </Box>
              </Box>
              <Box
                onClick={handleApplay}
                sx={{
                  marginTop: "25px",
                  cursor: "pointer",
                  height: "30px",
                  width: "100%",
                  border: "solid 1px black",
                  // borderRaduis: "12px 0",
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  alginItems: "center",
                  padding: "5px 10px",
                }}
              >
                Apply
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={12} sm={12} md={8} lg={8} xl={8} sx={{}}>
            {/* <div className = 'gallery' > */}
            {renderHostelCard}
            {/* </div> */}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default FilterRooms;
