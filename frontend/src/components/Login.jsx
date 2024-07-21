import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import * as api from "../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const language = "EN";
  const api_log = "test react login";
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
        language,
        api_log
      );
      // currently not working as expected
      const response = await api.login(
        message,
        setMessage,
        loginRequestBody,
        error,
        setError
      );
      if (error == false) {
        const expires = new Date(new Date().getTime() + 26 * 60 * 1000); // 26 minutes in milliseconds
        Cookies.set("ENSESOLogin", true, { expires });
        navigate("/");
      }
    } catch (err) {
      setError(true);
      setMessage(err);
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
