import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "./List";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const login = Cookies.get("ENSESO");

  useEffect(() => {
    if (login === undefined) {
      navigate("/login");
    }
  }, [login, navigate]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <List />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
