import React from "react";
import Card from "./Card.js";

const displays = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: "1%",
  margin: "0px 20px"
};

let characters = {
  Jon: ["DATA", "./jonHappy.gif", "./jonNeutral.jpeg", "./jonSad.gif"],
  Daenerys: ["DATA", "./danyHappy.jpg", "./danyNeutral.jpg", "./danySad.png"],
  Cersei: ["DATA", "cerseiHappy.gif", "./cerseiNeutral.jpg", "./cerseiSad.jpg"]
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
