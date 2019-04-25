import React, { Component } from "react";
import Card from "./Card.js";

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

class CardList extends Component {
  // TODO: LOOK INTO getSnapshotBeforeUpdate!!!

  // componentDidMount() {
  //   this.setState({})
  // }

  render() {
    return (
      <div style={list}>
        {Object.keys(characters).map((key, i) => {
          return (
            <Card
              key={i}
              name={key}
              images={Object.values(characters)[i]}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;
