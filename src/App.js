import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";

class GotSentiment extends Component {
  componentWillMount(){
    this.getData();
    setInterval(this.getData, 10000);
  }

  async getData() {
    try{
      const res = await fetch('http://18.188.184.54/sampleurl', {
        method: 'GET',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      console.log(res.body);
      res.text().then(data=>console.log(data));

    } catch (e) {
      console.log(e);
    }
  }

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
