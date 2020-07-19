import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class OpinionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const data = {
      question: this.state.questionText,
      createdBy: this.props.currentUser,
    };
    axios
      .post(`http://localhost:1337/singlequestion`, data)
      .then((res) => {
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Card style={{ margin: "auto", width: "80vw" }}>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Card.Title>- Create a Question -</Card.Title>
            <Card.Subtitle>The more controversial the better!</Card.Subtitle>
            <Form.Group controlId="questionForm">
              <Form.Control
                onChange={this.handleChange}
                as="input"
                name="questionText"
                autoComplete="off"
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Ask Away</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default OpinionCreate;
