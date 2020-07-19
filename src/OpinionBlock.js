import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import OpinionAnswer from "./OpinionAnswer";
import OpinionCreate from "./OpinionCreate";
import OpinionResponses from "./OpinionResponses";

class OpinionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoice: "create",
    };
    this.handleUserChoice = this.handleUserChoice.bind(this);
  }

  handleUserChoice(e) {
    this.setState({ userChoice: e.target.value });
  }

  render() {
    const { opinions, currentUser } = this.props;
    const { userChoice } = this.state;
    let content;
    userChoice === "answer"
      ? (content = (
          <OpinionAnswer opinions={opinions} currentUser={currentUser} />
        ))
      : userChoice === "create"
      ? (content = <OpinionCreate currentUser={currentUser} />)
      : (content = (
          <OpinionResponses opinions={opinions} currentUser={currentUser} />
        ));
    return (
      <div>
        <Button
          style={{ margin: "1rem" }}
          id="createBtn"
          value="create"
          onClick={this.handleUserChoice}
        >
          Create Questions
        </Button>
        <Button
          style={{ margin: "1rem" }}
          id="answerBtn"
          value="answer"
          onClick={this.handleUserChoice}
        >
          Answer Questions
        </Button>
        <Button
          style={{ margin: "1rem" }}
          id="viewBtn"
          value="view"
          onClick={this.handleUserChoice}
        >
          View Answers
        </Button>
        {content}
      </div>
    );
  }
}

export default OpinionBlock;
