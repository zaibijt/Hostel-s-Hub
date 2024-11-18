import React from "react";
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
import { useNavigate } from "react-router-dom";

const HostelCard = ({ isFilter, roomsbyhostel, data }) => {
  // console.log(roomsbyhostel,data,'dfdfdfd');
  const { image, description, city, title, map } = data;
  console.log("hostcard", data);
  const navigate = useNavigate();

  const handleClick = (rooms, map) => {
    const dataToSend = { key: rooms };
    console.log(dataToSend, "to send data");
    navigate("/roomsbyhostel", { state: { data: dataToSend, map: map } });
  };

  const handleReserved = (data) => {
    console.log(data, "data....");
    navigate("/room", { state: { data: data } });
  };

  return (
    <Box sx={{ marginTop: "15px", marginBottom: "15px" }}>
      <Card sx={{ maxWidth: 300, borderRadius: "10px", overflow: "hidden" }}>
        <Box
          sx={{
            position: "relative",
            height: "250px",
            width: "300px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            sx={{ height: "250px", width: "300px", position: "absolute" }}
            image={image}
            title="green iguana"
          />
          <Box
            sx={{
              position: "absolute",
              height: "250px",
              width: "300px",
              backgroundColor: "black",
              opacity: "0",
              display: "flex",
              justifyContent: "center",
              aliginItems: "center",
              "&:hover": {
                opacity: "0.7",
                transition: "all linear 0.30s ",
              },
            }}
          >
            <Button
              sx={{
                color: "white",
                height: "35px",
                width: "100px",
                border: "solid 1px white",
                borderRadius: "10px",
                marginTop: "40%",
              }}
            >
              View
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginLeft: "5%",
            }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ marginLeft: "5%", marginTop: "5px" }}>
            {/* {city} */}
          </Typography>
        </Box>
        <Typography
          sx={{
            width: "90%",
            marginLeft: "5%",
            textAlign: "justify",
            marginTop: "10px",
            marginBottom: "10px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
        {roomsbyhostel ? (
          <Button
            onClick={() => handleReserved(data)}
            sx={{
              width: ` 90%`,
              marginLeft: "5%",
              height: "35px",
              border: "solid 1px black",
              color: "black",
              borderRadius: "10px",
              marginBottom: "10px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                transition: "all linear 0.30s ",
              },
            }}
          >
            {" "}
            {/* {Booked ? "Reserved Now" : "Reserved Now"} */}
            View
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(data.rooms, data.map)}
            sx={{
              width: "90%",
              marginLeft: "5%",
              height: "35px",
              border: "solid 1px black",
              color: "black",
              borderRadius: "10px",
              marginBottom: "10px",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                transition: "all linear 0.30s ",
              },
            }}
          >
            {" "}
            {/* {Booked ? "View" : "view"} */}
            View Rooms
          </Button>
        )}
        <Box
          sx={{
            height: "2px",
            width: "20%",
            backgroundColor: "black",
            marginLeft: "40%",
            marginBottom: "10px",
          }}
        ></Box>
      </Card>
    </Box>
  );
};

export default HostelCard;
