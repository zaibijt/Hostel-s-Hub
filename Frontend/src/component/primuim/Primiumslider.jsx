import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Button, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, OutlinedInput, FormHelperText, Paper, InputBase, Divider } from '@mui/material';
// import './Home.css'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuItems from "../muicomponent/MenuItems.tsx";
import { truncateText } from "../../uitils/TrimText.jsx";


export default function Primiumslider() {

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.between(700, 1100));
    const isSmScreen = useMediaQuery(theme.breakpoints.between(0, 699));

    const [imgindex, setImgindex] = useState(0);
    var settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: isSmScreen ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        beforeChange: (prevSlide, currentSlide, event) => {
            setImgindex(currentSlide + 1);
            console.log(event)
        },
    };

    const city = [{ title: "lahore" }, { title: "multan" }, { title: "gujrawala" }, { title: "islamabad" }]

    const sliderdata = [
        {
            img: 'https://images.pexels.com/photos/20250029/pexels-photo-20250029/free-photo-of-church.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            img: 'https://images.pexels.com/photos/20191000/pexels-photo-20191000/free-photo-of-a-thatched-roof-with-red-and-blue-windows.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            img: 'https://images.pexels.com/photos/20335182/pexels-photo-20335182/free-photo-of-a-small-stone-church-sits-on-top-of-a-hill.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            img: 'https://images.pexels.com/photos/11650554/pexels-photo-11650554.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            img: 'https://images.pexels.com/photos/7735231/pexels-photo-7735231.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
        {
            img: 'https://images.pexels.com/photos/19820297/pexels-photo-19820297/free-photo-of-a-street-light.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        },
    ]

    const items = sliderdata.map((items, idx) => {
        return (
            <>
                <Box sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Box
                        sx={{
                            transition: 'all linear 0.30s',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            position: 'relative',
                            width: isMdScreen ? '98%' : '85%',
                            height: '80%',
                            backgroundImage: `url(${items.img})`,
                            backgroundSize: 'cover',
                            ...(idx === imgindex ? { transform: 'scale(1)', } : { transform: 'scale(0.9)', }),
                        }}
                    >
                        <Box sx={{ position: 'absolute', backgroundColor: 'black', opacity: '0.7', height: '100%', width: '100%' }} ></Box>
                        <Typography variant="h5" sx={{ position: 'absolute', width: '80%', height: '30px', top: '84%', zIndex: '40', color: 'white', left: '5%' }} >
                            {
                                truncateText('this is my hostel rooms you know that haaa ', 30)
                            }
                        </Typography>
                        <Button sx={{ top: '0%', left: '0%', right: '0%', margin: 'auto', bottom: '0%', height: '35px', width: '80px', borderRadius: '15px', position: 'absolute', border: 'solid 1px white', color: 'white', backgroundColor: 'transparent' }} >View</Button>
                    </Box>
                </Box >
            </>
        )
    })

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '86%',marginLeft:'7%', padding:'20px 0',marginBottom:'150px'}} >
             
             <Typography variant="h3" sx={{padding:'10px 0', 
            //  border:'5px solid red',
             textAlign:'center'}}>Primium Rooms</Typography>
             <Typography sx={{width:'100%'}} >HostelHub also offers premium rooms in select hostels for students seeking additional comfort and amenities. These rooms feature larger living spaces, private bathrooms, high-speed internet, and upscale furnishings, providing a more luxurious living experience. With premium options available, HostelHub ensures that every student can find accommodations that suit their lifestyle and preferences.</Typography>

            <Slider  {...settings}>
                {
                    items
                }
            </Slider>
        </Box>
    );
}