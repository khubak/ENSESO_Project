import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Row,
  Col,
  Button,
  Alert,
  Container,
  Table,
} from "react-bootstrap";
import { initialFieldValues, fields } from "../defaultValues";
import "../css/OperatorForm.css";
import Cookies from "js-cookie";

const OperatorForm = () => {
  const navigate = useNavigate();
  const login = Cookies.get("ENSESOLogin");

  useEffect(() => {
    if (login === undefined) {
      navigate("/login");
    }
  }, [login, navigate]);

  const [formValues, setFormValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const clickToBackHandler = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormValues({
        ...formValues,
        [name]: parseInt(value),
      });
    } else if (type === "switch" || type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: checked,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    const formErrors = validateForm();
    e.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      console.log("Form submitted:", formValues);
      api.post(formValues, setFormValues);
      navigate("/");
    } else {
      console.log("Form has errors:", formErrors);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (formValues.VAT_R && !formValues.VAT_N) {
      errors.VAT_N = "VAT Number is required if VAT Registered is checked";
    }
    if (!formValues.VAT_R && !formValues.TAX_N) {
      errors.TAX_N = "Tax Number is required if VAT Registered is not checked";
    }
    if (formValues.EO_ExciseNumber1 && !formValues.EO_ExciseNumber2) {
      errors.EO_ExciseNumber2 =
        "EO Excise Number 2 is required if EO Excise Number 1 is checked";
    }
    if (formValues.OtherEOID_R && !formValues.OtherEOID_N_list) {
      errors.OtherEOID_N_list =
        "Other EOID List is required if Other EOID Registered is checked";
    }
    if (formValues.Reg_3RD && !formValues.Reg_EOID) {
      errors.Reg_EOID =
        "Register EOID is required if Register 3rd Party is checked";
    }
    if (formValues.EO_CountryReg.length !== 2) {
      errors.EO_CountryReg = "Country Registration must be 2 characters long";
    }
    if (!formValues.EO_Type) {
      errors.EO_Type = "Select EO Type";
    }

    setErrors(errors);
    return errors;
  };

  return (
    <Container style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
      <Form onSubmit={handleSubmit}>
        <Table striped bordered hover className="custom-table-edit">
          <tbody>
            {fields.map((field) => (
              <tr key={field.id}>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    width: "50%",
                  }}
                >
                  <strong>{field.label}</strong>
                  {field.required && <span className="text-danger">*</span>}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    verticalAlign: "middle",
                    paddingLeft: "1.5rem",
                  }}
                >
                  {field.type === "radio" ? (
                    field.options.map((option) => (
                      <Form.Check
                        key={option.value}
                        type="radio"
                        id={`${field.id}_${option.value}`}
                        label={option.label}
                        name={field.name}
                        value={option.value}
                        checked={formValues[field.name] === option.value}
                        onChange={handleChange}
                        isInvalid={errors[field.name]}
                      />
                    ))
                  ) : field.type === "switch" ? (
                    <Form.Check
                      type="switch"
                      id={field.id}
                      name={field.name}
                      checked={formValues[field.id] || false}
                      onChange={handleChange}
                      required={field.required}
                      isInvalid={errors[field.name]}
                    />
                  ) : (
                    <Form.Control
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      isInvalid={errors[field.name]}
                      maxLength={field.maxLength}
                    />
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors[field.name]}
                  </Form.Control.Feedback>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="button-row">
          <Col className="d-flex justify-content-center">
            <Button
              variant="secondary"
              onClick={clickToBackHandler}
              className="btn-back"
            >
              Home
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="btn-submit">
              Submit
            </Button>
          </Col>
        </Row>
        {Object.keys(errors).length > 0 && (
          <Alert variant="danger" className="mt-3">
            Please fix the errors above before submitting.
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default OperatorForm;
