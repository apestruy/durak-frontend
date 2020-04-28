import React from "react";
import AttackContainer from "./AttackContainer";
import DefenseContainer from "./DefenseContainer";
import { PlayAreaDiv } from "../styled";

class PlayAreaContainer extends React.Component {
  state = {
    attackArray: [],
    defenseArray: [],
    playAreaArray: [],
    playerTurn: false,
  };

  componentDidUpdate = (prevProps) => {
    const attackArray = this.state.attackArray;
    const newCompCard = this.props.compAttackCard;
    const defenseArray = this.state.defenseArray;
    const newPlayerCard = this.props.playerClickCard;
    // console.log("new player card:", newPlayerCard);
    if (this.props.compAttackCard !== prevProps.compAttackCard) {
      attackArray.push(newCompCard);
      this.setState({
        attackArray: attackArray,
        playerTurn: true,
        playAreaArray: [...this.state.playAreaArray, newCompCard],
      });
    } else if (
      this.state.playerTurn &&
      newPlayerCard &&
      ((newPlayerCard.suit === newCompCard.suit &&
        this.props.cardValue[newPlayerCard.value] >
          this.props.cardValue[newCompCard.value]) ||
        newPlayerCard.suit === this.props.trumpCard.suit)
    ) {
      this.props.shiftPlayerCard(newPlayerCard);
      defenseArray.push(newPlayerCard);
      this.setState({
        defenseArray: defenseArray,
        playerTurn: false,
        playAreaArray: [...this.state.playAreaArray, newPlayerCard],
      });
      this.props.handlePlayerClick(null);
    }
    // else if (!this.state.playerTurn && this.state.playAreaArray.length > 0) {

    // }
  };

  // continueAttack = () => {

  // }

  render() {
    // console.log(this.props.compAttackCard);
    // console.log(this.props.playerClickCard);
    console.log(this.state.attackArray);
    console.log(this.state.defenseArray);
    console.log(this.state.playAreaArray);
    // console.log(this.state.defenseCardValid);
    return (
      <PlayAreaDiv>
        <div>PlayAreaContainer</div>
        <AttackContainer attackArray={this.state.attackArray} />
        <DefenseContainer defenseArray={this.state.defenseArray} />
        {/* <p>hi</p>
        <p>hi</p>
        <p>Hi</p>
        <p>Hi my name is askhdbeshkfbshkfhkds</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p> */}
      </PlayAreaDiv>
    );
  }
}

export default PlayAreaContainer;
