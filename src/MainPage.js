import React, { Component } from "react";
import MyNavbar from "./MyNavbar";
import ErrorScreen from "./ErrorScreen";
import OpinionBlock from "./OpinionBlock";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

// NOTE - pageUsers in state is only there until a login page is implemented.
// Should be replaced with login or the logged in user name.
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageUsers: [],
      user: "testUser",
      serverHasResponded: false,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  getUsers() {
    axios
      .get("http://localhost:1337/getusers")
      .then((res) => {
        let foundUsers = res.data;
        this.setState(
          { pageUsers: foundUsers, serverHasResponded: true },
          () => {
            this.setState({ user: this.state.pageUsers[0] });
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleUserChange(user_id) {
    axios.get(`http://localhost:1337/getusers/${user_id}`).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    let { pageUsers, user, serverHasResponded } = this.state;
    let pageContent = serverHasResponded ? (
      <div>
        <MyNavbar
          users={pageUsers}
          handleUserChange={this.handleUserChange}
          user={user}
        />
        <Jumbotron>
          <h1>Opinionrated!</h1>
        </Jumbotron>
        <OpinionBlock currentUser={user} />
      </div>
    ) : (
      <ErrorScreen />
    );
    return pageContent;
  }
}

export default MainPage;
