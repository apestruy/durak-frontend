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
      CompTrumpSuitArray: [],
      compAttackCard: null,
      playerClickCard: null,
      shiftPlayerCard: null,
      shiftCompCard: null,
      sendCompArray: null,
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
    const CompTrumpSuitArray = this.state.compCards;
    const compResult = CompTrumpSuitArray.filter(
      (card) => card.suit === this.state.trumpCard.suit
    );
    compResult.sort((a, b) => {
      return this.state.cardValue[a.value] > this.state.cardValue[b.value]
        ? 1
        : -1;
    });
    // console.log("compTrumpResult", compResult);
    const PlayerTrumpSuitArray = this.state.playerCards;
    const playerResult = PlayerTrumpSuitArray.filter(
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
    this.setState({ whoStarts: whoStartsG }, () => this.gameBegins());
  };

  gameBegins = () => {
    console.log("who starts:", this.state.whoStarts);
    // if (this.state.whoStarts === "computer") {

    // }
  };

  compAttackFirst = (card) => {
    // console.log("compAttackCard:", card);
    this.setState({ compAttackCard: card });
  };

  handlePlayerClick = (card) => {
    // console.log(card);
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

  render() {
    console.log("sendCompArray", this.state.sendCompArray);
    // console.log("compAttackCard:", this.state.compAttackCard);
    // console.log("comp cards:", this.state.compCards);
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
          compAttack={this.compAttackFirst}
          whoStartsGame={this.state.whoStarts}
          sendCompArray={this.sendCompArray}
          shiftCompCard={this.state.shiftCompCard}
        />
        <div></div>
        <Guidance />
        <PlayAreaContainer
          compAttackCard={this.state.compAttackCard}
          playerClickCard={this.state.playerClickCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.shiftPlayerCard}
          shiftCompCard={this.shiftCompCard}
          compAttackFirst={this.compAttackFirst}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          sendCompArray={this.state.sendCompArray}
        />
        <PileAreaContainer
          trumpCard={this.state.trumpCard}
          pile={this.state.pile}
        />
        <div></div>
        <PlayerAvatar />
        <PlayerCardsContainer
          playerCards={this.state.playerCards}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.state.shiftPlayerCard}
        />
      </div>
    );
  }
}

export default GameContainer;
