import React from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate } from "react-router-dom";

import "./entryform.css";
//
//
const CREATE_USER = gql`
  mutation CreateUser(
    $userName: String!
    $email: String!
    $password: String!
    $userType: String!
  ) {
    createUser(
      userName: $userName
      email: $email
      password: $password
      userType: $userType
    ) {
      userName
      email
      password
      userType
    }
  }
`;
//function component to add a student
const SignUp = () => {
  //
  let navigate = useNavigate();
  //
  let userName, email, password, userType;
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              userName: userName.value,
              email: email.value,
              password: password.value,
              userType: userType.value,
            },
          });
          //
          userName.value = "";
          email.value = "";
          password.value = "";
          userType.value = "";
          //
          // navigate("/login");
        }}
      >
        <h1>Sign Up</h1>
        <Form.Group>
          <Form.Label> User Name:</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            ref={(node) => {
              userName = node;
            }}
            placeholder="User Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            ref={(node) => {
              email = node;
            }}
            placeholder="Email:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> User Type:</Form.Label>
          <Form.Control
            type="text"
            name="userType"
            ref={(node) => {
              userType = node;
            }}
            placeholder="Patient or Nurse"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            ref={(node) => {
              password = node;
            }}
            placeholder="Password:"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Sign Up{" "}
        </Button>
      </form>
    </div>
  );
};
//
export default SignUp;
