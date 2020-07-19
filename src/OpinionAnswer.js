import React, { Component } from "react";
import axios from "axios";
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { opinions } = this.props;
    let chosenOpinion = opinions[Math.floor(Math.random() * opinions.length)];
    this.setState({
      randomOpinion: chosenOpinion || { question: "No Question" },
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    let { randomOpinion, opinionText } = this.state;
    let { currentUser } = this.props;
    let data = {
      _id: randomOpinion._id,
      answer: opinionText,
      user: currentUser,
    };
    axios
      .post(`http://localhost:1337/singlequestion/${randomOpinion._id}`, data)
      .then((res) => {
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let { randomOpinion } = this.state;
    return (
      <Card style={{ margin: "auto", width: "60vw" }}>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
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
  }
}

export default OpinionAnswer;
