import React, { Component, useEffect, useState } from "react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entryform.css";
//
//
const EDIT_STUDENT = gql`
  mutation updateStudent(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $college: String!
    $program: String!
    $startingYear: Int!
  ) {
    updateStudent(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      college: $college
      program: $program
      startingYear: $startingYear
    ) {
      _id
    }
  }
`;

//function component to add a student
const EditStudent = () => {
  //
  let navigate = useNavigate();
  let { state } = useLocation();
  let userId = state.student._id;
  const student = state.student;
  let studentObject = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    college: student.college,
    program: student.program,
    startingYear: student.startingYear,
  };
  const [studentObj, setStudentObj] = useState(studentObject);

  const [updateStudent, { data, loading, error }] = useMutation(EDIT_STUDENT);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStudent({
            variables: {
              id: userId,
              firstName: studentObj.firstName,
              lastName: studentObj.lastName,
              email: studentObj.email,
              college: studentObj.college,
              program: studentObj.program,
              startingYear: parseInt(studentObj.startingYear),
            },
          });
          //
          setStudentObj({
            firstName: "",
            lastName: "",
            email: "",
            college: "",
            program: "",
            startingYear: "",
          });
          navigate("/studentlist");
        }}
      >
        <Form.Group>
          <Form.Label> First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={studentObj.firstName}
            onChange={(e) => {
              setStudentObj({ ...studentObj, firstName: e.target.value });
            }}
            placeholder="First Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={studentObj.lastName}
            onChange={(e) => {
              setStudentObj({ ...studentObj, lastName: e.target.value });
            }}
            placeholder="Last Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={studentObj.email}
            onChange={(e) => {
              setStudentObj({ ...studentObj, email: e.target.value });
            }}
            placeholder="Email:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> College:</Form.Label>
          <Form.Control
            type="text"
            name="college"
            value={studentObj.college}
            onChange={(e) => {
              setStudentObj({ ...studentObj, college: e.target.value });
            }}
            placeholder="College:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Program:</Form.Label>
          <Form.Control
            type="text"
            name="program"
            value={studentObj.program}
            onChange={(e) => {
              setStudentObj({ ...studentObj, program: e.target.value });
            }}
            placeholder="Program:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Starting Year:</Form.Label>
          <Form.Control
            type="text"
            name="startingYear"
            value={studentObj.startingYear}
            onChange={(e) => {
              setStudentObj({ ...studentObj, startingYear: e.target.value });
            }}
            placeholder="Starting Year:"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Edit Student{" "}
        </Button>
      </form>
    </div>
  );
};

export default EditStudent;
