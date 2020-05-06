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
      defender: "",
      compWasAttacking: null,
      playerWasAttacking: null,
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
      playerIsDoneButton: false,
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
        pile.push(trumpCard);
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
    const playerTrumpSuitArray = this.state.playerCards;
    const playerResult = playerTrumpSuitArray.filter(
      (card) => card.suit === this.state.trumpCard.suit
    );
    playerResult.sort((a, b) => {
      return this.state.cardValue[a.value] > this.state.cardValue[b.value]
        ? 1
        : -1;
    });
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
      whoStartsG = "computer";
    }
    this.setState({ whoStarts: whoStartsG });
  };

  drawAtEndOfTurn = (didDefenderTake, attacker) => {
    if (didDefenderTake === false) {
      if (attacker === "computer") {
        let attackerHand = this.state.lengthCompHand;
        let defenderHand = this.state.lengthPlayerHand;
        this.bothDraw(attackerHand, defenderHand, attacker);
      } else {
        let attackerHand = this.state.lengthPlayerHand;
        let defenderHand = this.state.lengthCompHand;
        this.bothDraw(attackerHand, defenderHand, attacker);
      }
    } else {
      if (attacker === "computer") {
        let attackerHand = this.state.lengthCompHand;
        let defenderHand = this.state.lengthPlayerHand;
        this.onlyOneDraws(attackerHand, defenderHand, attacker);
      } else {
        let attackerHand = this.state.lengthPlayerHand;
        let defenderHand = this.state.lengthCompHand;
        this.onlyOneDraws(attackerHand, defenderHand, attacker);
      }
    }
  };

  bothDraw = (attackerHand, defenderHand, attacker) => {
    if (attackerHand < 6) {
      if (defenderHand < 6) {
        let numCardsNeededPrevAttacker = 6 - attackerHand;
        let numCardsNeededPrevDefender = 6 - defenderHand;
        if (
          numCardsNeededPrevAttacker + numCardsNeededPrevDefender >
          this.state.pile.length
        ) {
          let prevAttackerCards = this.state.pile.slice(
            0,
            numCardsNeededPrevAttacker
          );
          let prevDefenderCards = this.state.pile.slice(
            numCardsNeededPrevAttacker
          );
          if (attacker === "computer") {
            this.bothTakePileShortCompAttacker(
              prevAttackerCards,
              prevDefenderCards
            );
          } else {
            this.bothTakePileShortPlayerAttacker(
              prevAttackerCards,
              prevDefenderCards
            );
          }
        } else {
          let prevAttackerCards = this.state.pile.slice(
            0,
            numCardsNeededPrevAttacker
          );
          let prevDefenderCards = this.state.pile.slice(
            numCardsNeededPrevAttacker,
            numCardsNeededPrevAttacker + numCardsNeededPrevDefender
          );
          let pile = this.state.pile.slice(
            numCardsNeededPrevAttacker + numCardsNeededPrevDefender
          );
          if (attacker === "computer") {
            this.bothTakePileLongCompAttacker(
              prevAttackerCards,
              prevDefenderCards,
              pile
            );
          } else {
            this.bothTakePileLongPlayerAttacker(
              prevAttackerCards,
              prevDefenderCards,
              pile
            );
          }
        }
      } else {
        this.onlyOneDraws(attackerHand, defenderHand, attacker);
      }
    } else {
      this.onlyOneDraws(attackerHand, defenderHand, attacker);
    }
  };

  bothTakePileShortCompAttacker = (prevAttackerCards, prevDefenderCards) => {
    this.setState({
      compCards: [...this.state.sendCompArray, ...prevAttackerCards],
      playerCards: [...this.state.sendPlayerArray, ...prevDefenderCards],
      pile: [],
    });
  };

  bothTakePileShortPlayerAttacker = (prevAttackerCards, prevDefenderCards) => {
    this.setState({
      playerCards: [...this.state.sendPlayerArray, ...prevAttackerCards],
      compCards: [...this.state.sendCompArray, ...prevDefenderCards],
      pile: [],
    });
  };

  bothTakePileLongCompAttacker = (
    prevAttackerCards,
    prevDefenderCards,
    pile
  ) => {
    this.setState({
      compCards: [...this.state.sendCompArray, ...prevAttackerCards],
      playerCards: [...this.state.sendPlayerArray, ...prevDefenderCards],
      pile: pile,
    });
  };

  bothTakePileLongPlayerAttacker = (
    prevAttackerCards,
    prevDefenderCards,
    pile
  ) => {
    this.setState({
      playerCards: [...this.state.sendPlayerArray, ...prevAttackerCards],
      compCards: [...this.state.sendCompArray, ...prevDefenderCards],
      pile: pile,
    });
  };

  oneTakesPileLongCompReceiver = (receiverCards, pile) => {
    this.setState({
      compCards: [...this.state.sendCompArray, ...receiverCards],
      pile: pile,
    });
  };

  oneTakesPileLongPlayerReceiver = (receiverCards, pile) => {
    this.setState({
      playerCards: [...this.state.sendPlayerArray, ...receiverCards],
      pile: pile,
    });
  };

  oneTakesPileShortCompReceiver = (receiverCards) => {
    this.setState({
      compCards: [...this.state.sendCompArray, ...receiverCards],
      pile: [],
    });
  };

  oneTakesPileShortPlayerReceiver = (receiverCards) => {
    this.setState({
      playerCards: [...this.state.sendPlayerArray, ...receiverCards],
      pile: [],
    });
  };

  onlyOneDraws = (attackerHand, defenderHand, attacker) => {
    if (attackerHand < 6) {
      let numCardsNeededPrevAttacker = 6 - attackerHand;
      if (numCardsNeededPrevAttacker <= this.state.pile.length) {
        let receiverCards = this.state.pile.slice(
          0,
          numCardsNeededPrevAttacker
        );
        let pile = this.state.pile.slice(numCardsNeededPrevAttacker);
        if (attacker === "computer") {
          this.oneTakesPileLongCompReceiver(receiverCards, pile);
        } else {
          this.oneTakesPileLongPlayerReceiver(receiverCards, pile);
        }
      } else {
        let receiverCards = this.state.pile.slice(0);
        if (attacker === "computer") {
          this.oneTakesPileShortCompReceiver(receiverCards);
        } else {
          this.oneTakesPileShortPlayerReceiver(receiverCards);
        }
      }
    } else {
      if (defenderHand < 6) {
        let numCardsNeededPrevDefender = 6 - defenderHand;
        if (numCardsNeededPrevDefender <= this.state.pile.length) {
          let receiverCards = this.state.pile.slice(
            0,
            numCardsNeededPrevDefender
          );
          let pile = this.state.pile.slice(numCardsNeededPrevDefender);
          if (attacker === "computer") {
            this.oneTakesPileLongPlayerReceiver(receiverCards, pile);
          } else {
            this.oneTakesPileLongCompReceiver(receiverCards, pile);
          }
        } else {
          let receiverCards = this.state.pile.slice(0);
          if (attacker === "computer") {
            this.oneTakesPileShortPlayerReceiver(receiverCards);
          } else {
            this.oneTakesPileShortCompReceiver(receiverCards);
          }
        }
      }
    }
  };

  /*
   * (when comp had been attacking before)
   * if compDoneAttack && endTrue then playerAttack true
   */

  defender = (name) => {
    this.setState({ defender: name, compNextAttackCard: null });
  };

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
    this.setState({
      compNextAttackCard: card,
      didPlayerTake: false,
      playerWasAttacking: false,
    });
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

  handleDoneButton = (boolean, result) => {
    this.setState({ playerIsDoneButton: boolean, compNextAttackCard: result });
  };

  compWasAttacking = (boolean) => {
    this.setState({ compWasAttacking: boolean });
  };

  playerWasAttacking = (boolean) => {
    this.setState({ playerWasAttacking: boolean });
  };

  didPlayerTake = (boolean) => {
    this.setState({ didPlayerTake: boolean });
  };

  render() {
    // console.log("DEFENDER:", this.state.defender);
    console.log("PLAYER IS DONE ATTACKING:", this.state.playerIsDoneButton);
    // console.log("SHIFT PLAYER CARD", this.state.shiftPlayerCard);
    // console.log("COMP WAS ATTACKING?:", this.state.compWasAttacking);
    // console.log("PLAYER WAS ATTACKING?:", this.state.playerWasAttacking);
    // console.log("DID PLAYER TAKE?:", this.state.didPlayerTake);
    // console.log("sendCompArray", this.state.sendCompArray);
    // console.log("sendPlayAreaArray", this.state.sendPlayAreaArray);
    console.log("PILE:", this.state.pile.length);
    // console.log("compCards:", this.state.compCards);
    // console.log("playerCards:", this.state.playerCards);
    // console.log("LENGTH COMP HAND:", this.state.lengthCompHand);
    console.log("LENGTH PLAYER HAND:", this.state.lengthPlayerHand);
    // console.log("compFirstAttackCard:", this.state.compFirstAttackCard);
    // console.log("compNextAttackCard:", this.state.compNextAttackCard);
    console.log("PLAYER WANTS TO TAKE?", this.state.playerWantsToTake);
    // console.log("trump card:", this.state.trumpCard.suit);
    // console.log("playerclickcard:", this.state.playerClickCard);
    // console.log("WHO STARTS?:", this.state.whoStarts);
    return (
      <div>
        {/* <div> GameContainer </div> */}
        {/* <CompAvatar /> */}
        <CompCardsContainer
          defender={this.state.defender}
          compCards={this.state.compCards}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          compFirstAttackCard={this.compFirstAttackCard}
          compNextAttackCard={this.compNextAttackCard}
          whoStartsGame={this.state.whoStarts}
          sendCompArray={this.sendCompArray}
          shiftCompCard={this.state.shiftCompCard}
          lengthCompHand={this.lengthCompHand}
          playerWasAttacking={this.state.playerWasAttacking}
          compWasAttacking={this.state.compWasAttacking}
          didPlayerTake={this.state.didPlayerTake}
          sendPlayAreaArray={this.state.sendPlayAreaArray}
        />
        <div></div>
        <Guidance />
        <PlayAreaContainer
          defender={this.defender}
          whoStartsGame={this.state.whoStarts}
          compFirstAttackCard={this.state.compFirstAttackCard}
          compNextAttackCard={this.state.compNextAttackCard}
          playerClickCard={this.state.playerClickCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.shiftPlayerCard}
          shiftCompCard={this.shiftCompCard}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          sendCompArray={this.state.sendCompArray}
          lengthPlayerHand={this.state.lengthPlayerHand}
          playerWantsToTake={this.state.playerWantsToTake}
          playerIsDoneButton={this.state.playerIsDoneButton}
          sendPlayAreaArray={this.sendPlayAreaArray}
          handleTakeButton={this.handleTakeButton}
          handleDoneButton={this.handleDoneButton}
          drawAtEndOfTurn={this.drawAtEndOfTurn}
          compWasAttacking={this.compWasAttacking}
          playerWasAttacking={this.playerWasAttacking}
          didPlayerTake={this.didPlayerTake}
          pile={this.state.pile.length}
        />
        <PileAreaContainer
          trumpCard={this.state.trumpCard}
          pile={this.state.pile}
          handleTakeButton={this.handleTakeButton}
          defender={this.state.defender}
          handleDoneButton={this.handleDoneButton}
        />
        <div></div>
        {/* <PlayerAvatar /> */}
        <PlayerCardsContainer
          defender={this.state.defender}
          playerCards={this.state.playerCards}
          cardValue={this.state.cardValue}
          trumpCard={this.state.trumpCard}
          handlePlayerClick={this.handlePlayerClick}
          shiftPlayerCard={this.state.shiftPlayerCard}
          sendPlayAreaArray={this.state.sendPlayAreaArray}
          lengthPlayerHand={this.lengthPlayerHand}
          sendPlayerArray={this.sendPlayerArray}
          // compWasAttacking={this.state.compWasAttacking}
        />
      </div>
    );
  }
}

