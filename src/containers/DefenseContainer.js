import React from "react";
import DefenseCard from "../components/DefenseCard";
import { DefenseContComp, DefenseContPlayer } from "../styled";

class DefenseContainer extends React.Component {
  renderDefenseCards = () => {
    const cardsToRender = this.props.defenseArray;
    return cardsToRender.map((card) => {
      return <DefenseCard card={card} key={card.id} />;
    });
  };

  render() {
    return (
      <div>
        {this.props.playerAttacks || this.props.compDefends ? (
          <DefenseContComp>{this.renderDefenseCards()}</DefenseContComp>
        ) : null}
        {this.props.compAttacks || this.props.playerDefends ? (
          <DefenseContPlayer>{this.renderDefenseCards()}</DefenseContPlayer>
        ) : null}
      </div>
    );
  }
}

export default DefenseContainer;
