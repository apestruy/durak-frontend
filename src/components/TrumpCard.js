import React from "react";
import { TCard, Image } from "../styled";

const TrumpCard = (props) => {
  return (
    <div>
      {props.pile[props.pile.length - 1] ? (
        <TCard>
          <Image src={props.trumpCard.imageUrl} alt="trump card" />
        </TCard>
      ) : null}
    </div>
  );
};

export default TrumpCard;
