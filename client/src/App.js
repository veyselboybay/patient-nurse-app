import "./App.css";
//
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed:
//  npm install react-bootstrap bootstrap
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";
//
import PatientList from "./components/PatientList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

import Home from "./components/Home";
import MotivationList from "./components/MotivationList";
import AddMotivation from "./components/AddMotivation";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import PatientPage from "./components/PatientPage";
import AddSigns from "./components/AddSigns";

//
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Hospital Patient System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/patientlist">
                Patient List
              </Nav.Link>
              <Nav.Link as={Link} to="/motivationlist">
                Motivation Tips
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                style={{
                  color: "black",
                  border: "1px white solid",
                  marginLeft: "250px",
                  fontWeight: "bold",
                }}
              >
                Sign-up
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                style={{
                  color: "black",
                  border: "1px white solid",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="patientlist" element={<PatientList />} />
          <Route path="patientPage" element={<PatientPage />} />
          <Route path="motivationlist" element={<MotivationList />} />
          <Route path="addmotivation" element={<AddMotivation />} />
          <Route path="addSigns" element={<AddSigns />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
