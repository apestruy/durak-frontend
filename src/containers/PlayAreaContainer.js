import React from "react";
import AttackContainer from "./AttackContainer";
import DefenseContainer from "./DefenseContainer";
import { PlayAreaDiv } from "../styled";

class PlayAreaContainer extends React.Component {
  state = {
    attackArray: [],
    defenseArray: [],
    playAreaArray: [],
    newAttackCards: [],
    compAttacks: false,
    playerDefends: false,
    compDoneAttack: false,
    endTurn: false,
    playerAttacks: false,
    compDefends: false,
    playerDoneAttack: false,
    didDefenderTake: false,
  };

  componentDidUpdate = (prevProps) => {
    // const attackArray = this.state.attackArray;
    // const newCompCard = this.props.compFirstAttackCard;
    // const defenseArray = this.state.defenseArray;
    const newPlayerCard = this.props.playerClickCard;
    if (this.props.compFirstAttackCard !== prevProps.compFirstAttackCard) {
      this.compBeginsAttack();
    } else if (
      this.state.playerDefends &&
      this.state.compAttacks === false &&
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
      this.state.compAttacks === true &&
      this.state.playAreaArray.length > 1
    ) {
      this.continueAttackCheck(
        this.props.sendCompArray,
        this.props.shiftCompCard
      );
    } else if (
      this.props.compNextAttackCard !== null &&
      this.state.compDoneAttack &&
      this.state.didDefenderTake &&
      this.state.playerDefends === false
    ) {
      this.compAttacksAgain();
    } else if (this.props.playerWantsToTake && this.state.playerDefends) {
      console.log("PLAYER TAKES");
      this.props.sendPlayAreaArray(this.state.playAreaArray);
      this.props.handleTakeButton(false, null);
      // this.props.compNextAttackCard(null);
      this.setState(
        {
          compAttacks: false,
          playerDefends: false,
          compDoneAttack: true,
          endTurn: true,
          didDefenderTake: true,
          playAreaArray: [],
          defenseArray: [],
          attackArray: [],
        },
        () => this.helperMethod("computer")
      );
    }
    console.log(this.state.defenseArray.length, this.state.attackArray.length);
  };

  compBeginsAttack = () => {
    const newCompCard = this.props.compFirstAttackCard;
    this.setState(
      {
        attackArray: [...this.state.attackArray, newCompCard],
        playerDefends: true,
        compAttacks: false,
        playAreaArray: [...this.state.playAreaArray, newCompCard],
      }
      // () => this.props.clearStartGame("no")
    );
  };

  compAttacksAgain = () => {
    const nextCompAttackCard = this.props.compNextAttackCard;
    console.log(nextCompAttackCard);
    // this.props.compNextAttackCard(null);
    this.setState({
      compDoneAttack: false,
      attackArray: [...this.state.attackArray, nextCompAttackCard],
      playerDefends: true,
      endTurn: false,
      compAttacks: false,
      playAreaArray: [...this.state.playAreaArray, nextCompAttackCard],
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
      compAttacks: true,
    });
  };

  continueAttackCheck = (array, func) => {
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
          compAttacks: false,
        },
        () => this.shiftCards(func)
      );
    } else {
      console.log("drawAtEndOfTurn");
      this.setState(
        {
          compAttacks: false,
          playerDefends: false,
          compDoneAttack: true,
          endTurn: true,
          didDefenderTake: false,
          playAreaArray: [],
          defenseArray: [],
          attackArray: [],
        },
        () => this.helperMethod("computer")
      );
    }
  };

  helperMethod = (name) => {
    this.props.compWasAttacking(this.state.compDoneAttack);
    this.props.didPlayerTake(this.state.didDefenderTake);
    this.props.drawAtEndOfTurn(this.state.didDefenderTake, name);
  };

  shiftCards = (func) => {
    let newAttackCards = this.state.newAttackCards;
    let attackCard = newAttackCards.shift();
    return func(attackCard);
  };

  render() {
    console.log("playerWantsToTake:", this.props.playerWantsToTake);
    console.log("COMP ATTACKS:", this.state.compAttacks);
    console.log("PLAYER DEFENDS:", this.state.playerDefends);
    console.log("COMP DONE ATTACK:", this.state.compDoneAttack);
    console.log("END TURN:", this.state.endTurn);
    console.log("DID PLAYER TAKE?:", this.state.didDefenderTake);
    console.log("ATTACK ARRAY:", this.state.attackArray);
    // console.log("DEFENSE ARRAY:", this.state.defenseArray);
    console.log("PLAYAREA ARRAY:", this.state.playAreaArray);
    // console.log(this.props.playerClickCard);
    console.log("new attack cards:", this.state.newAttackCards);
    return (
      <PlayAreaDiv>
        <div>PlayAreaContainer</div>
        {this.state.attackArray[0] !== null ||
        this.state.attackArray !== null ? (
          <AttackContainer attackArray={this.state.attackArray} />
        ) : null}
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
