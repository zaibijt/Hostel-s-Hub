import React, { useEffect, useRef, useState } from "react";
import { Box, Drawer, Button } from "@mui/material/";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login.tsx";
import Home from "./pages/home/Home.tsx";
import Signup from "./component/auth/Singup.tsx";
import AddHostel from "./pages/hostel/AddHostel.jsx";
import YourHostel from "./pages/hostel/YourHostel.jsx";
import toast, { Toaster } from "react-hot-toast";
import { PublicRoute } from "./routes/PublicRoute.jsx";
import { PrivateRoute } from "./routes/PrivateRoute.jsx";
import Profile from "./component/profile/Profile.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import RoomsOne from "./pages/roomsone/RoomsOne.jsx";
import Roomsbyhostel from "./pages/roomsbyhostel/Roomsbyhostel.jsx";
import Editrooms from "./pages/editroom/Editrooms.jsx";
import Thankyou from "./pages/Thnakyou/Thankyou.jsx";
import { Filter, Payment } from "@mui/icons-material";
import FilterRooms from "./pages/filterrooms/FilterRooms.jsx";
import Chatbot from "./pages/chatbot/Chatbot.jsx";
import { FloatButton } from "antd";
import { TbMessageChatbot } from "react-icons/tb";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./component/Payment";
import axios from "./axios/index.js";
import Forgot from "./component/forgot/Forgot.jsx";
import EnterEmail from "./component/EnterEmial/EnterEmail.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import About from "./pages/about/About.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";

const stripePromise = loadStripe(
  "pk_test_51PIuE506w2DqiReyelDFmfX4r8w5Y8tVwG5vJLqvG5gvsyb8OFa7jztvNd60v0M0h8gg7HQZqxd3B84vqCZh3w2l00NRcgm2Z8"
);

