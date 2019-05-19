import React, { Component } from "react";
import Card from "./Card.js";

const list = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  margin: "12px 1%",
  marginBottom: "40px"
};

let characters = {
  Theon: ["./theonHappy.gif", "./theonNeutral.gif", "./theonSad.gif"],
  Cersei: ["./cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"],
  Jaime: ["./jaimeHappy.gif", "./jaimeNeutral.gif", "./jaimeSad.gif"],
  "The Hound": ["./houndHappy.gif", "./houndNeutral.gif", "./houndSad.gif"],
  Euron: ["./euronHappy.gif", "./euronNeutral.gif", "./euronSad.gif"],
  Jorah: ["./jorahHappy.gif", "./jorahNeutral.gif", "./jorahSad.gif"],
  Melisandre: [
    "./melisandreHappy.gif",
    "./melisandreNeutral.gif",
    "./melisandreSad.gif"
  ],
  Cersei: ["./cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"],
  Jaime: ["./jaimeHappy.gif", "./jaimeNeutral.gif", "./jaimeSad.gif"],
  Euron: ["./euronHappy.gif", "./euronNeutral.gif", "./euronSad.gif"],
  "The Hound": ["./houndHappy.gif", "./houndNeutral.gif", "./houndSad.gif"],
};

class CardListDead extends Component {
  render() {
    return (
      <div style={list}>
        {Object.keys(characters).map((key, i) => {
          return (
            <Card
              key={i}
              name={key}
              images={Object.values(characters)[i]}
              alive={false}
            />
          );
        })}
      </div>
    );
  }
}

export default CardListDead;
