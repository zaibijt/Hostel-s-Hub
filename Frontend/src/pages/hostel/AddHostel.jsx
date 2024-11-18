// AddHostel.jsx
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
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import SelectImg from "../../component/common/SelectImg/SelectImg.jsx";
import Nav from "../../component/common/nav/Nav.tsx";
import httpRequest from "../../axios/index.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Addhostels } from "../../constants/apiEndPoints/index.js";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../lib/Redux/slices/userslice.jsx";

const AddHostel = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    city: "",
    floors: "",
    number: "",
    location: "",
    description: "",
    image: "",
    map: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.name === "") {
      toast.error("Please enter name ");
      return;
    }
    if (formdata.number === "") {
      toast.error("Please enter Number ");
      return;
    }
    if (formdata.location === "") {
      toast.error("Please enter location ");
      return;
    }
    if (formdata.floors === "") {
      toast.error("Please select floors ");
      return;
    }
    if (formdata.city === "") {
      toast.error("Please Select City ");
      return;
    }
    if (formdata.description === "") {
      toast.error("Please enter description ");
      return;
    }
    if (formdata.image === "") {
      toast.error("Please upload image ");
      return;
    }

    setloading(true);
    try {
      const Response = await httpRequest.post(Addhostels, formdata, {
        headers: {
          Authorization: user?.token,
        },
      });

      if (Response.status === 200 || Response.status === 201) {
        toast.success(Response?.data?.message);
        dispatch(clearUser());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  const [area, setArea] = useState('lahore')

  return (
    <>
      <Nav />
      <Grid container>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px', marginBottom: '50px' }} item xs={12} md={6} lg={6} xl={6}>
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
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", width: "400px" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  sx={{ width: "100%" }}
                  id="name"
                  name="name"
                  label="Name"
                  variant="standard"
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", width: "400px" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  sx={{ width: "100%" }}
                  id="number"
                  name="number"
                  label="Number"
                  variant="standard"
                  onChange={handleChange}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", width: "400px" }}
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  sx={{ width: "100%" }}
                  id="location"
                  name="location"
                  label="Local Area Address"
                  variant="standard"
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ marginTop: "15px" }} fullWidth>
                  <InputLabel id="floors-label">Floors</InputLabel>
                  <Select
                    sx={{ width: "400px" }}
                    labelId="floors-label"
                    id="floors"
                    name="floors"
                    value={formdata.floors}
                    label="Floors"
                    onChange={handleChange}
                  >
                    {[...Array(12).keys()].map((floor) => (
                      <MenuItem key={floor + 1} value={floor + 1}>
                        {floor + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ marginTop: "15px" }} fullWidth>
                  <InputLabel id="city-label">City</InputLabel>
                  <Select
                    sx={{ width: "400px" }}
                    labelId="city-label"
                    id="city"
                    name="city"
                    value={formdata.city}
                    label="City"
                    onChange={handleChange}
                  >
                    {["Lahore", "Islamabad", "Gujranwala", "Multan"].map(
                      (city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                label="Description"
                id="description"
                name="description"
                variant="outlined"
                multiline
                rows={4}
                sx={{ marginTop: "15px", width: "100%" }}
                onChange={handleChange}
              />

              {/* /////// */}

              <div className="gmap_canvas" style={{
                marginTop: '20px', overflow: 'hidden', background: 'none!important', width: '100%', height: '400px',
                //  border:'2px solid yellow',
              }}>

                {/* <input  placeholder="Enter your Place" onChange={(e)=> setArea(e.target.value)} /> */}

                {/* <TextField
                  sx={{ width: "100%" }}
                  id="map"
                  name="map"
                  label="Map Address"
                  variant="standard"
                  onChange={handleChange}
                /> */}

                {/* <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Chose Your Location"
                  variant="standard"
                  value={formdata?.location}
                  onChange={handleChange}
                /> */}

                <select  id="near" name="map" value={formdata?.map} onChange={handleChange}>
                  <option value="" disabled>Near by</option>
                  <option value="all" >All</option>
                  <option value="punjab">Punjab University</option>
                  <option value="umt">UMT University</option>
                  <option value="uet">UET University</option>
                  <option value="superior">Superior University</option>
                  <option value="sargoda">Sargodha University</option>
                  <option value="ucp">UCP University</option>
                  <option value="ripha">Riphah University</option>
                  <option value="education">Education University</option>
                </select>

                <iframe
                  className="gmap_iframe"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${formdata.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  style={{ width: '100%', height: '400px', padding: '10px' }}
                  title="Google Map"
                ></iframe>

                {/* <a href="https://embed-googlemap.com">google map embed html</a> */}
              </div>

              {/* ///// */}

              <Button
                type="submit"
                disabled={loading}
                sx={{ width: "400px", marginTop: "10px" }}
                variant="contained"
                endIcon={<SendIcon />}
              >
                {loading ? <CircularProgress size={15} /> : "Add Hostel"}
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <SelectImg
              onImageUpload={(imageUrl) =>
                setFormdata({ ...formdata, image: imageUrl })
              }
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddHostel;
