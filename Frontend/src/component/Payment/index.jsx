import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import httpRequest from "../../axios";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { BookRoom } from "../../constants/apiEndPoints";
import { useLocation } from 'react-router-dom';

const Payment = () => {

    const { isAuthenticated, user } = useSelector((state) => state.user);

    const location = useLocation()
    console.log(location?.state,'obj');

    useEffect(()=>{
          makePayment()
    },[])

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51PIuE506w2DqiReyelDFmfX4r8w5Y8tVwG5vJLqvG5gvsyb8OFa7jztvNd60v0M0h8gg7HQZqxd3B84vqCZh3w2l00NRcgm2Z8');

        const cards = [location?.state?.data];

        const body = {
            products: cards,    
        };

        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/checkout', {
                method: "POST",
                headers: headers, // Pass the headers variable, not as a string
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
            else {
                try {
                  const Response = await httpRequest.post(BookRoom, location?.state?.data, {
                    headers: {
                      Authorization: user?.token,
                    },
                  });

                  if (Response.status === 200 || Response.status === 201) {
                    toast.success(Response?.data?.message);
                  }
                } catch (error) {
                //   toast.error(error?.response?.data?.message);
                } finally {
                //   setloading(false);
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <></>
        // <div onClick={makePayment}>index</div>
    );
};

export default Payment;
