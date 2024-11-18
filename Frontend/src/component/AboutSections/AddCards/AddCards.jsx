import React from "react";
import "./Cards.css";

import broken from "../../../assests/broken.avif";
import malik from "../../../assests/malik.jpg";
import aliii from "../../../assests/aliii.jpeg";

import { Container, Row, Col, Image } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const SocialMediaIcons = () => {
  return (
    <div className="social-icons">
      <FaInstagram className="icon text-instagram text-primary display-6 m-2" />
      <FaTwitter className="icon text-twitter text-primary display-6 m-2" />
      <FaFacebook className="icon text-facebook text-primary display-6 m-2" />
    </div>
  );
};

const AddCards = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3 className="text-center text-black" style={{ marginTop: "200px" }}>
          MEET OUR TEAM
        </h3>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <div className="card text-center " style={{ width: "300px" }}>
            <Image
              src={malik}
              className="card-img-top rounded-circle"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title fw-bold text-black">
                Muhammad Hamza Shahzar
              </h5>
              <p className="card-text">professional</p>
              <p className="card-email">MuhammadHamzaShahzar@gmail.com</p>
            </div>
            <SocialMediaIcons />
          </div>

          <div
            className="card text-center"
            style={{ width: "300px", margin: "0 20px" }}
          >
            <Image
              src={broken}
              className="card-img-top rounded-circle"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title fw-bold text-black">
                Muhammad zohaib Qasim
              </h5>
              <p className="card-text ">professional</p>
              <p className="card-email ">MuhammadZohaibQasim@gmail.com</p>
            </div>
            <SocialMediaIcons />
          </div>

          <div className="card text-center" style={{ width: "300px" }}>
            <Image
              src={aliii}
              className="card-img-top rounded-circle"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title fw-bold text-black">Hamza Tariq</h5>
              <p className="card-text">professional</p>
              <p className="card-email">HamzaTariq@gmail.com</p>
            </div>
            <SocialMediaIcons />
          </div>
        </Row>
      </div>
    </>
  );
};

export default AddCards;
