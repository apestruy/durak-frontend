import React from "react";
import CompCard from "../components/CompCard";
import { CompCont } from "../styled";

class CompCardsContainer extends React.Component {
  state = {
    sortedCards: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.compCards !== prevProps.compCards) {
      const cardsToRender = this.props.compCards;
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
    } else if (this.props.whoStartsGame !== prevProps.whoStartsGame) {
      if (this.props.whoStartsGame === "computer") {
        let cards = this.state.sortedCards;
        let attackCard = cards.shift();
        this.props.compAttack(attackCard);
        this.setState({ sortedCards: cards });
      }
    }
  }

  renderCompCards = () => {
    return this.state.sortedCards.map((card) => {
      return <CompCard card={card} key={card.id} />;
    });
  };

  render() {
    // console.log(this.state.sortedCards);
    return <CompCont>{this.renderCompCards()}</CompCont>;
  }
}

export default CompCardsContainer;

// const cardsToRender = this.props.compCards;
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
//   console.log(sortedCards);

// if (this.props.whoStartsGame === "computer") {
//   let attackCard = sortedCards.shift();
//   this.props.compAttack(attackCard);
// }

// } else {
//   let sortedCards = cardsToRender.sort((a, b) => {
//     return this.props.cardValue[a.value] > this.props.cardValue[b.value]
//       ? 1
//       : -1;
//   });

// if (this.props.whoStartsGame === "computer") {
//   let attackCard = sortedCards.shift();
//   this.props.compAttack(attackCard);
// }

// return sortedCards.map((card) => {
//   return <CompCard card={card} key={card.id} />;
// });
