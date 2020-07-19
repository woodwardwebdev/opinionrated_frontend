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
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser,
      upvotes: this.props.opinion.upvotes,
      downvotes: this.props.opinion.downvotes,
    });
  }

  changeState(key, obj) {
    this.setState({ key: obj });
  }

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
          console.log(res);
          this.changeState("currentUser", res.data);
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
    let hiddenAnswer;
    if (currentUser.hasVotedOn.includes(opinion._id)) {
      hiddenAnswer = (
        <div className="single-opinion-hidden-answer">
          <h3>{chosenAnswer.answer}</h3>
          <h3>{chosenAnswer.answerer.username}</h3>
        </div>
      );
    }
    return (
      <div>
        <Card style={{ margin: "auto", width: "60vw" }}>
          <Card.Body>
            <h5>{opinion.question}</h5>
            {currentUser.hasVotedOn.includes(opinion._id)
              ? hiddenAnswer
              : buttons}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleOpinion;
