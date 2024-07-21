import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as api from "../api";
import { Container, Table, Button } from "react-bootstrap";
import "../css/List.css";

const List = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAll(data, setData);
  }, []);

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

    const params = api.createDeleteParams(
      EO_ID,
      EO_CODE,
      Reg_3RD,
      Reg_EOID,
      Extensibility
    );
    await api.del(EO_ID, params, data, setData);
  };

  const handleRowClick = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <Container style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
      <Table striped bordered hover className="custom-table-list">
        <thead>
          <tr>
            <th>EO_ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>EO_Phone</th>
            <th>City</th>
            <th>Reg_EOID</th>
            <th>Reg_3RD</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} onClick={() => handleRowClick(item.EO_ID)}>
              <td>{item.EO_ID}</td>
              <td>{item.EO_Name1}</td>
              <td>{item.EO_Email}</td>
              <td>{item.EO_Phone}</td>
              <td>{item.EO_Address_City}</td>
              <td>{item.Reg_EOID}</td>
              <td>{item.Reg_3RD}</td>
              <td>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${item.EO_ID}`, { state: item.EO_ID });
                  }}
                  variant="dark"
                  className="mx-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={(event) =>
                    handleDelete(
                      event,
                      item.EO_ID,
                      item.EO_CODE,
                      item.Reg_3RD,
                      item.Reg_EOID,
                      item.Extensibility
                    )
                  }
                  variant="danger"
                  className="mx-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
