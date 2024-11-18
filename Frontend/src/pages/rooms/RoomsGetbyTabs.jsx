import React from 'react'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Button, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, OutlinedInput, FormHelperText, CardMedia, Card, CardContent, CardActions, Grid, Badge } from '@mui/material';
import HostelCard from '../hostel/HostelCard.jsx';
import { useNavigate } from 'react-router-dom';


const RoomsGetbyTabs = ({ roomsbyhostel, data, near }) => {

  var filterdata, RoomsRenderF

  if (near) {
    filterdata = data?.filter((items) => {
      return items.map === near
    })

    RoomsRenderF = filterdata?.map((items) => {
      return (
        <>
          <Grid item xs={12} md={6} lg={4} xl={4} sx={{ display: 'flex', justifyContent: 'center', aliginItems: 'center', }}  >
            <HostelCard roomsbyhostel={roomsbyhostel} data={items} />
          </Grid>
        </>
      )
    })
  }


  const RoomsRender = data?.map((items) => {
    return (
      <>
        <Grid item xs={12} md={6} lg={4} xl={4} sx={{ display: 'flex', justifyContent: 'center', aliginItems: 'center', }}  >
          <HostelCard roomsbyhostel={roomsbyhostel} data={items} />
        </Grid>
      </>
    )
  })


  return (
    <Grid container spacing={2} >
      { near === 'all' ? RoomsRender : near && RoomsRenderF?.length >= 1 ? RoomsRenderF : near && RoomsRenderF?.length <=0 ? 'no data' :  RoomsRender}
    </Grid>
  )
}

export default RoomsGetbyTabs