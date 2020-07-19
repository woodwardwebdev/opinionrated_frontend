import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import OpinionBlock from "./OpinionBlock";
import LoginForm from "./LoginForm";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: true };
  }
  render() {
    let content;
    this.state.isLoggedIn
      ? (content = (
          <div>
            <Jumbotron>
              <h1>Opinionrated!</h1>
            </Jumbotron>
            <OpinionBlock />
          </div>
        ))
      : (content = <LoginForm />);
    return (
      <div>
        <Container fluid style={{ justifyContent: "center" }}>
          {content}
        </Container>
      </div>
    );
  }
}

export default LandingPage;
