import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import moment from "moment";

class GotSentiment extends Component {
  state = {
    jon: "NEUTRAL",
    cersei: "NEUTRAL",
    daenerys: "NEUTRAL",
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
        <div className="header">
          <h1> Game of Thrones </h1> <h2> S8E1 Twitter Feels Chart </h2>{" "}
        </div>{" "}
        <CardList data={this.state} />{" "}
      </div>
    );
  }
}

export default GotSentiment;

//TO DO WILL ADD A SEARCH BOX SO PEOPLE CAN FIND THEIR CHARACTERS
// -----
// onSearchChange = event => {
//   this.setState({
//     searchField: event.target.value
//   });
// };
