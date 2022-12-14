import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
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
      userName
      email
      userType
    }
  }
`;

const StudentList = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  // Nurse is able to see patient list
  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>UserName</th>
            <th>Email</th>
          </tr>

          {data.users.map((user, index) => (
            <tr key={index}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  style={{ backgroundColor: "green" }}
                  onClick={() =>
                    navigate(`/editstudent`, {
                      state: { user },
                    })
                  }
                >
                  Go to Patient Page
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button style={{ backgroundColor: "green" }} onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

export default StudentList;
