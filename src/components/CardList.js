import React from "react";
import Card from "./Card.js";

const displays = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: "1%",
  margin: "0px 20px"
};

const characters = {
  Jon: ["somedata", "./jonHappy.gif"],
  Daenerys: ["somedata", "./danyHappy.jpg"],
  Cersei: ["somedata", "cerseiHappy.gif"]
};

const CardList = props => {
  return (
    <div style={displays}>
      {Object.keys(characters).map((key, i) => {
        return (
          <Card
            key={i}
            name={key}
            sentiment={Object.values(characters)[i][0]}
            image={Object.values(characters)[i][1]}
          />
        );
      })}
    </div>
  );
};

export default CardList;
