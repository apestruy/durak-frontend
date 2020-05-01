import React from "react";
import PlayerCard from "../components/PlayerCard";
import { PlayerCont } from "../styled";

class PlayerCardsContainer extends React.Component {
  state = {
    sortedCards: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.playerCards !== prevProps.playerCards) {
      this.sortCards(this.props.playerCards);
    } else if (this.props.shiftPlayerCard !== prevProps.shiftPlayerCard) {
      const cards = this.state.sortedCards;
      let i = 0;
      while (i < cards.length) {
        const shiftedCard = cards[i];
        if (shiftedCard === this.props.shiftPlayerCard) {
          cards.splice(i, 1);
        } else {
          i += 1;
        }
        this.setState({ sortedCards: cards });
        this.props.sendPlayerArray(cards);
        this.props.lengthPlayerHand(cards.length);
      }
    } else if (this.props.sendPlayAreaArray !== prevProps.sendPlayAreaArray) {
      let oldCards = this.state.sortedCards;
      Array.prototype.push.apply(oldCards, this.props.sendPlayAreaArray);
      this.sortCards(oldCards);
    }
  }

  sortCards = (array) => {
    const cardsToRender = array;
    const cardsWithoutTrump = cardsToRender.filter(
      (card) => card.suit !== this.props.trumpCard.suit
    );
    if (cardsWithoutTrump.length > 0) {
      let sortedCards = cardsWithoutTrump.sort((a, b) => {
        return this.props.cardValue[a.value] > this.props.cardValue[b.value]
          ? 1
          : -1;
      });
      const trumpCards = cardsToRender.filter(
        (card) => card.suit === this.props.trumpCard.suit
      );
      let sortedTrumpCards = trumpCards.sort((a, b) => {
        return this.props.cardValue[a.value] > this.props.cardValue[b.value]
          ? 1
          : -1;
      });
      Array.prototype.push.apply(sortedCards, sortedTrumpCards);
      this.setState({ sortedCards: sortedCards });
      this.props.sendPlayerArray(sortedCards);
      this.props.lengthPlayerHand(sortedCards.length);
    } else {
      let sortedCards = cardsToRender.sort((a, b) => {
        return this.props.cardValue[a.value] > this.props.cardValue[b.value]
          ? 1
          : -1;
      });
      this.setState({ sortedCards: sortedCards });
      this.props.sendPlayerArray(sortedCards);
      this.props.lengthPlayerHand(sortedCards.length);
    }
  };

  renderPlayerCards = () => {
    return this.state.sortedCards.map((card) => {
      return (
        <PlayerCard
          card={card}
          key={card.id}
          handlePlayerClick={this.props.handlePlayerClick}
        />
      );
    });
  };

  render() {
    // console.log("PLAYER CARDS LENGTH:", this.state.sortedCards.length);
    return <PlayerCont>{this.renderPlayerCards()}</PlayerCont>;
  }
}

export default PlayerCardsContainer;
