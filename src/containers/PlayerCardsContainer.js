import React from "react";
import PlayerCard from "../components/PlayerCard";
import { PlayerCont } from "../styled";

class PlayerCardsContainer extends React.Component {
  state = {
    sortedCards: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.playerCards !== prevProps.playerCards) {
      const cardsToRender = this.props.playerCards;
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
      } else {
        let sortedCards = cardsToRender.sort((a, b) => {
          return this.props.cardValue[a.value] > this.props.cardValue[b.value]
            ? 1
            : -1;
        });
        this.setState({ sortedCards: sortedCards });
      }
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
      }

      // console.log(shiftedCard);
      // console.log(this.props.shiftPlayerCard);
      // console.log(cards);

      // let shiftedCard = cards.filter((card) => {
      //   return card === this.props.shiftPlayerCard;
      // });
    }
  }

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
    return <PlayerCont>{this.renderPlayerCards()}</PlayerCont>;
  }
}

export default PlayerCardsContainer;

// const cardsToRender = this.props.playerCards;
// const cardsWithoutTrump = cardsToRender.filter(
//   (card) => card.suit !== this.props.trumpCard.suit
// );
// if (cardsWithoutTrump.length > 0) {
//   let sortedCards = cardsWithoutTrump.sort((a, b) => {
//     return this.props.cardValue[a.value] > this.props.cardValue[b.value]
//       ? 1
//       : -1;
//   });
//   const trumpCards = cardsToRender.filter(
//     (card) => card.suit === this.props.trumpCard.suit
//   );
//   let sortedTrumpCards = trumpCards.sort((a, b) => {
//     return this.props.cardValue[a.value] > this.props.cardValue[b.value]
//       ? 1
//       : -1;
//   });
//   Array.prototype.push.apply(sortedCards, sortedTrumpCards);
// } else {
// let sortedCards = cardsToRender.sort((a, b) => {
//   return this.props.cardValue[a.value] > this.props.cardValue[b.value]
//     ? 1
//     : -1;
// });
// return sortedCards.map((card) => {
//   return (
//     <PlayerCard
//       card={card}
//       key={card.id}
//       handleClick={this.props.handlePlayerClick}
//     />
//   );
// });
