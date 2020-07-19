import React, { Component } from "react";
import SingleOpinion from "./SingleOpinion";

class OpinionResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { opinions, currentUser } = this.props;
    return (
      <div className="single-opinion">
        <h5>Lets see your friends responses.....</h5>
        {opinions.map((opinion) => {
          if (opinion.createdBy !== currentUser._id) {
            console.log(opinion.answers);
            return (
              <SingleOpinion
                key={opinion._id}
                opinion={opinion}
                currentUser={currentUser}
              ></SingleOpinion>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default OpinionResponses;
