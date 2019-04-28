import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { firebase_config } from "./utils/apiKey.js";
import { tachyons } from "tachyons";
import Firebase from "firebase";

// Initialize Firebase
Firebase.initializeApp(firebase_config);

class GotSentiment extends Component {
  render() {
    return (
      <div>
        <Header />
        <CardList />
        <Footer />
      </div>
    );
  }
}

export default GotSentiment;
