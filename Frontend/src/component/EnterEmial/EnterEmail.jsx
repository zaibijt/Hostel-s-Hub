import { Button } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const EnterEmail = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null)
    const [check, setCheck] = useState(false)
    // const navigate = Navigate()

    const handleChange = (e) => {
        setEmail(e.target.value)
        if (e.target.value.length >= 1) {
            setCheck(false)
        }
    }

    const handleSubmit = async () => {

        setLoading(true)

        if (email === null || email.length <= 0) {
            setCheck(true)
        }
        else {

            var obj={
                email:email,
            }

            try {
                const response = await axios.post('http://localhost:8000/api/v1/sendOtp',obj);
                if (response) {
                    setLoading(false)
                    navigate('/forgot')
                }
            }
            catch (err) {
                setLoading(false)
                console.log(err);
            }
        }
    }

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', width: '100vw' }} >

                <h1 style={{ marginBottom: '50px' }} >
                    Enter Email
                </h1>

                <input onChange={handleChange}  placeholder='Type Email here for getting Otp' style={{ width: '280px', padding: '14px' }} />
                <Button onClick={handleSubmit} style={{ marginTop: '20px' }} > {loading ?' Loading ...' : 'Submit' } </Button>
                
                <p style={{marginTop:'10px',cursor:'pointer'}} onClick={ ()=> navigate('/forgot')}  >Go To Forget Page</p>

                {
                    (check === true && email === null) || (check === true && email.length <= 0) ?
                        <p style={{ color: 'red', marginTop: '15px',marginTop:'15px' }} >Please Enter Your Email</p>
                        : ''
                }

            </div >

        </>
    )
}

export default EnterEmail