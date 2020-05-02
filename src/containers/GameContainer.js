import React from "react";
import CompCardsContainer from "./CompCardsContainer";
import PlayerCardsContainer from "./PlayerCardsContainer";
import Guidance from "../components/Guidance";
import PlayAreaContainer from "./PlayAreaContainer";
import CompAvatar from "../components/CompAvatar";
import PileAreaContainer from "./PileAreaContainer";
import PlayerAvatar from "../components/PlayerAvatar";

class GameContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      shuffledCards: [],
      compCards: [],
      playerCards: [],
      trumpCard: {},
      pile: [],
      whoStarts: "",
      compWasAttacking: null,
      didPlayerTake: null,
      compFirstAttackCard: null,
      compNextAttackCard: null,
      playerClickCard: null,
      shiftPlayerCard: null,
      shiftCompCard: null,
      sendCompArray: null,
      sendPlayerArray: null,
      sendPlayAreaArray: null,
      playerWantsToTake: false,
      lengthCompHand: null,
      lengthPlayerHand: null,
      cardValue: {
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        JACK: 11,
        QUEEN: 12,
        KING: 13,
        ACE: 14,
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/cards")
      .then((resp) => resp.json())
      .then((cards) => {
        let shuffledCards = cards.sort(() => Math.random() - 0.5);
        let compCards = [];
        for (let i = 0; i < 6; i++) {
          compCards.push(shuffledCards[i]);
        }
        let playerCards = [];
        for (let i = 6; i < 12; i++) {
          playerCards.push(shuffledCards[i]);
        }
        let trumpCard = shuffledCards[12];
        let pile = [];
        for (let i = 13; i < shuffledCards.length; i++) {
          pile.push(shuffledCards[i]);
        }
        this.setState(
          {
            shuffledCards: shuffledCards,
            compCards: compCards,
            playerCards: playerCards,
            trumpCard: trumpCard,
            pile: pile,
          },
          () => this.whoStartsGame()
        );
      });
  }

  whoStartsGame = () => {
    const compTrumpSuitArray = this.state.compCards;
    const compResult = compTrumpSuitArray.filter(
      (card) => card.suit === this.state.trumpCard.suit
    );
    compResult.sort((a, b) => {
      return this.state.cardValue[a.value] > this.state.cardValue[b.value]
        ? 1
        : -1;
    });
    // console.log("compTrumpResult", compResult);
    const playerTrumpSuitArray = this.state.playerCards;
    const playerResult = playerTrumpSuitArray.filter(
      (card) => card.suit === this.state.trumpCard.suit
    );
    playerResult.sort((a, b) => {
      return this.state.cardValue[a.value] > this.state.cardValue[b.value]
        ? 1
        : -1;
    });
    // console.log("playerTrumpResult", playerResult);
    let whoStartsG = "";
    if (playerResult.length > 0) {
      if (compResult.length > 0) {
        if (
          this.state.cardValue[playerResult[0].value] <
          this.state.cardValue[compResult[0].value]
        ) {
          whoStartsG = "player";
        } else {
          whoStartsG = "computer";
        }
      } else {
        whoStartsG = "player";
      }
    } else {
      if (compResult.length > 0) {
        whoStartsG = "computer";
      } else {
        whoStartsG = "computer";
      }
    }
    this.setState({ whoStarts: whoStartsG }, () =>
      console.log("WHO STARTS:", this.state.whoStarts)
    );
  };

  drawAtEndOfTurn = (didDefenderTake, attacker) => {
    if (didDefenderTake === false) {
      if (attacker === "computer") {
        let attackerHand = this.state.lengthCompHand;
        let defenderHand = this.state.lengthPlayerHand;
        if (attackerHand < 6) {
          if (defenderHand < 6) {
            let numCardsNeededPrevAttacker = 6 - attackerHand;
            let numCardsNeededPrevDefender = 6 - defenderHand;
            if (
              numCardsNeededPrevAttacker + numCardsNeededPrevDefender >
              this.state.pile.length
            ) {
              // split the pile and add to hands
              // TODO: NOT WORRYING ABOUT ODD NUMS
              // TODO: make sure we're splitting for attacker first
              // TODO: currently assuming comp is attacker
              let prevAttackerCards = this.state.pile.slice(
                0,
                numCardsNeededPrevAttacker
              );
              let prevDefenderCards = this.state.pile.slice(
                numCardsNeededPrevAttacker
              );
              this.setState({
                compCards: [...this.state.sendCompArray, ...prevAttackerCards],
                playerCards: [
                  ...this.state.sendPlayerArray,
                  ...prevDefenderCards,
                ],
                pile: [],
              });
            } else {
              // TODO: currently assuming comp is attacker
              let prevAttackerCards = this.state.pile.slice(
                0,
                numCardsNeededPrevAttacker
              );
              let prevDefenderCards = this.state.pile.slice(
                numCardsNeededPrevAttacker,
                numCardsNeededPrevAttacker + numCardsNeededPrevDefender
              );
              this.setState({
                compCards: [...this.state.sendCompArray, ...prevAttackerCards],
                playerCards: [
                  ...this.state.sendPlayerArray,
                  ...prevDefenderCards,
                ],
                pile: this.state.pile.slice(
                  numCardsNeededPrevAttacker + numCardsNeededPrevDefender
                ),
              });
            }
          } else {
            this.onlyAttackerDraws();
          }
        }
      }
    } else {
      this.onlyAttackerDraws();
    }
  };

  onlyAttackerDraws = () => {
    let numCardsNeededPrevAttacker = 6 - this.state.lengthCompHand;
    if (numCardsNeededPrevAttacker <= this.state.pile.length) {
      let prevAttackerCards = this.state.pile.slice(
        0,
        numCardsNeededPrevAttacker
      );
      this.setState({
        compCards: [...this.state.sendCompArray, ...prevAttackerCards],
        pile: this.state.pile.slice(numCardsNeededPrevAttacker),
      });
    } else {
      let prevAttackerCards = this.state.pile.slice(0);
      this.setState({
        compCards: [...this.state.sendCompArray, ...prevAttackerCards],
        pile: [],
      });
    }
  };

  // getNextCompAttackCard = () => {
  //   console.log("sashaaaaaaaaaa");
  // };
  /*
   * (when comp had been attacking before)
   * if compDoneAttack && endTrue then playerAttack true
   */

  // clearStartGame = (result) => {
  //   this.setState({ whoStarts: result });
  // };
  lengthCompHand = (num) => {
    this.setState({ lengthCompHand: num });
  };

  lengthPlayerHand = (num) => {
    this.setState({ lengthPlayerHand: num });
  };

  compFirstAttackCard = (card) => {
    this.setState({ compFirstAttackCard: card });
  };

  compNextAttackCard = (card) => {
    this.setState({ compNextAttackCard: card, didPlayerTake: false });
  };

  handlePlayerClick = (card) => {
    this.setState({ playerClickCard: card });
  };

  shiftPlayerCard = (card) => {
    this.setState({ shiftPlayerCard: card });
  };

  shiftCompCard = (card) => {
    this.setState({ shiftCompCard: card });
  };

  sendCompArray = (array) => {
    this.setState({ sendCompArray: array });
  };

  sendPlayerArray = (array) => {
    this.setState({ sendPlayerArray: array });
  };

  sendPlayAreaArray = (array) => {
    this.setState({ sendPlayAreaArray: array });
  };

  handleTakeButton = (boolean, result) => {
    this.setState({ playerWantsToTake: boolean, compNextAttackCard: result });
  };

  compWasAttacking = (boolean) => {
    this.setState({ compWasAttacking: boolean });
  };

  didPlayerTake = (boolean) => {
    this.setState({ didPlayerTake: boolean });
  };

  render() {
    console.log("COMP WAS ATTACKING?:", this.state.compWasAttacking);
    console.log("DID PLAYER TAKE?:", this.state.didPlayerTake);
    console.log("WHO STARTS?:", this.state.whoStarts);
    console.log("sendCompArray", this.state.sendCompArray);
    // console.log("sendPlayAreaArray", this.state.sendPlayAreaArray);
    // console.log("PILE:", this.state.pile.length);
    // console.log("compCards:", this.state.compCards);
    // console.log("playerCards:", this.state.playerCards);
    // console.log("LENGTH COMP HAND:", this.state.lengthCompHand);
    // console.log("LENGTH PLAYER HAND:", this.state.lengthPlayerHand);
    console.log("compFirstAttackCard:", this.state.compFirstAttackCard);
    console.log("compNextAttackCard:", this.state.compNextAttackCard);
    // console.log("PLAYER WANTS TO TAKE?", this.state.playerWantsToTake);
    // console.log("trump card:", this.state.trumpCard.suit);
    // console.log("playerclickcard:", this.state.playerClickCard);
    return (
      <div>
        <div> GameContainer </div>
        <CompAvatar />
        <CompCardsContainer
          compCards={this.state.compCards}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          compFirstAttackCard={this.compFirstAttackCard}
          compNextAttackCard={this.compNextAttackCard}
          whoStartsGame={this.state.whoStarts}
          sendCompArray={this.sendCompArray}
          shiftCompCard={this.state.shiftCompCard}
          lengthCompHand={this.lengthCompHand}
          compWasAttacking={this.state.compWasAttacking}
          didPlayerTake={this.state.didPlayerTake}
        />
        <div></div>
        <Guidance />
        <PlayAreaContainer
          compFirstAttackCard={this.state.compFirstAttackCard}
          compNextAttackCard={this.state.compNextAttackCard}
          // compNextAttackCard={this.compNextAttackCard}
          // clearStartGame={this.clearStartGame}
          playerClickCard={this.state.playerClickCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.shiftPlayerCard}
          shiftCompCard={this.shiftCompCard}
          // compFirstAttackCard={this.compFirstAttackCard}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          sendCompArray={this.state.sendCompArray}
          playerWantsToTake={this.state.playerWantsToTake}
          sendPlayAreaArray={this.sendPlayAreaArray}
          handleTakeButton={this.handleTakeButton}
          drawAtEndOfTurn={this.drawAtEndOfTurn}
          compWasAttacking={this.compWasAttacking}
          didPlayerTake={this.didPlayerTake}
          // getNextCompAttackCard={this.getNextCompAttackCard}
        />
        <PileAreaContainer
          trumpCard={this.state.trumpCard}
          pile={this.state.pile}
          handleTakeButton={this.handleTakeButton}
        />
        <div></div>
        <PlayerAvatar />
        <PlayerCardsContainer
          playerCards={this.state.playerCards}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.state.shiftPlayerCard}
          sendPlayAreaArray={this.state.sendPlayAreaArray}
          lengthPlayerHand={this.lengthPlayerHand}
          sendPlayerArray={this.sendPlayerArray}
        />
      </div>
    );
  }
}

export default GameContainer;
