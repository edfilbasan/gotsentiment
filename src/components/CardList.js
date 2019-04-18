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
  Jon: ["./jonHappy.gif", "./jonNeutral.gif", "./jonSad.gif"],
  Daenerys: ["./danyHappy.gif", "./danyNeutral.gif", "./danySad.gif"],
  Cersei: ["cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"]
};

// WHATEVER FUNCTION YOU WRITE TO RECEIVE, SEND IT TO *SENTIMENT* IN THE CARD COMPONENT
function getImageIdx(str){
  switch(str){
    case 'HAPPY':
      return 0;
    case 'NEUTRAL':
      return 1;
    case 'SAD':
      return 2;
    default:
      return 2;
  }
}

const CardList = (props) => {
  return (
    <div style={list}>
      {Object.keys(characters).map((key, i) => {
        const charFeel = props.data[key.toLowerCase()];
        return (
          <Card
            key={i}
            name={key}
            sentiment={charFeel}
            image={Object.values(characters)[i][getImageIdx(charFeel)]}
          />
        );
      })}
    </div>
  );
};

export default CardList;
