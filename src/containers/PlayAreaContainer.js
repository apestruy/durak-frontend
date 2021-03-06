import React from "react";
import AttackContainer from "./AttackContainer";
import DefenseContainer from "./DefenseContainer";
import EndOfGame from "../components/EndOfGame";
import { PlayAreaDiv } from "../styled";

class PlayAreaContainer extends React.Component {
  state = {
    attackArray: [],
    defenseArray: [],
    playAreaArray: [],
    newAttackCards: [],
    newDefendCards: [],
    compAttacks: false,
    playerDefends: false,
    compDoneAttack: false,
    endTurn: false,
    playerAttacks: false,
    compDefends: false,
    playerDoneAttack: false,
    didDefenderTake: false,
    endOfGamePlayerLost: false,
    endOfGamePlayerWon: false,
  };

  componentDidUpdate = (prevProps) => {
    const newPlayerCard = this.props.playerClickCard;
    if (this.props.compFirstAttackCard !== prevProps.compFirstAttackCard) {
      console.log("num 1");
      this.compBeginsAttack();
    } else if (
      (this.props.lengthPlayerHand === 0 &&
        this.props.sendCompArray.length > 0 &&
        this.state.playerAttacks &&
        this.props.pile === 0) ||
      (this.props.lengthPlayerHand === 0 &&
        this.state.compAttacks &&
        this.props.pile === 0) ||
      (this.state.compDoneAttack &&
        this.props.lengthPlayerHand === 0 &&
        this.props.pile === 0)
    ) {
      console.log("PLAYER WON!");
      this.endOfGamePlayerWon();
      this.props.defender("");
      // } else if (
      //   this.props.lengthPlayerHand === 0 &&
      //   this.props.sendCompArray.length === 0 &&
      //   this.state.playerAttacks &&
      //   this.props.pile === 0
      // ) {
      //   console.log("It's a tie!");
    } else if (
      (this.props.compNextAttackCard === undefined &&
        this.state.compDoneAttack &&
        this.state.didDefenderTake &&
        this.state.playerDefends === false) ||
      (!this.props.compNextAttackCard &&
        !this.props.sendCompArray &&
        this.state.playerAttacks) ||
      ((!this.props.sendCompArray ||
        this.props.sendCompArray.length === 0 ||
        !this.props.sendCompArray[0]) &&
        this.state.playerAttacks &&
        this.props.pile === 0)
    ) {
      console.log("num 4");
      console.log("GAME OVER! Computer won :(");
      this.endOfGamePlayerLost();
      this.props.defender("");
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
      console.log("num 2");
      this.defenseByPlayer(newPlayerCard);
    } else if (
      this.state.playerDefends === false &&
      this.state.compAttacks === true &&
      this.state.playAreaArray.length > 1 &&
      this.props.lengthPlayerHand > 1
    ) {
      console.log("num 3");
      this.compAttackCheck(this.props.sendCompArray, this.props.shiftCompCard);
    } else if (
      this.props.compNextAttackCard !== null &&
      this.state.compDoneAttack &&
      this.state.didDefenderTake &&
      // this.props.sendCompArray.length > 1 &&
      this.state.playerDefends === false
    ) {
      console.log("num 5");
      this.compAttacksAgain();
    } else if (this.props.playerWantsToTake && this.state.playerDefends) {
      console.log("num 6");
      this.playerTakes();
    } else if (
      this.props.whoStartsGame !== prevProps.whoStartsGame &&
      this.props.whoStartsGame === "player"
    ) {
      this.props.defender("computer");
      this.setState({ playerAttacks: true });
    } else if (
      this.state.playerAttacks &&
      this.props.playerClickCard !== prevProps.playerClickCard &&
      this.state.endTurn === false
    ) {
      console.log("num 7");
      const newPlayerAttackCard = this.props.playerClickCard;
      this.moveByPlayer(newPlayerAttackCard);
      // console.log("move by player");
      // console.log("PLAYER CLICKED THIS:", this.props.playerClickCard);
    } else if (this.state.compDefends && this.state.attackArray.length > 0) {
      console.log("num 8");
      this.compDefendCheck(
        this.state.attackArray[this.state.attackArray.length - 1],
        this.props.sendCompArray,
        this.props.shiftCompCard
      );
    } else if (
      // (this.props.playerIsDoneButton && this.state.playerAttacks === false) ||
      this.props.playerIsDoneButton &&
      this.state.playerAttacks &&
      this.state.endTurn
    ) {
      this.props.handleDoneButton(false);
    } else if (
      this.props.playerIsDoneButton &&
      this.state.playerAttacks &&
      this.state.playAreaArray.length > 1
    ) {
      console.log("num 9");
      this.playerDoneAttacking();
    } else if (
      this.state.playerAttacks &&
      this.state.playAreaArray.length > 1 &&
      this.props.lengthPlayerHand === 0 &&
      this.props.pile > 0
    ) {
      this.playerDoneAttacking();
    } else if (
      this.state.playerAttacks === false &&
      this.props.compNextAttackCard !== null &&
      this.props.sendCompArray.length > 0 &&
      this.state.playerDoneAttack
    ) {
      console.log("num 10");
      this.compAttacksAgain();
    } else if (
      this.state.playerAttacks &&
      this.state.endTurn &&
      this.props.playerClickCard
    ) {
      console.log("num 11");
      const newPlayerAttackCard = this.props.playerClickCard;
      this.moveByPlayer(newPlayerAttackCard);
    }

    console.log(this.state.defenseArray.length, this.state.attackArray.length);
  };

