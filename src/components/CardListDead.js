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
  Jorah: ["./jorahHappy.gif", "./jorahNeutral.gif", "./jorahSad.gif"],
  Melisandre: [
    "./melisandreHappy.gif",
    "./melisandreNeutral.gif",
    "./melisandreSad.gif"
  ]
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
