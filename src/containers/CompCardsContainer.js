import React from "react";
import CompCard from "../components/CompCard";
import { CompCont } from "../styled";

class CompCardsContainer extends React.Component {
  state = {
    sortedCards: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.compCards !== prevProps.compCards) {
      this.sortCards(this.props.compCards);
    } else if (this.props.whoStartsGame !== prevProps.whoStartsGame) {
      if (this.props.whoStartsGame === "computer") {
        let cards = this.state.sortedCards;
        let attackCard = cards.shift();
        this.props.compFirstAttackCard(attackCard);
        this.setState({ sortedCards: cards });
        this.props.sendCompArray(cards);
        this.props.lengthCompHand(cards.length);
      }
    } else if (this.props.compWasAttacking && this.props.didPlayerTake) {
      console.log("num 1");
      let cards = this.state.sortedCards;
      let attackCard = cards.shift();
      // console.log("compNextAttackCard:", attackCard);
      // console.log(cards);
      this.props.compNextAttackCard(attackCard);
      this.setState({ sortedCards: cards }, () =>
        this.helperMethod(cards, attackCard)
      );
    } else if (
      this.props.defender === "player" &&
      this.props.playerWasAttacking
    ) {
      console.log("num 2");
      let cards = this.state.sortedCards;
      let attackCard = cards.shift();
      // console.log("compNextAttackCard:", attackCard);
      // console.log(cards);
      this.props.compNextAttackCard(attackCard);
      this.setState({ sortedCards: cards }, () =>
        this.helperMethod(cards, attackCard)
      );
    } else if (this.props.shiftCompCard !== prevProps.shiftCompCard) {
      const cards = this.state.sortedCards;
      let i = 0;
      while (i < cards.length) {
        const shiftedCard = cards[i];
        if (shiftedCard === this.props.shiftCompCard) {
          cards.splice(i, 1);
        } else {
          i += 1;
        }
        this.setState({ sortedCards: cards });
        this.props.sendCompArray(cards);
        this.props.lengthCompHand(cards.length);
      }
    } else if (
      this.props.sendPlayAreaArray !== prevProps.sendPlayAreaArray &&
      this.props.defender === "computer"
    ) {
      let oldCards = this.state.sortedCards;
      Array.prototype.push.apply(oldCards, this.props.sendPlayAreaArray);
      this.sortCards(oldCards);
    }
  }

  helperMethod = (cards, attackCard) => {
    // this.props.compNextAttackCard(attackCard);
    this.props.sendCompArray(cards);
    this.props.lengthCompHand(cards.length);
  };
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
      this.props.sendCompArray(sortedCards);
      this.props.lengthCompHand(sortedCards.length);
    } else {
      let sortedCards = cardsToRender.sort((a, b) => {
        return this.props.cardValue[a.value] > this.props.cardValue[b.value]
          ? 1
          : -1;
      });
      this.setState({ sortedCards: sortedCards });
      this.props.sendCompArray(sortedCards);
      this.props.lengthCompHand(sortedCards.length);
    }
  };
  renderCompCards = () => {
    return this.state.sortedCards.map((card) => {
      return <CompCard card={card} key={card.id} />;
    });
  };

  render() {
    // console.log("COMP CARDS LENGTH:", this.state.sortedCards.length);
    return (
      <div>
        <br></br>
        <CompCont>{this.renderCompCards()}</CompCont>
      </div>
    );
  }
}

export default CompCardsContainer;
