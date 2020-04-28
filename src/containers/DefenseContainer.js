import React from "react";
import DefenseCard from "../components/DefenseCard";

class DefenseContainer extends React.Component {
  renderDefenseCards = () => {
    const cardsToRender = this.props.defenseArray;
    return cardsToRender.map((card) => {
      return <DefenseCard card={card} key={card.id} />;
    });
  };

  render() {
    console.log(this.props.defenseArray);
    return (
      <div>
        <div>DefenseContainer</div>
        {this.renderDefenseCards()}
      </div>
    );
  }
}

export default DefenseContainer;
