import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";

function ContactCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/send-email",
        formData
      );
      if (response.status === 200) {
        alert("Email sent successfully");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <section className="mb-2 bg-light">
        <h3 className="text-center pb-4 mt-4 pt-4 fw-bold fs-1 text-black">
          Let’s Talk
        </h3>
        <p className="p text-center w-responsive mx-auto mb-5 text-black">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        <Row className="justify-content-center">
          <Col md={6}>
            <Form id="contact-form" onSubmit={handleSubmit} className="mx-auto">
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      placeholder="Your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="subject" className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="text-center text-md-left mt-3 mb-4">
                <Button type="submit" block className="w-50">
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default ContactCard;
