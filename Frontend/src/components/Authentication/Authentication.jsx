import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Authentication.module.css"; // Make sure the path is correct

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const isSigningUp = location.pathname.includes("signup");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5010/api/farmer/signup",
        {
          username,
          email,
          password,
          location: {
            lat,
            lon,
          },
        }
      );
      console.log("Sign up successful", response.data);
      // Handle response.data as needed, e.g., storing the user token
      localStorage.setItem('userId', response.data._id)
      navigate("/portal"); // Redirect to dashboard upon successful signup
    } catch (error) {
      console.error("Sign up error", error.response || error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5010/api/farmer/login",
        { email, password }
      );
      console.log("Login successful", response.data);
      // Handle response.data as needed, e.g., storing the user token
      localStorage.setItem('userId', response.data._id)
      navigate("/portal"); // Redirect to dashboard upon successful login
    } catch (error) {
      console.error("Login error", error.response || error.message);
      setError("Invalid email or password.");
      console.error("Login error", error.response || error.message);
    }
  };

  const switchMode = () => {
    navigate(isSigningUp ? "/" : "/signup");
  };

  useEffect(() => {
    document.title = isSigningUp ? "Sign Up - AgriTech" : "Sign In - AgriTech";
  }, [isSigningUp]);

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Container className="auth-container mt-5">
        <Row
          className="justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Col
            md={6}
            className={`${styles.backgroundCol} d-flex flex-column justify-content-center text-center p-3`}
            style={{ height: "100%" }}
          >
            <div className="mb-5">
              {" "}
              {/* Moves the heading and paragraph to the top */}
              <h2 className="text-white fw-bold">
                {isSigningUp ? "Start New Journey!" : "Welcome Back!"}
              </h2>
            </div>
            <div className="mt-5">
              {" "}
              {/* Moves the button to the bottom */}
              <h5 className="text-white">
                {isSigningUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </h5>
              <Button
                variant="light" // 'light' for white background
                type="submit"
                className="btn-lg fw-bold" // Bootstrap class for a smaller button
                style={{ color: "black", border: "none", width: "30%" }} // Inline style for text color
                onClick={switchMode}
              >
                {isSigningUp ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </Col>

          <Col
            md={6}
            className="p-3 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "#FAF9F6", height: "100%" }}
          >
            <h2
              className="fw-bold text-center mb-5"
              style={{ color: "#BDBE3E" }}
            >
              {isSigningUp ? "Create Account" : "Sign in to AgriTech"}
            </h2>
            <Form onSubmit={isSigningUp ? handleSignUp : handleLogin}>
              {isSigningUp && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <div className="d-flex justify-content-center">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{ backgroundColor: "#efefba", width: "60%" }}
                      className={`${styles.customInput}`}
                    />
                  </div>
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className="d-flex justify-content-center">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: "#efefba", width: "60%" }}
                    className={`${styles.customInput}`}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div className="d-flex justify-content-center">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "#efefba", width: "60%" }}
                    className={`${styles.customInput}`}
                  />
                </div>
              </Form.Group>
              {isSigningUp && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicLatitude">
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        type="number"
                        placeholder="Latitude of Your Farm"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        style={{ backgroundColor: "#efefba", width: "60%" }}
                        className={`${styles.customInput}`}
                        required
                        step="0.000001"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLongitude">
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        type="number"
                        placeholder="Longitude of Your Farm"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                        style={{ backgroundColor: "#efefba", width: "60%" }}
                        className={`${styles.customInput}`}
                        required
                        step="0.000001"
                      />
                    </div>
                  </Form.Group>
                </>
              )}
              {/* <Button
              style={{
                backgroundColor: "rgb(189, 190, 62)",
                color: "black",
                border: "none",
                width: "30%",
              }}
              className="btn-lg fw-bold"
              type="submit"
            >
              {isSigningUp ? "Sign Up" : "Sign In"}
            </Button> */}
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    backgroundColor: "rgb(189, 190, 62)",
                    color: "black",
                    border: "none",
                    width: "30%",
                  }}
                  className="btn-lg fw-bold"
                  type="submit"
                >
                  {isSigningUp ? "Sign Up" : "Sign In"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
