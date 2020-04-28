import React from "react";
import { Card, Image } from "../styled";

const AttackCard = (props) => {
  return (
    <div>
      <Card>
        <Image src={props.card.imageUrl} alt="attack card" />{" "}
      </Card>
    </div>
  );
};

export default AttackCard;
