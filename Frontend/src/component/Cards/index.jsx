import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import "./Cards.css";
import toast from "react-hot-toast";
import axios from "../../axios";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsEmojiFrownFill } from "react-icons/bs";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";

export default function RoomsCards({ Rooms, username }) {
  const navigator = useNavigate();

  console.log(Rooms, "rooms data");

  const [isOpen, setIsOpen] = React.useState(false);
  const [Rating, setRating] = React.useState(0);
  const [Text, setText] = React.useState();
  const [roomid, setRoomid] = React.useState();
  const [Experice, setExperice] = React.useState(null);

  const handleLeave = (id) => {
    console.log(id, "id");
    setIsOpen(true);
    setRoomid(id);
  };

  const handleRating = (rating) => {
    setRating(rating);
    setExperice(rating);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    // console.log(,'text');
    if (Rating === 0 || Text.length <= 0) {
      toast.error("Please Fill All Fields");
    } else {
      console.log(username?.user, "uername");
      const obj = {
        rating: Rating,
        text: Text,
        roomId: roomid,
        userId: username?.user?._id,
        userfirstname: username?.user?.name,
        userlastname: username?.user?.lastName,
      };
      const response = await axios.post(
        "http://localhost:8000/api/v1/unbooked",
        { obj }
      );
      console.log(response.data.message, "response");
      if (response.data) {
        toast.success("Send Review Successfully");
        setTimeout(() => {
          navigator("/thnaks");
        }, 2500);
      }
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  // const handlehover = (event) => {
  //   console.log(event, "event");
  //   if (Rating === 0) {
  //     setExperice(event);
  //   } else {
  //     setExperice(Rating);
  //   }
  // };

  return (
    <>
      <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Send Your Review And Rating Before Leaving
          </Typography>
          {/* <div
            class="rate"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              onClick={() => handleRating("5")}
              type="radio"
              id="star5"
              name="rate"
              value="5"
            />
            <label
              onMouseLeave={() => handlehover(null)}
              onMouseEnter={() => handlehover("5")}
              for="star5"
              title="text"
            >
              5 stars
            </label>
            <input
              onClick={() => handleRating("4")}
              type="radio"
              id="star4"
              name="rate"
              value="4"
            />
            <label
              onMouseLeave={() => handlehover(null)}
              onMouseEnter={() => handlehover("4")}
              for="star4"
              title="text"
            >
              4 stars
            </label>
            <input
              onClick={() => handleRating("3")}
              type="radio"
              id="star3"
              name="rate"
              value="3"
            />
            <label
              onMouseLeave={() => handlehover(null)}
              onMouseEnter={() => handlehover("3")}
              for="star3"
              title="text"
            >
              3 stars
            </label>
            <input
              onClick={() => handleRating("2")}
              type="radio"
              id="star2"
              name="rate"
              value="2"
            />
            <label
              onMouseLeave={() => handlehover(null)}
              onMouseEnter={() => handlehover("2")}
              for="star2"
              title="text"
            >
              2 stars
            </label>
            <input
              onClick={() => handleRating("1")}
              type="radio"
              id="star1"
              name="rate"
              value="1"
            />
            <label
              onMouseLeave={() => handlehover(null)}
              onMouseEnter={() => handlehover("1")}
              for="star1"
              title="text"
            >
              1 star
            </label>
          </div> */}
          {/* ////// */}
          <Box
            sx={{
              height: "60px",
              paddingTop: "20px",
              display: "flex",
              justify: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
              {" "}
              {Experice === "1"
                ? " Very Bad"
                : Experice === "2"
                ? "Bad"
                : Experice === "3"
                ? "Good"
                : Experice === "4"
                ? "Very Good"
                : Experice === "5"
                ? "Excelent"
                : null}
            </Typography>
            {Experice === "1" ? (
              <BsEmojiFrownFill
                style={{ color: "#F7C800", fontSize: "40px" }}
              />
            ) : Experice === "2" ? (
              <BsEmojiNeutralFill
                style={{ color: "#F7C800", fontSize: "40px" }}
              />
            ) : Experice === "3" ? (
              <BsEmojiSmileFill
                style={{ color: "#F7C800", fontSize: "40px" }}
              />
            ) : Experice === "4" ? (
              <BsFillEmojiLaughingFill
                style={{ color: "#F7C800", fontSize: "40px" }}
              />
            ) : Experice === "5" ? (
              <BsFillEmojiHeartEyesFill
                style={{ color: "#F7C800", fontSize: "40px" }}
              />
            ) : null}
          </Box>

          <Form>
            <Form.Group className="my-2" controlId="rating">
              <Form.Label style={{ fontWeight: "bold" }}>Rating</Form.Label>
              <Form.Control
                as="select"
                required
                style={{
                  width: "300%",
                  marginLeft: "-100%",
                }}
                // value={rating}
                onChange={(e) => handleRating(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Box>

        <Box
          sx={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <textarea
            onChange={handleChange}
            style={{
              outline: "none",
              borderRadius: "5px",
              paddingTop: "10px",
              paddingLeft: "10px",
              width: "40%",
            }}
            rows={5}
            placeholder="Enter Your Review"
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              width: "150px",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Box>
      </Drawer>
      {/* /// */}
      <Card
        sx={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
          width: "250px",
          minHeight: "300px",
          borderRadius: "10px",
        }}
      >
        <>
          <CardMedia
            sx={{ height: 140 }}
            image={Rooms?.image}
            title="Room Image"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {Rooms?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Rooms?.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {Rooms?.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Floors: {Rooms?.floors}
            </Typography>
          </CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handleLeave(Rooms?._id)}
              style={{
                cursor: "pointer",
                width: "100px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              Leave
            </button>
          </Box>
        </>
      </Card>
    </>
  );
}
