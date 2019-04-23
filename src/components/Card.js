import React, { Component } from "react";
import Reward from "react-rewards";

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

  emoji = feel => {
    switch (feel) {
      case "HAPPY":
        return ["😃", "💯", "🎉"];
      case "NEUTRAL":
        return ["😐", "😌", "🆗"];
      case "SAD":
        return ["😭", "😔", "😟"];
      default:
        return ["😐", "😌", "🆗"];
    }
  };

  render() {
    return (
      <div
        style={container}
        className="grow"
        onClick={() => this.reward.rewardMe()}
      >
        <div style={imageContainer}>
          <img alt={this.props.image} src={this.props.image} style={images} />
        </div>

        <Reward
          ref={ref => {
            this.reward = ref;
          }}
          type="emoji"
          config={{
            emoji: this.emoji(this.props.sentiment),
            lifetime: 200,
            spread: 40,
            springAnimation: false,
            elementCount: 20,
            elementSize: 32
          }}
        />

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
