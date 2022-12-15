import React, { Component } from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entryform.css";
//
//
const ADD_MOTIVATION = gql`
  mutation AddMotivationalTip($tip: String!) {
    addMotivationalTips(tip: $tip) {
      _id
    }
  }
`;
// Motivational tips are added by a nurse
const AddMotivation = () => {
  //
  let navigate = useNavigate();
  //
  let tip;
  const [addMotivationalTip, { data, loading, error }] =
    useMutation(ADD_MOTIVATION);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMotivationalTip({
            variables: {
              tip: tip.value,
            },
          });
          //
          tip.value = "";
          navigate("/motivationlist");
        }}
      >
        <Form.Group>
          <Form.Label> Tip:</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            ref={(node) => {
              tip = node;
            }}
            placeholder="Enter your tip here:"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {" "}
          Add Tip{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddMotivation;
