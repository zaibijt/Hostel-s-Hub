import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../assests";
import toast from "react-hot-toast";
import httpRequest from "../../axios";
import { Registeruser } from "../../constants/apiEndPoints";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
    image: "",
    isOwner: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      // Update role and isOwner
      setFormData({
        ...formData,
        role: value,
        isOwner: value === "owner",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstName === "") {
      toast.error("Please Enter First Name");
      return;
    }
    if (formData.lastName === "") {
      toast.error("Please Enter Last Name");

      return;
    }
    if (formData.email === "") {
      toast.error("Please Enter Email");
      return;
    }
    if (formData.password === "" || formData.password.length < 8) {
      toast.error("Please Enter password grater then or equal to 8");
      return;
    }

    const userData = {
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      image: "https://xsgames.co/randomusers/avatar.php?g=male",
      password: formData.password,
      isOwner: formData.isOwner,
    };

    setLoading(true);
    try {
      const Response = await httpRequest.post(Registeruser, userData);

      if (Response.status === 200 || Response.status === 201) {
        toast.success(Response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
        image: "",
        isOwner: false,
      });
    }
  };

  const inputFields = [
    { name: "firstName", type: "text", label: "First Name" },
    { name: "lastName", type: "text", label: "Last Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <Grid container>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        md={6}
        lg={6}
        xl={6}
      >
        <Box
          sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            height: "100vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 800,
              textAlign: "center",
              color: "blue",
              marginBottom: "20px",
            }}
          >
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <Box
                key={field.name}
                sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  sx={{ width: "100%" }}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  variant="standard"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </Box>
            ))}

            <RadioGroup
              aria-label="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                Select role:
              </Typography>
              &nbsp;
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel
                value="owner"
                control={<Radio />}
                label="Owner"
              />
            </RadioGroup>

            <Button
              sx={{ width: "400px", marginTop: "10px", position: "relative" }}
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  size={15}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    color: "green",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}{" "}
              {!loading && "Signup"}{" "}
            </Button>
          </form>

          <Typography sx={{ marginTop: "10px" }}>
            I have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${Auth})`,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Signup;
