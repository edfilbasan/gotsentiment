import React, { Component } from "react";
import Reward from "react-rewards";
import Firebase from "firebase";
import { HAPPY_FLOOR, SAD_CEILING } from "../utils/constants";

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
  margin: "4px 8px 4px 4px"
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
  constructor(props){
    super(props);
    this.state = {  
      negative: 0,
      net: 0,
      neutral: 0,
      positive: 0,
      total: 0, 
      sentiment: 'NEUTRAL'
    };
  }

  componentDidMount() {
    this.onDataChange(this.props.name.toLowerCase());
  }

  onDataChange(name) {
    const charRef = Firebase.database().ref("/characters/"+name);
    charRef.on("value", snapshot => {
      const charVals = snapshot.val();
      charVals.sentiment = this.getCharData(charVals);
      // get current state sentiment to compare to updated sentiment
      const prevState = this.state.sentiment;
      this.setState(charVals, () =>{
        // on callback, compare current sentiment to previous, "reward" if changed
        if(this.state.sentiment !== prevState){
          this.reward.rewardMe();
        }
      })
    });
  }

  getImageIdx(str) {
    switch (str) {
      case "HAPPY":
        return 0;
      case "NEUTRAL":
        return 1;
      case "SAD":
        return 2;
      default:
        return 2;
    }
  }

  getCharData(char) {
    if (char.net == null) {
      return "NEUTRAL";
    }
    if (char.net > HAPPY_FLOOR) {
      return "HAPPY";
    } else if (char.net <= SAD_CEILING) {
      return "SAD";
    } else {
      return "NEUTRAL";
    }
  }


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
    const sentimentImg = this.props.images[this.getImageIdx(this.state.sentiment)];
    return (
      <div
        style={container}
        className="grow"
        onClick={() => this.reward.rewardMe()}
      >
        <div style={imageContainer}>
          <img alt={sentimentImg} src={sentimentImg} style={images} />
        </div>

        <Reward
          ref={ref => {
            this.reward = ref;
          }}
          type="emoji"
          config={{
            emoji: this.emoji(this.state.sentiment),
            lifetime: 200,
            spread: 40,
            elementCount: 20,
            elementSize: 32
          }}
        />
        <div style={titles}>
          <h3>{this.props.name}</h3>
          <h2 className={this.sentiment(this.state.sentiment)}>
            {this.state.sentiment}
          </h2>

          <h4>
            TWEETS <br />
            {this.state.total}
          </h4>
        </div>
      </div>
    );
  }
}

export default Card;
