import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class OpinionAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomOpinion: {},
      opinionText: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let { opinions } = this.props;
    let chosenOpinion = opinions[Math.floor(Math.random() * opinions.length)];
    this.setState({
      randomOpinion: chosenOpinion,
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { handleCreateAnswer, currentUser } = this.props;
    let { randomOpinion, opinionText } = this.state;

    let data = {
      answer: opinionText,
      user: currentUser,
    };

    if (randomOpinion !== undefined) {
      return (
        <Card style={{ margin: "auto", width: "60vw" }}>
          <Card.Body>
            <Form onSubmit={() => handleCreateAnswer(randomOpinion._id, data)}>
              <Card.Subtitle>What do you think?</Card.Subtitle>
              <Card.Title>{randomOpinion.question}</Card.Title>
              <Form.Group controlId="opinionForm">
                <Form.Control
                  onChange={this.handleChange}
                  as="textarea"
                  rows="3"
                  name="opinionText"
                  required
                ></Form.Control>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card style={{ margin: "auto", width: "60vw" }}>
          <Card.Body>
            <Card.Title>There are no Questions yet! Go make one!</Card.Title>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default OpinionAnswer;
