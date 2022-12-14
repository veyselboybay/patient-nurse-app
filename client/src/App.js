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
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

import Home from "./components/Home";
import CourseList from "./components/CourseList";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";

//
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Lab 3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/studentlist">
                Student List
              </Nav.Link>
              <Nav.Link as={Link} to="/courselist">
                Course List
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
          <Route path="studentlist" element={<StudentList />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="editstudent" element={<EditStudent />} />
          <Route path="courselist" element={<CourseList />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="editcourse" element={<EditCourse />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
