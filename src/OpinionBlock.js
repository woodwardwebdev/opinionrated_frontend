import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import OpinionAnswer from "./OpinionAnswer";
import OpinionCreate from "./OpinionCreate";
import OpinionResponses from "./OpinionResponses";

class OpinionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoice: "create",
      opinions: [],
    };
    this.handleUserChoice = this.handleUserChoice.bind(this);
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/getopinions")
      .then((res) => {
        let foundOpinions = res.data;
        this.setState({ opinions: foundOpinions });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleUserChoice(e) {
    this.setState({ userChoice: e.target.value });
  }

  handleCreateQuestion(data) {
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
    const { currentUser } = this.props;
    const { opinions, userChoice } = this.state;
    let content;
    userChoice === "create"
      ? (content = (
          <OpinionCreate
            currentUser={currentUser}
            handleSubmit={this.handleCreateQuestion}
          />
        ))
      : userChoice === "answer"
      ? (content = (
          <OpinionAnswer opinions={opinions} currentUser={currentUser} />
        ))
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
