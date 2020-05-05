import React from "react";
import TrumpCard from "../components/TrumpCard";
import PileCard from "../components/PileCard";
import { PileAreaDiv } from "../styled";

const PileAreaContainer = (props) => {
  return (
    <PileAreaDiv>
      {/* <div>PileAreaContainer</div> */}
      <br></br>
      <br></br>
      <br></br>
      <TrumpCard trumpCard={props.trumpCard} pile={props.pile} />
      <PileCard
        pile={props.pile}
        handleTakeButton={props.handleTakeButton}
        defender={props.defender}
        handleDoneButton={props.handleDoneButton}
      />
    </PileAreaDiv>
  );
};

export default PileAreaContainer;
