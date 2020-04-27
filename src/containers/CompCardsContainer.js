import React from "react";
import CompCard from "../components/CompCard";
import { CompCont } from "../styled";

class CompCardsContainer extends React.Component {
  renderCompCards = () => {
    let cardsToRender = this.props.compCards;
    return cardsToRender.map((card) => {
      return <CompCard card={card} key={card.id} />;
    });
  };

  render() {
    return <CompCont>{this.renderCompCards()}</CompCont>;
  }
}

export default CompCardsContainer;
