import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";

const VITAL_SIGNS = gql`
  {
    vitalSigns {
      patientId
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      lastVisit
    }
  }
`;

function PatientPage() {
  const { userType, userName, id, email } = useGlobalContext();
  useEffect(() => {
    refetch();
  }, []);
  let navigate = useNavigate();
  let user, userId;
  const { state } = useLocation();

  user = state.user;
  userId = state.user._id;

  const { loading, error, data, refetch } = useQuery(VITAL_SIGNS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Container style={{ marginTop: "40px" }}>
      <Card>
        <Card.Header>
          <b>Patient Information = {userId} </b>
        </Card.Header>
        <Card.Body>
          <p>Username: {state.user.userName}</p>
          <p>Email: {state.user.email}</p>
          <Button onClick={() => navigate("/addSigns", { state: { user } })}>
            Add Signs
          </Button>
        </Card.Body>
      </Card>
      <h5 style={{ marginTop: "20px" }}>Previous Visits</h5>
      <Table style={{ marginTop: "20px" }} striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Body Temperature</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Respiratory Rate</th>
            <th>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {data.vitalSigns.map((sign, index) => {
            if (sign.patientId === userId) {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sign.bodyTemperature}</td>
                  <td>{sign.heartRate}</td>
                  <td>{sign.bloodPressure}</td>
                  <td>{sign.respiratoryRate}</td>
                  <td>{sign.lastVisit}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default PatientPage;
