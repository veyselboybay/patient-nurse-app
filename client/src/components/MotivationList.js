import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_MOTIVATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
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

      <Button
        style={{ backgroundColor: "lightblue", color: "black" }}
        onClick={() => navigate(`/addmotivation`)}
      >
        Add Motivational Tip
      </Button>
      <Button style={{ backgroundColor: "green" }} onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

export default CourseList;
