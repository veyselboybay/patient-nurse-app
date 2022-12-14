//Login.js
import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import "./entryform.css";

//
//import axios from 'axios';
//
// import View from "./View";
//
//
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;
//
const LOGGED_IN_USER = gql`
  mutation LoggedInUser($email: String!) {
    isLoggedIn(email: $email)
  }
`;
//
function Login() {
  //
  let navigate = useNavigate();
  //
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  //const [isLoggedIn, { data1, loading1, error1 }] = useMutation(LOGGED_IN_USER);

  const [isLoggedIn, { loading1, error1 }] = useMutation(LOGGED_IN_USER, {
    onCompleted: (data1) => console.log("Data from mutation", data1),
    onError: (error1) => console.error("Error in mutation", error1),
  });

  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  //
  //send email and password to the server for initial authentication
  const authenticateUser = async () => {
    console.log("calling authenticateUser");
    console.log(email);
    try {
      //
      const results = await loginUser({
        variables: { email: email.value, password: password.value },
      });
      const { data } = results;
      const loginUserVar = data.loginUser;
      console.log("results from login user:", loginUserVar);
      //process the response
      if (results !== undefined) {
        setScreen(loginUserVar);
        navigate("/studentlist");
      }
    } catch (error) {
      //print the error
      console.log(error);
    }
  }; //

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

      //
      //const results = await axios.get('/read_cookie');
      const results = await isLoggedIn({ variables: { email: email.value } });
      //
      //const strResults = JSON.stringify(results)

      const { data } = results;
      const isLoggedInVar = data.isLoggedIn;
      console.log("auth result from graphql server: ", isLoggedInVar);

      //

      if (isLoggedInVar !== undefined) {
        setScreen(isLoggedInVar);
        navigate("/studentlist");
      }
    } catch (e) {
      setScreen("auth");
      console.log("error: ", e);
    }
  };
  //runs the first time that the view is rendered
  //to check if user is signed in
  // useEffect(() => {
  //   readCookie();
  // }, []); //only the first render
  //

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  //
  return (
    <div className="entryform">
      {screen === "auth" && (
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
              onClick={authenticateUser}
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
//
export default Login;
