import React from "react";
import { GuidDiv, GuidPoints } from "../styled";

const Guidance = (props) => {
  return (
    <strong>
      <GuidDiv>
        <GuidPoints>
          ◦ Get rid of all your cards when the pile runs out to win the game
        </GuidPoints>
        <GuidPoints>
          ◦ The last player with cards in their hand is the durak or “fool”
        </GuidPoints>
        <GuidPoints>
          ◦ The trump card determines the trump suit for each game. Any card of
          this suit can beat any non-trump suit card. You want to hold onto
          these if you can!
        </GuidPoints>
        <GuidPoints>
          ◦ The 6 is the lowest card and Ace is the highest
        </GuidPoints>
        <GuidPoints>
          ◦ Players must have at least 6 cards at all times while there is still
          a pile. After each round, players must take from the pile until they
          have 6 cards again
        </GuidPoints>
        <GuidPoints>
          ◦ The player with the lowest trump card is the first attacker
        </GuidPoints>
        <GuidPoints>
          ◦ Attacker: Attack with any card (ideal to get rid of lowest non-trump
          cards first). You can attack with more cards if they are of the same
          value as the cards already played in the round
        </GuidPoints>
        <GuidPoints>
          ◦ Defender: Defend with a card of the same suit but higher value, or
          any trump card
        </GuidPoints>
        <GuidPoints>
          ◦ If the defender is successful (all attack cards in the round are
          beaten), they attack on the next round
        </GuidPoints>
        <GuidPoints>
          ◦ If the defender is unable to beat all the attack cards, they must
          pick up all the cards played that round, and a new round starts with
          the attacker attacking again
        </GuidPoints>
      </GuidDiv>
    </strong>
  );
};

export default Guidance;
