import React from "react";
import AttackCard from "../components/AttackCard";
import { AttackCont } from "../styled";

class AttackContainer extends React.Component {
  renderAttackCards = () => {
    const cardsToRender = this.props.attackArray;
    return cardsToRender.map((card) => {
      return <AttackCard card={card} key={card.id} />;
    });
  };

  render() {
    return (
      <div>
        <AttackCont>{this.renderAttackCards()}</AttackCont>
      </div>
    );
  }
}

export default AttackContainer;
