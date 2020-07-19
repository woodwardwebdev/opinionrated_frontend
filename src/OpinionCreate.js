import React, { Component } from "react";
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
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { handleSubmit } = this.props;
    const data = {
      question: this.state.questionText,
      createdBy: this.props.currentUser,
    };
    return (
      <Card style={{ margin: "auto", width: "60vw" }}>
        <Card.Body>
          <Form onSubmit={() => handleSubmit(data)}>
            <Card.Title>- Create a Question -</Card.Title>
            <Card.Subtitle>The more controversial the better!</Card.Subtitle>
            <Form.Group controlId="questionForm">
              <Form.Control
                onChange={this.handleChange}
                as="input"
                name="questionText"
                autoComplete="off"
                required
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
