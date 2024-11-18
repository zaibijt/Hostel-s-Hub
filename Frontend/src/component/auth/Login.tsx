import React, { useState } from "react";
import Grid from "@mui/material/Grid";
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
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { Auth } from "../../assests";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import httpRequest from "../../axios";
import { loginuser } from "../../constants/apiEndPoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/Redux/slices/userslice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "") {
      toast.error("Please enter email");
      return;
    }
    if (formData.password === "") {
      toast.error("Please enter password");
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    };
    setLoading(true);
    try {
      const Response = await httpRequest.post(loginuser, userData);

      if (Response.status === 200 || Response.status === 201) {
        toast.success(Response?.data?.message);
        dispatch(setUser(Response?.data?.data));
        navigate("/home");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6} xl={6} sx={{}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <Box
                key={field.name}
                sx={{ display: "flex", alignItems: "flex-end", width: "400px" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  sx={{ width: "100%" }}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  required
                  type={field.type}
                  variant="standard"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </Box>
            ))}

            <Button
              sx={{ width: "400px", marginTop: "10px" }}
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
              {!loading && "Login"}{" "}
            </Button>
          </form>

          <Typography sx={{ marginTop: "10px" }}>
            I have no account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
          <Typography>
          <Link to="/enteremail" style={{ textDecoration: "none" }}>
              Forgot Password
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

export default Login;
