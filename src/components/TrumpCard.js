import React from "react";
import { TCard, Image } from "../styled";

const TrumpCard = (props) => {
  return (
    <div>
      <TCard>
        <Image src={props.trumpCard.imageUrl} alt="trump card" />
        {/* <TrumpH5>
          {props.trumpCard.value}, {props.trumpCard.suit}
        </TrumpH5> */}
      </TCard>
    </div>
  );
};

export default TrumpCard;
