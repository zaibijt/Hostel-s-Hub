import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SelectImg from '../../component/common/SelectImg/SelectImg';
import Nav from '../../component/common/nav/Nav.tsx';
import axios from '../../axios/index.js';
import { useNavigate } from 'react-router-dom';

const Editrooms = () => {

    const location = useLocation();
    const { state } = location;
    const navigator = useNavigate()

    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        title: state.title,
        description: state.description,
        capacity: state.capacity,
        floors: state.floors,
        category: state.category,
        image: state.image,
        hostelId: user?.user?.hostel?._id,
        price: state.price,
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (imageUrl) => {
        setFormData({ ...formData, image: imageUrl });
    };

    const handleEdit = async () => {
        const response = await axios.put(`http://localhost:8000/api/v1/rooms/${state._id}`, formData);
        if (response.data.message === 'Room updated successfully') {
            console.log(response.data.data, 'update');
            navigator('/Add-Rooms')
        }
        else {
            <Alert severity="error">Not Edit your Room</Alert>
        }
    }

    return (
        <>
            <Nav />
            <Grid container spacing={2} sx={{ width: '50%', marginLeft: '25%', marginTop: '70px', marginBottom: '20px' }} >
                <Typography variant='h4' >Edit Room</Typography>
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
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="price/day (Pkr)"
                        variant="standard"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
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
                    <SelectImg image={state.image} onImageUpload={handleImageUpload} />
                </Grid>
              
                <Button onClick={handleEdit} sx={{ width: '100%', height: '50px', marginTop: '20px', border: 'solid 1px black' }}  >Edit Now</Button>
            </Grid>
        </>
    )
}

export default Editrooms