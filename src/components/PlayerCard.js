import React from "react";
import { Card, Image } from "../styled";

class PlayerCard extends React.Component {
  render() {
    return (
      <div>
        <Card onClick={() => this.props.handlePlayerClick(this.props.card)}>
          <Image src={this.props.card.imageUrl} alt="player card" />
          {/* <PlayerH5>
            {props.card.value}, {props.card.suit}
          </PlayerH5> */}
        </Card>
      </div>
    );
  }
}

export default PlayerCard;
