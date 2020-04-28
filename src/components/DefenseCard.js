import React from "react";
import { Card, Image } from "../styled";

const DefenseCard = (props) => {
  return (
    <div>
      <Card>
        <Image src={props.card.imageUrl} />
      </Card>
    </div>
  );
};

export default DefenseCard;
