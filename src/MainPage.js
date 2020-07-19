import React, { Component } from "react";
import MyNavbar from "./MyNavbar";
import OpinionBlock from "./OpinionBlock";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opinionQuestions: [],
      pageUsers: [],
      user: "testUser",
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/getopinions")
      .then((res) => {
        let foundOpinions = res.data;
        this.setState({ opinionQuestions: foundOpinions });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://localhost:1337/getusers")
      .then((res) => {
        let foundUsers = res.data;
        this.setState({ pageUsers: foundUsers }, () => {
          this.setState({ user: this.state.pageUsers[0] });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUserChange(user_id) {
    axios.get(`http://localhost:1337/getusers/${user_id}`).then((res) => {
      // this.setState({ user: this.state.pageUsers[3] });
      this.setState({ user: res.data });
    });
  }

  render() {
    let { pageUsers, user } = this.state;
    return (
      <div>
        <MyNavbar
          users={pageUsers}
          handleUserChange={this.handleUserChange}
          user={user}
        />
        <Jumbotron>
          <h1>Opinionrated!</h1>
        </Jumbotron>
        <OpinionBlock
          opinions={this.state.opinionQuestions}
          currentUser={user}
        />
      </div>
    );
  }
}

export default MainPage;
