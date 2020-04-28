import React from "react";
import AttackCard from "../components/AttackCard";

class AttackContainer extends React.Component {
  renderAttackCards = () => {
    const cardsToRender = this.props.attackArray;
    return cardsToRender.map((card) => {
      return <AttackCard card={card} key={card.id} />;
    });
  };

  render() {
    console.log(this.props.attackArray);
    return (
      <div>
        <div>AttackContainer</div>
        {this.renderAttackCards()}
      </div>
    );
  }
}

export default AttackContainer;
