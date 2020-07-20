import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

// "application/x-www-form-urlencoded";

class SingleOpinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      upvotes: 0,
      downvotes: 0,
      updated: false,
    };
    this.handleVoteButton = this.handleVoteButton.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser,
      upvotes: this.props.opinion.upvotes,
      downvotes: this.props.opinion.downvotes,
    });
  }

  componentDidUpdate() {}

  handleVoteButton(e) {
    const target = e.target.id;
    this.setState({ [target]: this.state[target] + 1 }, () => {
      const formData = {
        currentUser: this.props.currentUser._id,
        upvotes: this.state.upvotes,
        downvotes: this.state.downvotes,
      };
      axios
        .post(
          `http://localhost:1337/singlequestionvote/${this.props.opinion._id}`,
          formData
        )
        .then((res) => {
          this.setState({ currentUser: this.props.currentUser, updated: true });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  render() {
    let { opinion, currentUser } = this.props;
    let chosenAnswer = opinion.answers[0] || "";
    let buttons = (
      <div className="single-opinion-buttons">
        {this.state.upvotes}{" "}
        <Button variant="success" onClick={this.handleVoteButton} id="upvotes">
          Agree
        </Button>
        <Button variant="danger" onClick={this.handleVoteButton} id="downvotes">
          Disagree
        </Button>{" "}
        {this.state.downvotes}
      </div>
    );

    const hiddenAnswer = (
      <div className="single-opinion-hidden-answer">
        <h3>{chosenAnswer.answerer.username} wrote this!</h3>
      </div>
    );

    return (
      <div>
        <Card style={{ margin: "auto", width: "60vw" }}>
          <Card.Body>
            <h5>{opinion.question}</h5>
            <h3>{chosenAnswer.answer}</h3>
            {currentUser.hasVotedOn.includes(opinion._id) || this.state.updated
              ? hiddenAnswer
              : buttons}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleOpinion;
