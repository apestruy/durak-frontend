import React from "react";
import { PileH5, PCard, Image, PDiv } from "../styled";

class PileCard extends React.Component {
  render() {
    // console.log(this.props.pile);
    // console.log(this.props.pile[this.props.pile.length - 1]);
    return (
      <PDiv>
        {this.props.pile.length > 1 ? (
          <PCard>
            <Image src={this.props.pile[this.props.pile.length - 1].imageUrl} />
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
          <PileH5>{this.props.pile.length} cards left</PileH5>
        </div>
        <br></br>
        <button onClick={() => this.props.handleTakeButton(true)}>Take</button>
        <br></br>
        <button onClick={() => this.props.handleDoneButton(true)}>Done</button>
      </PDiv>
    );
  }
}

export default PileCard;
