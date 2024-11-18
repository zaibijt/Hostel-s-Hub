import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import hostelhublogo from "../../../assests/images/hostelhublogo.png";
const Footer = () => {
  return (
    <>
      {/* <div className="img-box">
        <div className="img1"></div>
        <div className="img2"></div>
        <div className="img3"></div>
        <div className="img4"></div>
        <div className="img5"></div>
      </div> */}

      <footer className="footer">
        <div className="footer__container bd-container">
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={hostelhublogo}
              alt="description"
              style={{ height: "150px", width: "150px" }}
            />
          </div>

          <p className="footer__description">WE CONNECT STUDENTS WITH HOSTEL</p>

          <div className="footer__social">
            <a href="#" className="footer__link">
              <FaFacebook />
            </a>
            <a href="#" className="footer__link">
              <FaInstagramSquare />
            </a>
            <a href="#" className="footer__link">
              <FaLinkedin />
            </a>
          </div>
          <p className="footer__copy">
            &#169; 2024 HOSTELHUB. All right reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