  compBeginsAttack = () => {
    const newCompCard = this.props.compFirstAttackCard;
    this.props.defender("player");
    this.setState({
      attackArray: [...this.state.attackArray, newCompCard],
      playerDefends: true,
      compAttacks: false,
      playAreaArray: [...this.state.playAreaArray, newCompCard],
    });
  };

  compAttacksAgain = () => {
    const nextCompAttackCard = this.props.compNextAttackCard;
    // console.log(nextCompAttackCard);
    // this.props.compNextAttackCard(null);
    this.props.defender("player");
    this.setState(
      {
        playerWasAttacking: false,
        compDoneAttack: false,
        attackArray: [...this.state.attackArray, nextCompAttackCard],
        playerDefends: true,
        endTurn: false,
        compAttacks: false,
        playAreaArray: [...this.state.playAreaArray, nextCompAttackCard],
      }
      // () => this.props.defender("player")
    );
  };

  defenseCheck = (attackingCard, defendingCard) => {
    return (
      (defendingCard.suit === attackingCard.suit &&
        this.props.cardValue[defendingCard.value] >
          this.props.cardValue[attackingCard.value]) ||
      (defendingCard.suit === this.props.trumpCard.suit &&
        attackingCard.suit !== this.props.trumpCard.suit)
    );
  };

  defenseByPlayer = (defendingCard) => {
    this.props.shiftPlayerCard(defendingCard);
    this.props.handlePlayerClick(null);
    this.props.defender("player");
    this.setState(
      {
        defenseArray: [...this.state.defenseArray, defendingCard],
        playAreaArray: [...this.state.playAreaArray, defendingCard],
        playerDefends: false,
        compAttacks: true,
      }
      // () => this.props.defender("player")
    );
  };

  playerTakes = () => {
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
  };

  moveByPlayer = (attackingCard) => {
    this.props.shiftPlayerCard(attackingCard);
    this.props.handlePlayerClick(null);
    this.props.defender("computer");
    this.setState(
      {
        attackArray: [...this.state.attackArray, attackingCard],
        playAreaArray: [...this.state.playAreaArray, attackingCard],
        playerAttacks: false,
        compDefends: true,
        endTurn: false,
      }
      // () => this.props.defender("computer")
    );
  };

  playerDoneAttacking = () => {
    // this.props.sendPlayAreaArray(this.state.playAreaArray);
    this.props.handleDoneButton(false, null);
    this.props.defender("player");
    this.setState(
      {
        playerAttacks: false,
        compDefends: false,
        playerDoneAttack: true,
        // endTurn: true,
        didDefenderTake: false,
        playAreaArray: [],
        defenseArray: [],
        attackArray: [],
      },
      () => this.helperMethodPlayerAttacks("player")
    );
  };
  // () => this.props.playerWasAttacking(this.state.playerDoneAttack)

