import React, { useState, useEffect } from "react";
import Nav from "../../component/common/nav/Nav.tsx";
import { Box } from "@mui/material";
import HomeSlider from "./HomeSlider.tsx";
import HostelCard from "../hostel/HostelCard.tsx";
import AllRooms from "../rooms/RoomsTab.tsx";
import About from "../about/About.tsx";
import Paralex from "../../component/paralex/Paralex.tsx";
import Primiumslider from "../../component/primuim/Primiumslider.jsx";
import Footer from "../../component/common/footer/Footer.tsx";
import hostelhublogo from "../../assests/images/hostelhublogo.png";

const Home = () => {
  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000); // Slight delay to ensure the CSS transition applies correctly

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const data = () => {
    if (mainLoading) {
      return (
        <Box
          sx={{
            backgroundColor: "black",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <>
            <img src={hostelhublogo} />
            <div style={styles.progressBarContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: loaded ? "100%" : "0%",
                }}
              ></div>
            </div>
          </>
        </Box>
      );
    } else {
      return (
        <>
          <Nav />
          <HomeSlider />
          <About />
          <Paralex />
          <Box sx={{ marginTop: "29px", marginBottom: "50px" }}>
            <Primiumslider />
          </Box>
          <AllRooms />
          <Footer />
        </>
      );
    }
  };

  return <>{data()}</>;
};

const styles = {
  progressBarContainer: {
    width: "60%",
    backgroundColor: "black",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBar: {
    height: "5px",
    backgroundColor: "white",
    borderRadius: "5px",
    transition: "width 3s",
  },
};

export default Home;
