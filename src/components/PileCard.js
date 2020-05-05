import React from "react";
import { PileH3, PCard, Image, PDiv, PileAreaButton } from "../styled";

class PileCard extends React.Component {
  render() {
    console.log(this.props.playerDefends);
    // console.log(this.props.pile[this.props.pile.length - 1]);
    return (
      <PDiv>
        {this.props.pile.length > 1 ? (
          <PCard>
            <Image
              src={this.props.pile[this.props.pile.length - 1].imageBack}
            />
          </PCard>
        ) : (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}

        <div>
          <br></br>
          <PileH3>{this.props.pile.length} cards left</PileH3>
        </div>
        {this.props.defender === "player" ? (
          <PileAreaButton onClick={() => this.props.handleTakeButton(true)}>
            <strong>Take</strong>
          </PileAreaButton>
        ) : (
          <PileAreaButton onClick={() => this.props.handleDoneButton(true)}>
            <strong>Done With Attack</strong>
          </PileAreaButton>
        )}
      </PDiv>
    );
  }
}

export default PileCard;
