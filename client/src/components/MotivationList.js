import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_COURSES = gql`
  {
    courses {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;
const DELETE_COURSE = gql`
  mutation deleteCourse($id: String!) {
    deleteCourse(id: $id) {
      _id
    }
  }
`;
//
const CourseList = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_COURSES);
  const [deleteCourse, { deletedData }] = useMutation(DELETE_COURSE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>Course id</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
          </tr>
          {data.courses.map((course, index) => (
            <tr key={index}>
              <td>{course._id}</td>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.section}</td>
              <td>
                <Button
                  style={{ "background-color": "green" }}
                  onClick={() => navigate("/editcourse", { state: { course } })}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  style={{ "background-color": "red" }}
                  onClick={() => {
                    deleteCourse({ variables: { id: course._id } });
                    window.location.reload();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        style={{ backgroundColor: "lightblue", color: "black" }}
        onClick={() => navigate(`/addcourse`)}
      >
        Add Course
      </Button>
      <Button style={{ backgroundColor: "green" }} onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

export default CourseList;