const App = () => {
  const qaList = [
    { quest: "What is the color of a banana?", ans: "Yellow" },
    { quest: "How many days are there in a week?", ans: "Seven" },
    { quest: "what is the location of umt university", ans: "Township" },
    // Add more questions and answers here
  ];

  const normalizeString = (str) => {
    return str.trim().toLowerCase().replace(/\s+/g, " ");
  };

  const levenshtein = (a, b) => {
    const matrix = [];

    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  const findClosestMatch = (input, qaList) => {
    const normalizedInput = normalizeString(input);
    let closestMatch = null;
    let minDistance = Infinity;

    for (const qa of qaList) {
      const normalizedQuest = normalizeString(qa.quest);
      const distance = levenshtein(normalizedInput, normalizedQuest);
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = qa;
      }
    }

    return closestMatch;
  };

  /////////////////////////

  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);

  const InputRef = useRef();

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const BotRes = (Res) => {
    var newAnswer = {
      bot: true,
      text: Res,
    };
    return newAnswer;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const obj = {
      contents: [
        {
          parts: [
            {
              text: userInput,
            },
          ],
        },
      ],
    };

    var newAnswer = {
      bot: false,
      text: userInput,
    };
    setAnswer((prevAnswers) => [...prevAnswers, newAnswer]);
    const Resp = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCk9IgtqWNgkMJbnenp5CT8JjDSCB0Q3o8",
      obj
    );

    console.log(Resp?.data?.candidates[0]?.content?.parts[0]?.text, "res");

    setTimeout(() => {
      const data = BotRes(Resp?.data?.candidates[0]?.content?.parts[0]?.text);
      setAnswer((prevAnswers) => [...prevAnswers, data]);
      setLoading(false);
    }, 1000);
    InputRef.current.value = "";
  };

  //////

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const messages = answer?.map((items) => {
    const { bot, text } = items;
    return (
      <>
        <Box
          sx={{
            marginLeft: bot ? "5%" : "24%",
            width: "70%",
            height: "max-contnet",
            padding: "10px",
            backgroundColor: bot ? "lightgray" : "black",
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
            marginBottom: "5px",
            // border:'5px solid green',
            borderRadius: bot ? "0px 15px 15px 15px" : "15px 0px 15px 15px",
          }}
        >
          <h1
            style={{
              fontSize: "12px",
              color: bot ? "black" : "white",
              borderRaduis: "50px",
              marginBottom: "3px",
            }}
          >
            {bot ? "HostelHub" : "You"}
          </h1>
          <p style={{ color: bot ? "black" : "white" }}>{text}</p>
        </Box>
      </>
    );
  });

  const answersEndRef = useRef();

  const scrollToBottom = () => {
    if (answersEndRef.current) {
      console.log(answersEndRef.current, "sdf");
      answersEndRef.current.scrollTop = answersEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [answer, handleSubmit]);

  return (
    <>
      {/* /////// */}

      <FloatButton icon={<TbMessageChatbot />} onClick={showDrawer} />

      <Drawer
        title="Basic Drawer"
        style={{
          padding: "10px",
          //  border:'4px solid green',
        }}
        placement={"right"}
        onClose={onClose}
        open={open}
      >
        <Box
          sx={{
            // marginTop: '4vh',
            // padding: '5px',
            width: "350px",
            //  backgroundColor: 'black',
            display: "flex",
            height: "90vh",
            flexDirection: "column",
            justifyContent: "space-between",
            // border:'4px solid red',
          }}
        >
          <Box
            sx={{
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              // border:'4px solid black',
              //  backgroundColor:'black',
              //  color:'white',
              // padding:'5px 0'
            }}
          >
            <h1>ChatBot</h1>
          </Box>
          <Box
            ref={answersEndRef}
            sx={{
              height: "90%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              //  border:'1px solid black',
              borderRight: "0",
              marginBottom: "10px",
              paddingTop: "5px",
            }}
          >
            {messages}
          </Box>
          <Box
            sx={{
              height: "10%",
              // border:'4px solid yellow',
              //  marginTop:'20px'
            }}
          >
            {/* <h5 style=`${loading}` >{loading ? 'Bot Cheating ...' : ''}</h5> */}
            <h5>{loading ? "Answering ..." : ""}</h5>

            <textarea
              ref={InputRef}
              onChange={handleInputChange}
              placeholder="type here ...."
              style={{
                width: "95%",
                marginLeft: "2.5%",
                //  border:'4px solid aqua',
                height: "40px",
              }}
            ></textarea>
            <Button
              onClick={handleSubmit}
              sx={{
                marginTop: "5px",
                border: "solid 1px black",
                color: "white",
                width: "95%",
                marginBottom: "20px",
                marginLeft: "2.5%",
                background: "black",
                "&:hover": {
                  color: "black",
                },
                //  color:'white',
                //  border:'4px solid brown',
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* /////// */}

      <Box>
        <Routes>
          <Route
            path="/edit"
            element={
              // <PublicRoute type="user">
              <Editrooms />
              // </PublicRoute>
            }
          />

          <Route
            path="/forgot"
            element={
              <PublicRoute type="user">
                <Forgot />
              </PublicRoute>
            }
          />

          <Route
            path="/enteremail"
            element={
              <PublicRoute type="user">
                <EnterEmail />
              </PublicRoute>
            }
          />

          <Route
            path="/payment"
            element={
              // <PublicRoute type="user">
              <CheckoutForm />
              // </PublicRoute>
            }
          />

          <Route
            path="/bot"
            element={
              // <PublicRoute type="user">
              <Chatbot />
              // </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute type="user">
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              // <PublicRoute>
              <Home />
              // </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/room"
            element={
              // <PublicRoute>
              <RoomsOne />
              // </PublicRoute>
            }
          />

          <Route
            path="/thnaks"
            element={
              // <PublicRoute>
              <Thankyou />
              // </PublicRoute>
            }
          />

          <Route
            path="/filter"
            element={
              // <PublicRoute>
              <FilterRooms />
              // </PublicRoute>
            }
          />

          <Route
            path="/About"
            element={
              // <PublicRoute>
              <AboutPage />
              // </PublicRoute>
            }
          />

          <Route
            path="/Contact"
            element={
              // <PublicRoute>
              <ContactPage />
              // </PublicRoute>
            }
          />

          <Route
            path="/roomsbyhostel"
            element={
              // <PublicRoute>
              <Roomsbyhostel />
              // </PublicRoute>
            }
          />

          <Route
            path="/addhostel"
            element={
              <PrivateRoute>
                <AddHostel />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/Add-Rooms" element={<YourHostel />} />
        </Routes>
        <Toaster />
      </Box>
    </>
  );
};

export default App;
