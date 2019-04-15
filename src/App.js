import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";

class GotSentiment extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Game of Thrones</h1>
          <h2>S8E1 Sentiment Analysis</h2>
        </div>
        <CardList />
      </div>
    );
  }
}

export default GotSentiment;
