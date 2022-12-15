//Login.js
import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import "./entryform.css";

//
//import axios from 'axios';
//
// import View from "./View";
//
//
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      userName
      email
      userType
    }
  }
`;
//
const LOGGED_IN_USER = gql`
  mutation isLoggedInUser($email: String!) {
    isLoggedIn(email: $email)
  }
`;
//
function Login() {
  const { setUserName, setEmail, setUserType, setLoggedIn, loggedIn, setId } =
    useGlobalContext();
  let navigate = useNavigate();
  //
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  //store input field data, user name and password
  let email, password;
  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, []);
  //
  //send email and password to the server for initial authentication
  const authenticateUser = async () => {
    try {
      //
      const results = await loginUser({
        variables: { email: email.value, password: password.value },
      });
      const userObj = results.data.loginUser;
      //process the response
      if (results !== undefined) {
        setId(userObj._id);
        setUserName(userObj.userName);
        setEmail(userObj.email);
        setUserType(userObj.userType);
        setLoggedIn(true);
        navigate("/");
        // console.log(results.data.loginUser);
      }
    } catch (error) {
      //print the error
      console.log(error);
    }
  }; //

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  //
  return (
    <div className="entryform">
      <div>
        <Form>
          <h1>Login</h1>
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

          <Button
            size="lg"
            variant="primary"
            type="Button"
            onClick={(e) => {
              e.preventDefault();
              authenticateUser();
            }}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
//
export default Login;
