import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import * as api from "../api/login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as loginCookie from "../loginCookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const language = "EN";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const loginRequestBody = api.createLoginRequestBody(
        username,
        password,
        language
      );

      const response = await api.login(loginRequestBody);

      if (response && response.data) {
        // Login successful
        if (response.data[0].errorCode == 0) {
          // Set to 23 instead of 24 minutes to avoid errors with the DB
          const expires = new Date(new Date().getTime() + 23 * 60 * 1000); // 23 minutes in milliseconds
          const cookie = loginCookie.createLoginCookie(
            response.data[0].api_key,
            response.data[0].api_secret
          );
          Cookies.set("ENSESO", JSON.stringify(cookie), { expires });
          navigate("/");
        } else {
          setError(true);
          setMessage(response.data[0].errorMessage);
        }
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (err) {
      console.error("There was an error:", err);
      setError(true);
      setMessage(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={15}>
          <h2>Login</h2>
          {message && (
            <Alert variant={error ? "danger" : "success"}>{message}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
