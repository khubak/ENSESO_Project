import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../api";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import "../css/View.css"; // Import the custom CSS
import Cookies from "js-cookie";
const View = () => {
  // id passed through navigate/location props for demonstration purposes
  const location = useLocation();
  const navigate = useNavigate();
  const login = Cookies.get("ENSESOLogin");

  useEffect(() => {
    if (login === undefined) {
      navigate("/login");
    }
  }, [login, navigate]);

  const [id, setId] = useState(location.pathname.replace("/view/", ""));
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getOne(id, api.createGetOneParams(id), data, setData);
  }, []);

  const clickToEditHandler = () => {
    navigate("/edit/" + id);
  };

  const clickToDeleteHandler = async (
    event,
    EO_ID,
    EO_CODE,
    Reg_3RD,
    Reg_EOID,
    Extensibility
  ) => {
    event.preventDefault();

    const params = api.createDeleteParams(
      EO_ID,
      EO_CODE,
      Reg_3RD,
      Reg_EOID,
      Extensibility
    );
    //currently not funcitoning 100% properly
    await api.del(EO_ID, params, data, setData);
    navigate("/");
  };

  return (
    <Container style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
      <Table striped bordered hover className="custom-table-view">
        <tbody>
          {Object.keys(data).length === 0 ? (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          ) : (
            Object.entries(data).map(([key, value], index) => (
              <tr key={index}>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    width: "50%",
                  }}
                >
                  <strong>{key}</strong>
                </td>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    paddingLeft: "1.5rem",
                  }}
                >
                  {value}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Row className="button-row">
        <Col className="d-flex justify-content-center">
          <Button
            variant="dark"
            onClick={clickToEditHandler}
            className="btn-edit"
          >
            Edit
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button
            variant="danger"
            onClick={(event) =>
              clickToDeleteHandler(
                event,
                data.EO_ID,
                data.EO_CODE,
                data.Reg_3RD,
                data.Reg_EOID,
                data.Extensibility
              )
            }
            className="btn-delete"
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default View;
