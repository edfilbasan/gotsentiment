import React, { Component } from "react";

const container = {
  display: "flex",
  flexDirection: "column",
  width: "415px",
  height: "500px",
  borderRadius: "4px",
  backgroundColor: "white",
  margin: "1%",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, .5)"
};

const images = {
  objectFit: "cover",
  objectPosition: "50% 20%",
  width: "100%",
  height: "70%"
};

const titles = {
  height: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

class Card extends Component {
  sentiment = a => {
    switch (a) {
      case "HAPPY":
        return "sentimentHappy";
      case "NEUTRAL":
        return "sentimentNeutral";
      case "SAD":
        return "sentimentSad";
      default:
        return "sentimentNeutral";
    }
  };

  render() {
    return (
      <div style={container}>
        <img alt="GOT" src={this.props.image} style={images} />
        <div style={titles}>
          <h2 className="nameTitle">{this.props.name}</h2>
          <h1 className={this.sentiment(this.props.sentiment)}>
            {this.props.sentiment}
          </h1>
        </div>
      </div>
    );
  }
}

export default Card;
