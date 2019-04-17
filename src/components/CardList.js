import React from "react";
import Card from "./Card.js";

const list = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "center"
};

let characters = {
  Jon: ["HAPPY", "./jonHappy.gif", "./jonNeutral.gif", "./jonSad.gif"],
  Daenerys: ["SAD", "./danyHappy.gif", "./danyNeutral.gif", "./danySad.gif"],
  Cersei: ["HAPPY", "cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"]
};

// function Sentiment({ data, state }) {
//   switch (state) {
//     case "HAPPY":
//       return <Info text={text} />;
//     case "NEUTRAL":
//       return <Warning text={text} />;
//     case "SAD":
//       return <Error text={text} />;
//     default:
//       return aasd;
//   }
// }

const CardList = () => {
  return (
    <div style={list}>
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
