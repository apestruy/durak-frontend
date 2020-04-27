import React from "react";
import { Card, Image } from "../styled";

const PlayerCard = (props) => {
  return (
    <div>
      <Card>
        <Image src={props.card.imageUrl} alt="player card" />
        {/* <PlayerH5>
          {props.card.value}, {props.card.suit}
        </PlayerH5> */}
      </Card>
    </div>
  );
};

export default PlayerCard;