  compAttackCheck = (array, func) => {
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
        () => this.shiftAttackCards(func)
      );
    } else {
      console.log("TAKE FROM PILE, BOTH TAKES");
      this.props.defender("computer");
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
          playerAttacks: true,
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

  helperMethodPlayerAttacks = (name) => {
    this.props.drawAtEndOfTurn(this.state.didDefenderTake, name);
    this.props.playerWasAttacking(this.state.playerDoneAttack);
  };

  shiftAttackCards = (func) => {
    let newAttackCards = this.state.newAttackCards;
    let attackCard = newAttackCards.shift();
    return func(attackCard);
  };

  shiftDefendCards = (func) => {
    let newDefendCards = this.state.newDefendCards;
    let defendCard = newDefendCards.shift();
    return func(defendCard);
  };

  compDefendCheck = (attackingCard, array, func) => {
    let newDefendCards = array.filter((card) => {
      if (
        (card.suit === attackingCard.suit &&
          this.props.cardValue[card.value] >
            this.props.cardValue[attackingCard.value]) ||
        (card.suit === this.props.trumpCard.suit &&
          attackingCard.suit !== this.props.trumpCard.suit)
      ) {
        return card;
      }
    });
    if (newDefendCards.length > 0) {
      this.setState(
        {
          defenseArray: [...this.state.defenseArray, newDefendCards[0]],
          playAreaArray: [...this.state.playAreaArray, newDefendCards[0]],
          newDefendCards: newDefendCards,
          playerAttacks: true,
          compDefends: false,
        },
        () => this.shiftDefendCards(func)
      );
    } else {
      console.log("TAKE FROM PILE, COMP TAKES");
      this.props.sendPlayAreaArray(this.state.playAreaArray);
      this.setState(
        {
          playerAttacks: true,
          compDefends: false,
          playerDoneAttack: false,
          endTurn: false,
          didDefenderTake: true,
          playAreaArray: [],
          defenseArray: [],
          attackArray: [],
          compAttacks: false,
          compDoneAttack: false,
        },
        () => this.props.drawAtEndOfTurn(this.state.didDefenderTake, "player")
      );
    }
  };

  endOfGamePlayerWon = () => {
    this.setState({
      attackArray: [],
      defenseArray: [],
      playAreaArray: [],
      newAttackCards: [],
      newDefendCards: [],
      compAttacks: false,
      playerDefends: false,
      compDoneAttack: false,
      endTurn: false,
      playerAttacks: false,
      compDefends: false,
      playerDoneAttack: false,
      didDefenderTake: false,
      endOfGamePlayerWon: true,
    });
  };

  endOfGamePlayerLost = () => {
    this.setState({
      attackArray: [],
      defenseArray: [],
      playAreaArray: [],
      newAttackCards: [],
      newDefendCards: [],
      compAttacks: false,
      playerDefends: false,
      compDoneAttack: false,
      endTurn: false,
      playerAttacks: false,
      compDefends: false,
      playerDoneAttack: false,
      didDefenderTake: false,
      endOfGamePlayerLost: true,
    });
  };
  renderAttackContainer = () => {
    if (
      this.state.attackArray[0] !== null &&
      this.state.attackArray !== null &&
      this.state.attackArray[0] !== undefined &&
      this.state.attackArray !== undefined
    ) {
      return <AttackContainer attackArray={this.state.attackArray} />;
    }
  };

  render() {
    console.log("this.props.playerIsDoneButton", this.props.playerIsDoneButton);
    console.log("endOfGamePlayerLost", this.state.endOfGamePlayerLost);
    console.log("COMP ATTACKS:", this.state.compAttacks);
    console.log("PLAYERS DEFENDS:", this.state.playerDefends);
    console.log("END TURN:", this.state.endTurn);
    console.log("COMP DONE ATTACK:", this.state.compDoneAttack);
    console.log("NEXT COMP CARD:", this.props.compNextAttackCard);
    console.log("COMP HAND:", this.props.sendCompArray);
    console.log("PLAYER HAND", this.props.lengthPlayerHand);
    // // console.log("playerWantsToTake:", this.props.playerWantsToTake);
    console.log("DID DEFENDER TAKE?:", this.state.didDefenderTake);
    console.log("PLAYER ATTACKS:", this.state.playerAttacks);
    // // console.log("COMP DEFENDS:", this.state.compDefends);
    // // console.log("PLAYER DONE ATTACK:", this.state.playerDoneAttack);
    console.log("ATTACK ARRAY:", this.state.attackArray);
    console.log("DEFENSE ARRAY:", this.state.defenseArray);
    console.log("PLAYAREA ARRAY:", this.state.playAreaArray);
    console.log("PLAYER CLICKED CARD:", this.props.playerClickCard);
    // // console.log("new attack cards:", this.state.newAttackCards);
    console.log("WHO STARTS:", this.props.whoStartsGame);
    return (
      <PlayAreaDiv>
        <EndOfGame
          playerLost={this.state.endOfGamePlayerLost}
          playerWon={this.state.endOfGamePlayerWon}
        />
        <br></br>
        {this.renderAttackContainer()}
        <br></br>
        <DefenseContainer
          defenseArray={this.state.defenseArray}
          compDefends={this.state.compDefends}
          playerAttacks={this.state.playerAttacks}
          playerDefends={this.state.playerDefends}
          compAttacks={this.state.compAttacks}
        />
      </PlayAreaDiv>
    );
  }
}

export default PlayAreaContainer;
