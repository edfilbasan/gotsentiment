import React from "react";
import Card from "./Card.js";
import { HAPPY_FLOOR, SAD_CEILING } from "../utils/constants";

const list = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // width: "100%",
  justifyContent: "center",
  margin: "2% 3%"
};

let characters = {
  Jon: ["./jonHappy.gif", "./jonNeutral.gif", "./jonSad.gif"],
  Daenerys: ["./danyHappy.gif", "./danyNeutral.gif", "./danySad.gif"],
  Cersei: ["./cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"],
  Arya: ["./aryaHappy.gif", "./aryaNeutral.gif", "./aryaSad.gif"],
  Sansa: ["./sansaHappy.gif", "./sansaNeutral.gif", "./sansaSad.gif"],
  Bran: ["./branHappy.gif", "./branNeutral.gif", "./branSad.gif"],
  Tyrion: ["./tyrionHappy.gif", "./tyrionNeutral.gif", "./tyrionSad.gif"],
  Jaime: ["./jaimeHappy.gif", "./jaimeNeutral.gif", "./jaimeSad.gif"]
  // Donald: ["./donaldHappy.gif", "./donaldNeutral.gif", "./donaldSad.gif"]
};

function getImageIdx(str) {
  switch (str) {
    case "HAPPY":
      return 0;
    case "NEUTRAL":
      return 1;
    case "SAD":
      return 2;
    default:
      return 2;
  }
}

function getCharData(char) {
  if (char.net == null) {
    return "NEUTRAL";
  }
  if (char.net > HAPPY_FLOOR) {
    return "HAPPY";
  } else if (char.net <= SAD_CEILING) {
    return "SAD";
  } else {
    return "NEUTRAL";
  }
}

const CardList = props => {
  return (
    <div style={list}>
      {Object.keys(characters).map((key, i) => {
        const charFeel = getCharData(props.data[key.toLowerCase()]);
        const charTotal = props.data[key.toLowerCase()]["total"];
        return (
          <Card
            key={i}
            name={key}
            sentiment={charFeel}
            image={Object.values(characters)[i][getImageIdx(charFeel)]}
            total={charTotal}
          />
        );
      })}
    </div>
  );
};

export default CardList;
