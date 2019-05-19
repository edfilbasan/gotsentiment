import React, { Component } from "react";
import "./App.css";
import CardList from "./components/CardList.js";
import CardListDead from "./components/CardListDead.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { firebase_config } from "./utils/apiKey.js";
import { tachyons } from "tachyons";
import Firebase from "firebase";
import ReactGA from 'react-ga';

function initializeReactGA() {
  ReactGA.initialize('UA-140459085-1');
}
initializeReactGA();

Firebase.initializeApp(firebase_config);

class GotSentiment extends Component {
  render() {
    return (
      <div>
        <Header />
        <CardList />
        <h1 style={{ textAlign: "center", marginBottom: "0px" }}>
          💀 PRESS{" "}
          <span
            style={{
              fontWeight: "1000",
              color: "#407398"
            }}
          >
            F
          </span>{" "}
          TO PAY RESPECTS 💀
        </h1>
        <CardListDead />
        <Footer />
      </div>
    );
  }
  g;
}

export default GotSentiment;

// ONLINE STATUS TEXT. ADD WHENVER.
// <h3
// style={{ textAlign: "center", color: "#732727", marginTop: "20px" }}
// >

// </h3>
