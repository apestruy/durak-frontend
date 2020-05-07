import React from "react";
import { Card, Image } from "../styled";

const CompCard = (props) => {
  return (
    <div>
      <Card>
        <Image src={props.card.imageBack} alt="computer card" />
        {/* <CompH5>
          {props.card.value}, {props.card.suit}
        </CompH5> */}
      </Card>
    </div>
  );
};

export default CompCard;
