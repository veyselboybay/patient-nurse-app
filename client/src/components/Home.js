import React, { Component } from "react";
import { useGlobalContext } from "../context";

function Home(props) {
  const { loggedIn, userName, email, userType, id } = useGlobalContext();
  return (
    <div>
      <h1>Lab 3</h1>
      <h2> Express - GraphQL - React with CRUD Operations</h2>
      <p>
        loggedIn: {loggedIn ? "True" : "false"}, userName: {userName}, email:{" "}
        {email}, userType:
        {userType}, id: {id}
      </p>
      <p>
        *** Users can register/login and create students and courses. Also, they
        can edit student and course informations or they can delete them.
      </p>
    </div>
  );
}

export default Home;
