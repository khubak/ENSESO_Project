import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getOne from "../api/getOne";
import del from "../api/del";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import "../css/View.css";
import Cookies from "js-cookie";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = Cookies.get("ENSESO");

  useEffect(() => {
    if (login === undefined) {
      navigate("/login");
    }
  }, [login, navigate]);

  const id = location.pathname.replace("/view/", "")
  const [data, setData] = useState([]);

  useEffect(() => {
    const getOperator = async (id) => {
      try {
        const response = await getOne(id);
        setData(response.data[0]);
      } catch (error) {
        console.error("There was an error in getOperator function: " + error);
      }
    };
    getOperator(id);
  }, []);

  const clickToEditHandler = () => {
    navigate("/edit/" + id);
  };

  const handleDelete = async (
    event,
    EO_ID,
    EO_CODE,
    Reg_3RD,
    Reg_EOID,
    Extensibility
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const params = {
      EO_ID,
      EO_CODE,
      Reg_3RD,
      Reg_EOID,
      Extensibility,
    };
    await del(EO_ID, params)
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
              handleDelete(
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
