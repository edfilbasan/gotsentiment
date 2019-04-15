import React from "react";
import Card from "./Card.js";

const list = {
  display: "grid",
  justifyContent: "space-evenly",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "auto",
  columnGap: "20px",
  width: "95%"
};

let characters = {
  Jon: ["DATA", "./jonHappy.gif", "./jonNeutral.gif", "./jonSad.gif"],
  Daenerys: ["DATA", "./danyHappy.gif", "./danyNeutral.gif", "./danySad.gif"],
  Cersei: ["DATA", "cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"]
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
            image={Object.values(characters)[i][3]}
          />
        );
      })}
    </div>
  );
};

export default CardList;
