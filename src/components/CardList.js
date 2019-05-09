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
  Cersei: ["./cerseiHappy.gif", "./cerseiNeutral.gif", "./cerseiSad.gif"],
  Arya: ["./aryaHappy.gif", "./aryaNeutral.gif", "./aryaSad.gif"],
  Sansa: ["./sansaHappy.gif", "./sansaNeutral.gif", "./sansaSad.gif"],
  Bran: ["./branHappy.gif", "./branNeutral.gif", "./branSad.gif"],
  Tyrion: ["./tyrionHappy.gif", "./tyrionNeutral.gif", "./tyrionSad.gif"],
  Jaime: ["./jaimeHappy.gif", "./jaimeNeutral.gif", "./jaimeSad.gif"],
  Tormund: ["./tormundHappy.gif", "./tormundNeutral.gif", "./tormundSad.gif"],
  Theon: ["./theonHappy.gif", "./theonNeutral.gif", "./theonSad.gif"],
  Brienne: ["./brienneHappy.gif", "./brienneNeutral.gif", "./brienneSad.gif"],
  Gendry: ["./gendryHappy.gif", "./gendryNeutral.gif", "./gendrySad.gif"],
  "Grey Worm": ["./grey.gif", "./grey.gif", "./grey.gif"],
  "The Hound": ["./houndHappy.gif", "./houndNeutral.gif", "./houndSad.gif"],
  Jorah: ["./jorahHappy.gif", "./jorahNeutral.gif", "./jorahSad.gif"],
  Davos: ["./davosHappy.gif", "./davosNeutral.gif", "./davosSad.gif"],
  Podrick: ["./podrickHappy.gif", "./podrickNeutral.gif", "./podrickSad.gif"],
  Bronn: ["./bronnHappy.gif", "./bronnNeutral.gif", "./bronnSad.gif"],
  Melisandre: [
    "./melisandreHappy.gif",
    "./melisandreNeutral.gif",
    "./melisandreSad.gif"
  ]
  // Donald: ["./donaldHappy.gif", "./donaldNeutral.gif", "./donaldSad.gif"]
};

let orderedCharacters = Object.keys(characters);

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Thrones: 0,
      Jon: 0,
      Daenerys: 0,
      Cersei: 0,
      Arya: 0,
      Sansa: 0,
      Bran: 0,
      Tyrion: 0,
      Jaime: 0,
      Tormund: 0,
      Theon: 0,
      Brienne: 0,
      Gendry: 0,
      "Grey Worm": 0,
      "The Hound": 0,
      Jorah: 0,
      Davos: 0,
      Podrick: 0,
      Bronn: 0,
      Melisandre: 0,
      order: Object.keys(characters)
    };

    this.orderHandler = this.orderHandler.bind(this);
  }

  orderHandler(name, total) {
    console.log(this.state);
    this.setState({ [name]: total }, () => {
      let sorted = Object.keys(this.state);
      let x = sorted.sort((a, b) => this.state[b] - this.state[a]);
      console.log(sorted);
      //this.setState({order: x})
    //   orderedCharacters = sorted;
    //   console.log(orderedCharacters);
    //   console.log(name);
    //   console.log(total);
    //   console.log(this.state);
    });
  }

  render() {
    console.log(orderedCharacters);
    return (
      <div style={list}>
        {this.state.order.map((key, i) => {
          if(key ==='order')
            return;
          console.log('render');
          console.log(this.state.order);
          console.log(key);
          return (
            <Card
              orderHandler={this.orderHandler}
              key={i}
              name={key}
              images={characters[key]}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;

// {Object.keys(characters).map((key, i) => {
//           return (
//             <Card
//               orderHandler={this.orderHandler}
//               key={i}
//               name={key}
//               images={Object.values(characters)[i]}
//             />
//           );
//         })}
