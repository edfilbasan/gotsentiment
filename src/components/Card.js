import React, { Component } from "react";

const container = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "359px",
  height: "200px",
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.15)",
  margin: "20px 20px"
};

const imageContainer = {
  height: "184px",
  width: "184px",
  borderRadius: "50%",
  overflow: "hidden",
  position: "relative",
  margin: "4px 16px 4px 4px"
};

const images = {
  objectFit: "cover",
  objectPosition: "40% 50%",
  width: "100%",
  height: "100%"
};

const titles = {
  height: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start"
};

class Card extends Component {
  sentiment = feel => {
    switch (feel) {
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
      <div style={container} className="grow">
        <div style={imageContainer}>
          <img alt={this.props.image} src={this.props.image} style={images} />
        </div>
        <div style={titles}>
          <h3>{this.props.name}</h3>
          <h2 className={this.sentiment(this.props.sentiment)}>
            {this.props.sentiment}
          </h2>
          <h4>TWEETS: {this.props.total}</h4>
        </div>
      </div>
    );
  }
}

export default Card;
