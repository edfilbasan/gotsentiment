import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import Header from "./components/Header.js";
import moment from "moment";
import { firebase_config } from "./utils/apiKey.js";
import { tachyons } from "tachyons";
import Reward from "react-rewards";
import Firebase from "firebase";

// Initialize Firebase
Firebase.initializeApp(firebase_config);

class GotSentiment extends Component {
  state = {
    jon: {},
    cersei: {},
    daenerys: {},
    arya: {},
    sansa: {},
    bran: {},
    tyrion: {},
    jaime: {},
    donald: {},
    lastUpdate: ""
  };

  componentWillMount() {
    this.getData();
    //setInterval(this.getData.bind(this), 10000);
  }

  getData() {
    const charRef = Firebase.database().ref("/characters");
    charRef.on("value", snapshot => {
      // console.log(snapshot.val());
      const dataObj = snapshot.val();
      dataObj.lastUpdate = moment(new Date()).format("MM/DD/YYYY h:mm:ss a");
      this.setState(dataObj, () => {
        console.log(this.state);
      });
      //LEFT OFF HERE
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Reward
          ref={ref => {
            this.reward = ref;
          }}
          type="emoji"
          config={{ emoji: ["😢"], springAnimation: false, elementCount: 10 }}
        >
          <button
            style={{ backgroundColor: "red", width: "50%", height: "100px" }}
            onClick={() => this.reward.rewardMe()}
          >
            CLICK ME
          </button>
        </Reward>
        <CardList data={this.state} />
      </div>
    );
  }
}

export default GotSentiment;
