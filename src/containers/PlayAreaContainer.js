import React from "react";
import AttackContainer from "./AttackContainer";
import DefenseContainer from "./DefenseContainer";
import { PlayAreaDiv } from "../styled";

class PlayAreaContainer extends React.Component {
  render() {
    return (
      <PlayAreaDiv>
        <div>PlayAreaContainer</div>
        <AttackContainer />
        <DefenseContainer />
        {/* <p>hi</p>
        <p>hi</p>
        <p>Hi</p>
        <p>Hi my name is askhdbeshkfbshkfhkds</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p> */}
      </PlayAreaDiv>
    );
  }
}

export default PlayAreaContainer;
