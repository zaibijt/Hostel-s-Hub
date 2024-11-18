import { Box, CircularProgress, TextField } from '@mui/material'
import { Button, Grid } from 'antd'
import React, { useState } from 'react'
import SendIcon from "@mui/icons-material/Send";
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {

    const [loading, setLoading] = useState(false);
    const [opt,setOpt]=useState(null)
    const [password,setPassword]=useState(null)
    const [email,setEmail]=useState(null)

    const navigate = useNavigate();

    const handleChange = (e) => {
            setOpt(e.target.value)
    }

    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleChangeE = (e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = async () => {

        setLoading(true)

        var obj={
            otp:opt,
            password:password,
            emial:email,
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/verifyOpt',obj);
            if (response) {
                setLoading(false)
                navigate('/login')
                // verifyOpt
                // sendOpt

                // navigate('/forgot')
            }
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }

    }

    return (
        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh',width:'100vw'}} >
            <h1 style={{marginBottom:'50px'}} >
                Change Password
            </h1>
            <input onChange={handleChange} type='number' placeholder='Type OTP here' style={{width:'280px',padding:'14px'}}  />
            <input onChange={handleChangeE}  placeholder='Type Your Email here' style={{width:'280px',padding:'14px',marginTop:'10px'}}  />
            <input onChange={handleChangePassword} type='number' placeholder='Type New Password here' style={{width:'280px',padding:'14px',marginTop:'10px'}}  />
            <Button onClick={handleSubmit} style={{marginTop:'20px'}} > {loading ? 'Loading...' : 'Submit'}</Button>
        </div>
        </>
    )
}

export default Forgot