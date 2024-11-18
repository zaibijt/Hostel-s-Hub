import React from 'react'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Button, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, OutlinedInput, FormHelperText, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';


const About = () => {

    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down(900));
    const isMdScreen = useMediaQuery(theme.breakpoints.down(1200));

    return (
        <Box sx={{ minHeight: "90vh", width: '100%', background:'#F2F2F2' }} >
            <Grid container sx={{ paddingTop:'50px'  }} >
                <Typography sx={{ marginLeft: '7%', textAlign:'center',width:'86%' }} variant='h3' >HostelHub</Typography>
                <Grid item xs={12}>
                    <Typography sx={{ width: '86%', marginLeft: '7%', textAlign: 'justify', marginTop: '30px' }} >
                        HostelHub is an innovative online platform designed to simplify the for student accommodations by aggregating a wide array of hostels into a single, easy-to-use website. Recognizing the challenges students face when trying to find suitable housing, HostelHub provides a comprehensive solution that brings multiple hostels under one virtual roof. This approach not only saves time but also ensures that students have access to a diverse range of options, catering to various preferences and budgets.

                        At HostelHub, the process of finding and booking a room is streamlined and user-friendly. Students can browse detailed listings of hostels, complete with photos, descriptions, and amenities. Each listing includes up-to-date information on room availability, allowing students to make informed decisions quickly. The platform’s advanced search and filter options help narrow down choices based on specific criteria such as price range, location, and facilities, ensuring that every student can find accommodation that perfectly fits their needs.
                    </Typography>
                    <Typography sx={{ width: '86%', marginLeft: '7%', textAlign: 'justify', marginTop: '30px'}} >
                        Booking a room through HostelHub is straightforward and secure. Once a suitable hostel is found, students can complete the entire booking process online, avoiding the hassle of in-person visits and paperwork. HostelHub’s secure payment system ensures that transactions are safe and reliable, providing peace of mind to users. Additionally, the platform offers customer support to assist with any questions or issues that may arise during the booking process.

                        Beyond just a booking platform, HostelHub aims to build a community for students. Users can leave reviews and ratings for hostels, helping future students make more informed choices. By connecting students with quality housing options and fostering a community of shared experiences, HostelHub not only addresses the immediate need for accommodation but also contributes to a supportive student environment. Whether you’re a freshman looking for your first hostel or a senior seeking new accommodations, HostelHub is your go-to resource for finding the perfect place to live during your academic journey.
                    </Typography>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={12} md={7} lg={8} xl={8} >
                        <Typography sx={{ width: (isSmScreen ? '87%' : '86%'), marginLeft: isMdScreen ? (isSmScreen ? '7%' : '12%') : '10%', textAlign: 'justify' , marginTop: '30px'}} >
                        Beyond just a booking platform, HostelHub aims to build a community for students. Users can leave reviews and ratings for hostels, helping future students make more informed choices. By connecting students with quality housing options and fostering a community of shared experiences, HostelHub not only addresses the immediate need for accommodation but also contributes to a supportive student environment. Whether you’re a freshman looking for your first hostel or a senior seeking new accommodations, HostelHub is your go-to resource for finding the perfect place to live during your academic journey.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4} xl={4} >
                        <Box sx={{ overflow: 'hidden', position: 'reletive', marginTop: '10px', marginLeft: isSmScreen ? '7%' : null, height: '200px', width: '350px', transform: 'rotateY(20deg)', borderRadius: '15px' }} >
                            {/* <video style={{ position: 'absolute', width: '100%', height: '100%' }} loop autoPlay>
                                <source src="https://videos.pexels.com/video-files/1509536/1509536-sd_640_360_30fps.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video> */}

                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default About