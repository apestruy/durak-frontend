import React from "react";
import PlayerCard from "../components/PlayerCard";
import { PlayerCont } from "../styled";

class PlayerCardsContainer extends React.Component {
  renderPlayerCards = () => {
    let cardsToRender = this.props.playerCards;
    return cardsToRender.map((card) => {
      return <PlayerCard card={card} key={card.id} />;
    });
  };

  render() {
    return (
      <div>
        <PlayerCont>{this.renderPlayerCards()}</PlayerCont>
      </div>
    );
  }
}

export default PlayerCardsContainer;
