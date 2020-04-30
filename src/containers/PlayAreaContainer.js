import React from "react";
import AttackContainer from "./AttackContainer";
import DefenseContainer from "./DefenseContainer";
import { PlayAreaDiv } from "../styled";

class PlayAreaContainer extends React.Component {
  state = {
    attackArray: [],
    defenseArray: [],
    playAreaArray: [],
    playerAttacks: false,
    playerDefends: false,
    compAttacks: false,
    compDefends: false,
    newAttackCards: [],
    endTurn: false,
    compDoneAttack: false,
  };

  componentDidUpdate = (prevProps) => {
    const attackArray = this.state.attackArray;
    const newCompCard = this.props.compAttackCard;
    const defenseArray = this.state.defenseArray;
    const newPlayerCard = this.props.playerClickCard;
    if (this.props.compAttackCard !== prevProps.compAttackCard) {
      this.compBeginsAttack();
    } else if (
      this.state.playerDefends &&
      newPlayerCard &&
      this.state.attackArray.length > 0 &&
      this.defenseCheck(
        this.state.attackArray[this.state.attackArray.length - 1],
        newPlayerCard
      )
    ) {
      this.defenseByPlayer(newPlayerCard);
    } else if (
      this.state.playerDefends === false &&
      this.state.playAreaArray.length > 1
    ) {
      this.continueAttack(this.props.sendCompArray, this.props.shiftCompCard);
    } else if (
      this.state.defenseArray.length === this.state.attackArray.length &&
      this.state.playerDefends === false &&
      this.state.playAreaArray.length > 1 &&
      this.state.newAttackCards.length === 0 &&
      this.state.compDoneAttack
    ) {
      console.log("COMP ATTACK OVER!!!!!");
      this.setState({
        compAttacks: false,
        endTurn: true,
      });
    } else if (this.state.endTurn) {
      console.log("CLEAR THE PLAY AREA!!!!!");
      this.setState({
        playAreaArray: [],
      });
    }
    console.log(this.state.defenseArray.length, this.state.attackArray.length);
  };

  compBeginsAttack = () => {
    const newCompCard = this.props.compAttackCard;
    this.setState({
      attackArray: [...this.state.attackArray, newCompCard],
      playerDefends: true,
      compAttacks: true,
      playAreaArray: [...this.state.playAreaArray, newCompCard],
    });
  };

  defenseCheck = (attackingCard, defendingCard) => {
    // to make this work for the AI defending
    // add in logic to go over all of its cards and see
    // 1. if there is one that beats CARD i the same suit
    // 2. if they have a cozar card (LATER)
    // 3. if not, take the whole play area array
    return (
      (defendingCard.suit === attackingCard.suit &&
        this.props.cardValue[defendingCard.value] >
          this.props.cardValue[attackingCard.value]) ||
      defendingCard.suit === this.props.trumpCard.suit
    );
  };

  defenseByPlayer = (defendingCard) => {
    this.props.shiftPlayerCard(defendingCard);
    this.props.handlePlayerClick(null);
    this.setState({
      defenseArray: [...this.state.defenseArray, defendingCard],
      playAreaArray: [...this.state.playAreaArray, defendingCard],
      playerDefends: false,
    });
  };

  continueAttack = (array, func) => {
    let newAttackCards = array.filter((card) => {
      for (let i = 0; i < this.state.playAreaArray.length; i++) {
        const item = this.state.playAreaArray[i];
        if (
          this.props.cardValue[card.value] ===
            this.props.cardValue[item.value] &&
          card.suit !== this.props.trumpCard.suit
        ) {
          return card;
        }
      }
    });
    if (newAttackCards.length > 0) {
      this.setState(
        {
          attackArray: [...this.state.attackArray, newAttackCards[0]],
          playAreaArray: [...this.state.playAreaArray, newAttackCards[0]],
          newAttackCards: newAttackCards,
          playerDefends: true,
        },
        () => this.shiftCards(func)
      );
    }
  };

  shiftCards = (func) => {
    let newAttackCards = this.state.newAttackCards;
    let attackCard = newAttackCards.shift();
    return func(attackCard);
  };

  render() {
    console.log("player defends:", this.state.playerDefends);
    console.log("comp attacks:", this.state.compAttacks);
    console.log("attack array:", this.state.attackArray);
    console.log("defense array:", this.state.defenseArray);
    console.log("play area array:", this.state.playAreaArray);
    console.log(this.props.playerClickCard);
    console.log("endturn:", this.state.endTurn);
    console.log("new attack cards:", this.state.newAttackCards);
    return (
      <PlayAreaDiv>
        <div>PlayAreaContainer</div>
        <AttackContainer attackArray={this.state.attackArray} />
        <br></br>
        <DefenseContainer defenseArray={this.state.defenseArray} />
      </PlayAreaDiv>
    );
  }
}

export default PlayAreaContainer;

// } else if (
//   this.state.playerDefends &&
//   newPlayerCard &&
//   this.state.attackArray.length === 1 &&
//   this.defenseCheck(newCompCard, newPlayerCard)
// ) {
//   this.defenseByPlayer(newPlayerCard);
