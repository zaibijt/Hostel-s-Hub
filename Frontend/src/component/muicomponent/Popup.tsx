import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import SelectImg from "../common/SelectImg/SelectImg.jsx";
import { useSelector } from "react-redux";
import httpRequest from "../../axios";
import { AddRoom } from "../../constants/apiEndPoints/index.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './Popup.css';
interface Iprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editdata: any;
  editmode: boolean;
}

const Popup = ({ open, setOpen, editdata, editmode }: Iprops) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: editmode ? editdata.title : "",
    description: editmode ? editdata.description : "",
    capacity: editmode ? editdata.capacity : "",
    floors: editmode ? editdata.floors : "",
    category: editmode ? editdata.category : "",
    image: editmode ? editdata.image : "",
    hostelId: user?.user?.hostel?._id,
    price: editmode ? editdata.price : "",
    location: editmode ? editdata.location : '',
    near: editmode ? editdata.near : '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {

    setLoading(true);
    try {
      const Response = await httpRequest.post(AddRoom, formData, {
        headers: {
          Authorization: user?.token,
        },
      });

      console.log(Response, 'response.... when add room');


      if (Response.status === 200 || Response.status === 201) {
        toast.success(Response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle >Add Rooms </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              variant="standard"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
           <Grid item xs={12} sm={6}>
      <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' }, '&:hover fieldset': { border: 'none' }, '&.Mui-focused fieldset': { border: 'none' }, '& .MuiSelect-select': { borderBottom: '1px solid', borderBottomColor: 'gray',borderRadius:'0px' } } }}>
        <InputLabel id="capacity-label">Capacity</InputLabel>
        <Select
          labelId="capacity-label"
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        >
          <MenuItem value={1}>1 Person</MenuItem>
          <MenuItem value={2}>2 Person</MenuItem>
          <MenuItem value={3}>3 Person</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
    </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' }, '&:hover fieldset': { border: 'none' }, '&.Mui-focused fieldset': { border: 'none' }, '& .MuiSelect-select': { borderBottom: '1px solid', borderBottomColor: 'gray',borderRadius:'0px' } } }}>
              <InputLabel id="floors-label">Floors</InputLabel>
              <Select
                labelId="floors-label"
                id="floors"
                name="floors"
                value={formData.floors}
                onChange={handleChange}
              >
                {[...Array(12)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
            <TextField
              fullWidth
              type="number"
              id="price"
              name="price"
              label="Price/day (Pkr) "
              variant="standard"
              value={formData.price}
              onChange={handleChange}
             
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' }, '&:hover fieldset': { border: 'none' }, '&.Mui-focused fieldset': { border: 'none' }, '& .MuiSelect-select': { borderBottom: '1px solid', borderBottomColor: 'gray',borderRadius:'0px' } } }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="simple">Simple</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <SelectImg image={null} onImageUpload={handleImageUpload} />
          </Grid>

          <Grid item xs={12} >
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }} >

              <FormControl fullWidth>
                <InputLabel id="near-label">Near by</InputLabel>
                <Select
                  labelId="near-label"
                  id="near"
                  name="near"
                  value={formData.near}
                  onChange={handleChange}
                >

                  <MenuItem value="punjab">Punjab university</MenuItem>
                  <MenuItem value="umt">Umt university</MenuItem>
                  <MenuItem value="uet">Uet university</MenuItem>
                  <MenuItem value="superior">Superior university</MenuItem>
                  <MenuItem value="sargoda">Sargoda university</MenuItem>
                  <MenuItem value="ucp">Ucp university</MenuItem>
                  <MenuItem value="ripha">Ripha university</MenuItem>
                  <MenuItem value="education">Education university</MenuItem>

                </Select>
              </FormControl>

              <TextField
                fullWidth
                id="location"
                name="location"
                label="Chose Your Location"
                variant="standard"
                value={formData?.location}
                onChange={handleChange}
              />

              

              <div className="gmap_canvas" style={{marginTop:'20px', overflow: 'hidden', background: 'none!important', width: '100%', height: '400px' }}>
                <iframe
                  className="gmap_iframe"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${formData.location}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  style={{ width: '100%', height: '400px' }}
                  title="Google Map"
                ></iframe>

                {/* <a href="https://embed-googlemap.com">google map embed html</a> */}
              </div>

            </Grid>
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          // borderTop: "1px solid",
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          startIcon={<SendIcon />}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
