import React from 'react'
import '../Thnakyou/Thankyou.css'
import { useNavigate } from 'react-router-dom'



const Thankyou = () => {

    const navigator = useNavigate()

    const handleBack = () => {
        navigator('/')
    }

    return (
        <>
            <section class="login-main-wrapper">
                <div class="main-container">
                    <div class="login-process">
                        <div class="login-main-container">
                            <div class="thankyou-wrapper">
                                {/* <h1><img src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png" alt="thanks" /></h1> */}
                                <h1>Thank You</h1>
                                <p style={{width:'70%',marginLeft:'15%'}} >
                                    We hope your stay with us will be nothing short of extraordinary. Our team is dedicated to ensuring that you have a comfortable and enjoyable experience during your time here.

                                    As you prepare for your visit, feel free to reach out to us with any questions or special requests you may have. We're here to make your stay as seamless and enjoyable as possible. </p>
                                <a style={{cursor:'pointer'}} onClick={handleBack} >Back to home</a>
                                <div class="clr"></div>
                            </div>
                            <div class="clr"></div>
                        </div>
                    </div>
                    <div class="clr"></div>
                </div>
            </section>
        </>
    )
}

export default Thankyou