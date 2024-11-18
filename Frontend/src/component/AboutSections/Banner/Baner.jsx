import React from "react";
import "./banner.css";
import { Container, Button } from "react-bootstrap";
import { FaAngleDoubleDown } from "react-icons/fa";

const Banner = () => {
  return (
    <>
      <div className="Bg text-center py-5" style={{ marginTop: "-20px" }}>
        <Container fluid>
          <h1 className=" text-white">Online Hostel rooms booking</h1>
          <p className="lead text-white">
            Add, book, and discover exclusive offers
          </p>
          <Button variant="outline-light  " size="lg" className="mt-3 ">
            More
            <FaAngleDoubleDown x />
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Banner;
