import { Grid } from '@mui/material'
import React from 'react'
import RoomsGetbyTabs from '../rooms/RoomsGetbyTabs'
import { useLocation, } from 'react-router-dom';
import Nav from '../../component/common/nav/Nav.tsx';
import Footer from '../../component/common/footer/Footer.tsx';
const Roomsbyhostel = () => {
    const { state } = useLocation();
     
    console.log(state,'state data')

    return (
        <>
            <Nav />
            <Grid container sx={{ marginTop: '25px' }}  >

                {
                    state?.map? 
                    <iframe
                          className="gmap_iframe"
                          frameBorder="0"
                          scrolling="no"
                          marginHeight="0"
                          marginWidth="0"
                          src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${state?.map}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                          style={{ width: '100%', height: '400px', padding: '10px' }}
                          title="Google Map"
                        ></iframe>
                        : ''
                }


                <Grid item sm={12}  >
                    <RoomsGetbyTabs roomsbyhostel={true} data={state.data.key} />
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default Roomsbyhostel