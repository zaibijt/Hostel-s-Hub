import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const Content = () => {
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center" style={{ marginTop: "140px" }}>
          <Col md={4}>
            <div className="card-body mt-5">
              <h1 className="card-title fw-bold text-black fs-2">
                About Hostel Hub
              </h1>
              <p>
                We know how large objects will act, but things on a small scale.
              </p>
            </div>
          </Col>
          <Col xs={6} className="ms-auto">
            <div>
              <p>
                <strong>Welcome to Hostel Hub </strong>Your Ultimate Platform
                for Booking Hostel Rooms Easily
              </p>
              <hr />
              <p>
                <strong>Our Story </strong> Hostel Hub began as a passion
                project, evolving into a thriving platform dedicated to helping
                students find and book hostel rooms with ease.
              </p>
              <hr />
              <p>
                <strong> What We Offer </strong>
                Trust and Security: Your safety is our priority, with robust
                measures in place to ensure a secure booking experience.
                User-Friendly Platform: Enjoy a seamless and intuitive
                experience for all your hostel booking needs. Global Community:
                Connect with like-minded students worldwide and find the perfect
                room that suits your needs.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Content;
