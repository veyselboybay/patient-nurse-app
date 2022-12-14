import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_MOTIVATION = gql`
  {
    motivationalTips {
      tip
    }
  }
`;

//
const CourseList = () => {
  const { userType } = useGlobalContext();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_MOTIVATION);
  useEffect(() => {
    refetch();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // Nurse is able to see motivational list here
  // Also User can see all the motivational list
  return (
    <Container>
      <Table>
        <tbody>
          <tr>
            <th>No:</th>
            <th>Motivation Tip</th>
          </tr>
          {data.motivationalTips.length === 0 && (
            <h3>There is no motivational tip yet!</h3>
          )}
          {data &&
            data.motivationalTips.map((tip, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tip.tip}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </Table>

      {userType === "Nurse" && (
        <Button
          style={{ backgroundColor: "lightblue", color: "black" }}
          onClick={() => navigate(`/addmotivation`)}
        >
          Add Motivational Tip
        </Button>
      )}
    </Container>
  );
};

export default CourseList;