export default GameContainer;

// drawAtEndOfTurn = (didDefenderTake, attacker) => {
//   if (didDefenderTake === false) {
//     if (attacker === "computer") {
//       let attackerHand = this.state.lengthCompHand;
//       let defenderHand = this.state.lengthPlayerHand;
//       if (attackerHand < 6) {
//         if (defenderHand < 6) {
//           let numCardsNeededPrevAttacker = 6 - attackerHand;
//           let numCardsNeededPrevDefender = 6 - defenderHand;
//           if (
//             numCardsNeededPrevAttacker + numCardsNeededPrevDefender >
//             this.state.pile.length
//           ) {
//             // split the pile and add to hands
//             // TODO: NOT WORRYING ABOUT ODD NUMS
//             // TODO: make sure we're splitting for attacker first
//             // TODO: currently assuming comp is attacker
//             let prevAttackerCards = this.state.pile.slice(
//               0,
//               numCardsNeededPrevAttacker
//             );
//             let prevDefenderCards = this.state.pile.slice(
//               numCardsNeededPrevAttacker
//             );
//             this.setState({
//               compCards: [...this.state.sendCompArray, ...prevAttackerCards],
//               playerCards: [
//                 ...this.state.sendPlayerArray,
//                 ...prevDefenderCards,
//               ],
//               pile: [],
//             });
//           } else {
//             // TODO: currently assuming comp is attacker
//             let prevAttackerCards = this.state.pile.slice(
//               0,
//               numCardsNeededPrevAttacker
//             );
//             let prevDefenderCards = this.state.pile.slice(
//               numCardsNeededPrevAttacker,
//               numCardsNeededPrevAttacker + numCardsNeededPrevDefender
//             );
//             this.setState({
//               compCards: [...this.state.sendCompArray, ...prevAttackerCards],
//               playerCards: [
//                 ...this.state.sendPlayerArray,
//                 ...prevDefenderCards,
//               ],
//               pile: this.state.pile.slice(
//                 numCardsNeededPrevAttacker + numCardsNeededPrevDefender
//               ),
//             });
//           }
//         } else {
//           this.onlyAttackerDraws();
//         }
//       }
//     }
//   } else {
//     this.onlyAttackerDraws();
//   }
// };

