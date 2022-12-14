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
const GET_STUDENTS = gql`
  {
    students {
      _id
      firstName
      lastName
      email
      college
      program
      startingYear
    }
  }
`;
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

const DELETE_STUDENT = gql`
  mutation deleteStudent($id: String!) {
    deleteStudent(id: $id) {
      _id
    }
  }
`;

const StudentList = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  // const [deleteStudent, { data1 }] = useMutation(DELETE_STUDENT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>Student id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>program</th>
          </tr>

          {/* {data.students.map((student, index) => (
            <tr key={index}>
              <td>{student._id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.program}</td>
              <td>
                <Button
                  style={{ backgroundColor: "green" }}
                  onClick={() =>
                    navigate(`/editstudent`, {
                      state: { student },
                    })
                  }
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    // deleteStudent({ variables: { id: student._id } });
                    window.location.reload();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>

      <Button
        style={{ backgroundColor: "lightblue", color: "black" }}
        onClick={() => navigate(`/addstudent`)}
      >
        Add Student
      </Button>
      <Button style={{ backgroundColor: "green" }} onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

export default StudentList;
