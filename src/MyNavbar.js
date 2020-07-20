import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: false,
    };
  }

  render() {
    const { users, user, handleUserChange } = this.props;

    return (
      <div>
        <Navbar>
          <Navbar.Brand>
            <Link to="/">Opinionrated</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={user.username || "title"}
              id="basic-nav-dropdown"
            >
              {users.map((singleUser) => (
                <NavDropdown.Item
                  onClick={() => handleUserChange(singleUser._id)}
                  href="#action/3.1"
                  key={singleUser._id}
                >
                  {singleUser.username}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
