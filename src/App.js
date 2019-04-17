import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";

class GotSentiment extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Game of Thrones</h1>
          <h2>S8E1 Twitter Feels Chart</h2>
        </div>
        <CardList />
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
