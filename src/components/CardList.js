import React, { Component } from "react";
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

class CardList extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);

    this.state = {
      jonSenti: "",
      danenerysSenti: "",
      cerseiSenti: "",
      aryaSenti: "",
      sansaSenti: "",
      branSenti: "",
      tyrionSenti: "",
      jamieSenti: ""
    };
  }

  // TODO: LOOK INTO getSnapshotBeforeUpdate!!!

  // componentDidMount() {
  //   this.setState({})
  // }

  componentDidUpdate() {
    if (this.state.jonSenti !== this.getCharData(this.props.data["jon"])) {
      this.setState({
        jonSenti: this.getCharData(this.props.data["jon"]),
        animate: true
      });
    }
  }

  handler() {
    this.setState({
      animate: false
    });
  }

  getImageIdx(str) {
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

  getCharData(char) {
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

  render() {
    return (
      <div style={list}>
        {Object.keys(characters).map((key, i) => {
          const charFeel = this.getCharData(this.props.data[key.toLowerCase()]);
          const charTotal = this.props.data[key.toLowerCase()]["total"];
          return (
            <Card
              key={i}
              name={key}
              sentiment={charFeel}
              image={Object.values(characters)[i][this.getImageIdx(charFeel)]}
              total={charTotal}
              handler={this.handler}
              animate={this.state.animate}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;
