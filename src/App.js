import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import CardListDead from "./components/CardListDead.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { firebase_config } from "./utils/apiKey.js";
import { tachyons } from "tachyons";
import Firebase from "firebase";

Firebase.initializeApp(firebase_config);

class GotSentiment extends Component {
  render() {
    return (
      <div>
        <Header />
        <h3
          style={{ textAlign: "center", color: "#732727", marginTop: "20px" }}
        >
          STATUS: OFFLINE
        </h3>
        <CardList />
        <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
          PRESS F TO PAY RESPECTS
        </h1>
        <CardListDead />
        <Footer />
      </div>
    );
  }
  g;
}

export default GotSentiment;
