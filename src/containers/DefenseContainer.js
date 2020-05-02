import React from "react";
import DefenseCard from "../components/DefenseCard";
import { DefenseCont } from "../styled";

class DefenseContainer extends React.Component {
  renderDefenseCards = () => {
    const cardsToRender = this.props.defenseArray;
    return cardsToRender.map((card) => {
      return <DefenseCard card={card} key={card.id} />;
    });
  };

  render() {
    // console.log(this.props.defenseArray);
    return <DefenseCont>{this.renderDefenseCards()}</DefenseCont>;
  }
}

export default DefenseContainer;
