import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import Header from "./components/Header.js";
import moment from "moment";

class GotSentiment extends Component {
  state = {
    jon: "NEUTRAL",
    cersei: "NEUTRAL",
    daenerys: "NEUTRAL",
    arya: "NEUTRAL",
    sansa: "NEUTRAL",
    bran: "NEUTRAL",
    tyrion: "NEUTRAL",
    jaime: "NEUTRAL",
    lastUpdate: ""
  };

  componentWillMount() {
    this.getData.bind(this);
    setInterval(this.getData.bind(this), 10000);
  }

  async getData() {
    try {
      const res = await fetch("http://18.188.184.54/sampleurl", {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      res.text().then(data => {
        const dataObj = JSON.parse(data);
        dataObj.lastUpdate = moment(new Date()).format("MM/DD/YYYY h:mm:ss a");
        this.setState(dataObj, () => {
          console.log(this.state);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <CardList data={this.state} />
      </div>
    );
  }
}

export default GotSentiment;

//TODO
// ADD A SEARCH BOX SO USERS CAN FIND CHARACTERS
// -----
// onSearchChange = event => {
//   this.setState({
//     searchField: event.target.value
//   });
// };
