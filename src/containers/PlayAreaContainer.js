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
    newAttackCards: null,
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
    } else if (!this.state.playerTurn && this.state.playAreaArray.length > 0) {
      this.continueAttack(this.props.sendCompArray, this.props.shiftCompCard);
    }
    // else if (
    //   this.state.playerTurn &&
    //   newPlayerCard &&
    //   this.state.attackArray.length > 1
    // ) {
    //   console.log("hiiiiiii");
    // }
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
    this.setState(
      {
        attackArray: [...this.state.attackArray, ...newAttackCards],
        playAreaArray: [...this.state.playAreaArray, ...newAttackCards],
        newAttackCards: newAttackCards,
        playerTurn: !this.state.playerTurn,
      },
      () => this.shiftCards(func)
    );
  };

  shiftCards = (func) => {
    let newAttackCards = this.state.newAttackCards;
    return newAttackCards.map((card) => {
      return func(card);
    });
  };

  render() {
    // console.log(this.props.compAttackCard);
    console.log(this.state.playerTurn);
    console.log(this.state.attackArray);
    console.log(this.state.defenseArray);
    console.log(this.state.playAreaArray);
    console.log(this.props.playerClickCard);
    return (
      <PlayAreaDiv>
        <div>PlayAreaContainer</div>
        <AttackContainer attackArray={this.state.attackArray} />
        <br></br>
        <DefenseContainer defenseArray={this.state.defenseArray} />
        {/* <p>hi</p>
        <p>hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
      <p>Hi</p> */}
      </PlayAreaDiv>
    );
  }
}

export default PlayAreaContainer;

// let newAttackCards = this.state.newAttackCards;
// return newAttackCards.map((card) => {
//   return this.props.shiftCompCard(card);
// });

// let newArr = this.props.sendCompArray.filter((card) => {
//   for (let i = 0; i < this.state.playAreaArray.length; i++) {
//     const item = this.state.playAreaArray[i];
//     if (
//       this.props.cardValue[card.value] ===
//         this.props.cardValue[item.value] &&
//       card.suit !== this.props.trumpCard.suit
//     ) {
//       return card;
//     }
//   }
// });
// this.setState({
//   attackArray: [...this.state.attackArray, ...newArr],
//   playerTurn: true,
// });
// let i = 0;
//   while (i < this.state.playAreaArray.length) {
//     const item = this.state.playAreaArray[i];
//     const result = array.filter(card => {
//       return (this.props.cardValue[card.value] === this.props.cardValue[item.value] && card.suit !== this.props.trumpCard.suit)
//     })
//     i += 1;
//     console.log(result)
//   }
