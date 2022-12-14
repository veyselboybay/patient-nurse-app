import React, { Component, useEffect, useState } from "react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entryform.css";

const EDIT_COURSE = gql`
  mutation updateCourse(
    $id: String!
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      _id
    }
  }
`;
function EditCourse() {
  let navigate = useNavigate();
  let { state } = useLocation();
  const courseId = state.course._id;
  const course = state.course;
  let courseObject = {
    courseCode: course.courseCode,
    courseName: course.courseName,
    section: course.section,
    semester: course.semester,
  };
  const [courseObj, setCourseObj] = useState(courseObject);
  const [updateCourse, { data, loading, error }] = useMutation(EDIT_COURSE);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCourse({
            variables: {
              id: courseId,
              courseCode: courseObj.courseCode,
              courseName: courseObj.courseName,
              section: courseObj.section,
              semester: courseObj.semester,
            },
          });
          //
          setCourseObj({
            firstName: "",
            lastName: "",
            email: "",
            college: "",
            program: "",
            startingYear: "",
          });
          navigate("/courselist");
        }}
      >
        <Form.Group>
          <Form.Label> Course Name:</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            value={courseObj.courseName}
            onChange={(e) => {
              setCourseObj({ ...courseObj, courseName: e.target.value });
            }}
            placeholder="Course Name:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Course Code:</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            value={courseObj.courseCode}
            onChange={(e) => {
              setCourseObj({ ...courseObj, courseCode: e.target.value });
            }}
            placeholder="Course Code:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Section:</Form.Label>
          <Form.Control
            type="text"
            name="section"
            value={courseObj.section}
            onChange={(e) => {
              setCourseObj({ ...courseObj, section: e.target.value });
            }}
            placeholder="Section:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Semester:</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            value={courseObj.semester}
            onChange={(e) => {
              setCourseObj({ ...courseObj, semester: e.target.value });
            }}
            placeholder="Semester:"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Edit Course{" "}
        </Button>
      </form>
    </div>
  );
}
export default EditCourse;