// onlyOne = (attacker) => {
//   if (attacker === "computer") {
//     let attackerHand = this.state.lengthCompHand;

//     if (attackerHand < 6) {
//       let numCardsNeededPrevAttacker = 6 - attackerHand;
//       if (numCardsNeededPrevAttacker <= this.state.pile.length) {
//         let prevAttackerCards = this.state.pile.slice(
//           0,
//           numCardsNeededPrevAttacker
//         );

//         this.setState({
//           compCards: [...this.state.sendCompArray, ...prevAttackerCards],
//           pile: this.state.pile.slice(numCardsNeededPrevAttacker),
//         });
//       } else {
//         let prevAttackerCards = this.state.pile.slice(0);

//         this.setState({
//           compCards: [...this.state.sendCompArray, ...prevAttackerCards],
//           pile: [],
//         });
//       }
//     } else {
//       let defenderHand = this.state.lengthPlayerHand;

//       if (defenderHand < 6) {
//         let numCardsNeededPrevDefender = 6 - defenderHand;
//         if (numCardsNeededPrevDefender <= this.state.pile.length) {
//           let prevDefenderCards = this.state.pile.slice(
//             0,
//             numCardsNeededPrevDefender
//           );
//           this.setState({
//             playerCards: [
//               ...this.state.sendPlayerArray,
//               ...prevDefenderCards,
//             ],
//             pile: this.state.pile.slice(numCardsNeededPrevDefender),
//           });
//         } else {
//           let prevDefenderCards = this.state.pile.slice(0);
//           this.setState({
//             playerCards: [
//               ...this.state.sendPlayerArray,
//               ...prevDefenderCards,
//             ],
//             pile: [],
//           });
//         }
//       }
//     }
//   } else {
//     let attackerHand = this.state.lengthPlayerHand;

