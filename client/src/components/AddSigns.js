import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const ADD_SIGN = gql`
  mutation AddSigns(
    $patientId: String!
    $bodyTemperature: Int!
    $heartRate: Int!
    $bloodPressure: Int!
    $respiratoryRate: Int!
    $lastVisit: String!
  ) {
    addVitalSigns(
      patientId: $patientId
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
      lastVisit: $lastVisit
    ) {
      _id
    }
  }
`;
function AddSigns() {
  let navigate = useNavigate();

  const { state } = useLocation();
  let patientId,
    bodyTemperature,
    heartRate,
    bloodPressure,
    respiratoryRate,
    lastVisit;

  const [addSigns, { data, loading, error }] = useMutation(ADD_SIGN);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  let user = state.user;
  patientId = state.user._id;
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSigns({
            variables: {
              patientId: patientId,
              bodyTemperature: parseInt(bodyTemperature.value),
              heartRate: parseInt(heartRate.value),
              bloodPressure: parseInt(bloodPressure.value),
              respiratoryRate: parseInt(respiratoryRate.value),
              lastVisit: lastVisit.value,
            },
          });
          //
          bodyTemperature.value = "";
          heartRate.value = "";
          bloodPressure.value = "";
          respiratoryRate.value = "";
          lastVisit.value = "";
          if (!error) {
            navigate("/patientPage", { state: { user } });
          }
        }}
      >
        <h4>{state.user.userId}</h4>
        <Form.Group>
          <Form.Label> Body Temperature:</Form.Label>
          <Form.Control
            type="number"
            name="bodyTemperature"
            ref={(node) => {
              bodyTemperature = node;
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Heart Rate:</Form.Label>
          <Form.Control
            type="number"
            name="heartRate"
            ref={(node) => {
              heartRate = node;
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Blood Pressure:</Form.Label>
          <Form.Control
            type="number"
            name="bloodPressure"
            ref={(node) => {
              bloodPressure = node;
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Respiratory Rate:</Form.Label>
          <Form.Control
            type="number"
            name="respiratoryRate"
            ref={(node) => {
              respiratoryRate = node;
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Last Visit:</Form.Label>
          <Form.Control
            type="date"
            name="lastVisit"
            ref={(node) => {
              lastVisit = node;
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Add Signs{" "}
        </Button>
      </form>
    </Container>
  );
}

export default AddSigns;
