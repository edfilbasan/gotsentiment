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
  Thrones: ["./thronesHappy.gif", "./thronesNeutral.gif", "./thronesSad.gif"],
  Jon: ["./jonHappy.gif", "./jonNeutral.gif", "./jonSad.gif"],
  Daenerys: ["./danyHappy.gif", "./danyNeutral.gif", "./danySad.gif"],
  Arya: ["./aryaHappy.gif", "./aryaNeutral.gif", "./aryaSad.gif"],
  Sansa: ["./sansaHappy.gif", "./sansaNeutral.gif", "./sansaSad.gif"],
  Bran: ["./branHappy.gif", "./branNeutral.gif", "./branSad.gif"],
  Tyrion: ["./tyrionHappy.gif", "./tyrionNeutral.gif", "./tyrionSad.gif"],
  Brienne: ["./brienneHappy.gif", "./brienneNeutral.gif", "./brienneSad.gif"],
  Gendry: ["./gendryHappy.gif", "./gendryNeutral.gif", "./gendrySad.gif"],
  "Grey Worm": ["./grey.gif", "./grey.gif", "./grey.gif"],
  Tormund: ["./tormundHappy.gif", "./tormundNeutral.gif", "./tormundSad.gif"],
  Davos: ["./davosHappy.gif", "./davosNeutral.gif", "./davosSad.gif"],
  Podrick: ["./podrickHappy.gif", "./podrickNeutral.gif", "./podrickSad.gif"],
  Bronn: ["./bronnHappy.gif", "./bronnNeutral.gif", "./bronnSad.gif"]
};

class CardList extends Component {
  render() {
    return (
      <div style={list}>
        {Object.keys(characters).map((key, i) => {
          return (
            <Card
              key={i}
              name={key}
              images={Object.values(characters)[i]}
              alive={true}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;