//     if (attackerHand < 6) {
//       let numCardsNeededPrevAttacker = 6 - attackerHand;
//       if (numCardsNeededPrevAttacker <= this.state.pile.length) {
//         let prevAttackerCards = this.state.pile.slice(
//           0,
//           numCardsNeededPrevAttacker
//         );
//         this.setState({
//           playerCards: [...this.state.sendPlayerArray, ...prevAttackerCards],
//           pile: this.state.pile.slice(numCardsNeededPrevAttacker),
//         });
//       } else {
//         let prevAttackerCards = this.state.pile.slice(0);
//         this.setState({
//           playerCards: [...this.state.sendPlayerArray, ...prevAttackerCards],
//           pile: [],
//         });
//       }
//     } else {
//       let defenderHand = this.state.lengthCompHand;

//       if (defenderHand < 6) {
//         let numCardsNeededPrevDefender = 6 - defenderHand;
//         if (numCardsNeededPrevDefender <= this.state.pile.length) {
//           let prevDefenderCards = this.state.pile.slice(
//             0,
//             numCardsNeededPrevDefender
//           );
//           this.setState({
//             compCards: [...this.state.sendCompArray, ...prevDefenderCards],
//             pile: this.state.pile.slice(numCardsNeededPrevDefender),
//           });
//         } else {
//           let prevDefenderCards = this.state.pile.slice(0);
//           this.setState({
//             compCards: [...this.state.sendCompArray, ...prevDefenderCards],
//             pile: [],
//           });
//         }
//       }
//     }
//   }
// };

// onlyAttackerDraws = (attacker) => {
//   let numCardsNeededPrevAttacker = 6 - this.state.lengthPlayerHand;
// };
