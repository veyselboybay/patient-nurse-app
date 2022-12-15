import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here

const GET_USERS = gql`
  {
    users {
      _id
      userName
      email
      userType
    }
  }
`;

const StudentList = () => {
  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // Nurse is able to see patient list
  return (
    <Container style={{ marginTop: "40px" }}>
      <Table>
        <tbody>
          <tr>
            <th>No</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>

          {data.users.map((user, index) => (
            <tr key={index}>
              {user.userType.includes("Patient") && (
                <>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      style={{ backgroundColor: "green" }}
                      onClick={() =>
                        navigate(`/patientPage`, {
                          state: { user },
                        })
                      }
                    >
                      Go to Patient Page
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentList;
