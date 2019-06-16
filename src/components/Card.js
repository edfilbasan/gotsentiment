import React, { Component } from "react";
import Reward from "react-rewards";
import Firebase from "firebase";
import { HAPPY_FLOOR, SAD_CEILING } from "../utils/constants";
import Trend from "react-trend";

const container = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "359px",
  height: "200px",
  borderRadius: "8px",
  backgroundColor: "#FBFBFB",
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
  width: "175px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start"
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      negative: 0,
      net: 0,
      neutral: 0,
      positive: 0,
      total: 0,
      netArr: [],
      sentiment: "NEUTRAL",
      loaded: false
    };
  }

  pressF = e => {
    const keyCode = e.keyCode;
    if (keyCode === 70) {
      if (this.props.alive === false) {
        this.reward.rewardMe();
      }
    }
  };

  componentDidMount() {
    this.onDataChange(this.props.name.toLowerCase());
    document.addEventListener("keydown", this.pressF);
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      return this.setState({ loaded: true });
    }
  }

  onDataChange(name) {
    let newName = name;
    if (name === "grey worm") {
      newName = "greyworm";
    }
    if (name === "the hound") {
      newName = "thehound";
    }
    const charRef = Firebase.database().ref(
      "/characters/" + newName + "/data/"
    );
    charRef.on("value", snapshot => {
      let charVals = snapshot.val();
      if (charVals == null) {
        charVals = this.state;
      }
      charVals.sentiment = this.getCharData(charVals);
      const prevState = this.state.sentiment;
      this.setState(charVals, () => {
        // on callback, compare current sentiment to previous, "reward" if changed
        if (this.state.sentiment !== prevState) {
          if (this.state.loaded) {
            this.reward.rewardMe();
          }
        }
      });
    });

    const arrRef = Firebase.database().ref(
      "/characters/" + newName + "/netArr/"
    );
    arrRef.on("value", snapshot => {
      let netArr = snapshot.val();

      // to keep whole graph
      if (netArr == null) {
        netArr = this.state.netArr;
      }
      if (netArr.length > 0) {
        const lenDiff = netArr.length - this.state.netArr.length;
        if (lenDiff > 1) {
          this.setState({ ...this.state, netArr }, () => {});
        } else if (lenDiff === 1 || lenDiff === 0) {
          this.state.netArr.push(netArr[netArr.length - 1]);
          //ensure local copy matches length from python backend
          if (this.state.netArr.length > netArr.length) {
            this.state.netArr.shift();
          }
        }
      }
    });
  }

  getImageIdx(str) {
    switch (str) {
      case "POSITIVE":
        return 0;
      case "NEUTRAL":
        return 1;
      case "NEGATIVE":
        return 2;
      default:
        return 1;
    }
  }

  getCharData(char) {
    if (char == null || char.net == null) {
      return "NEUTRAL";
    }
    if (char != null) {
      if (char.net > HAPPY_FLOOR) {
        return "POSITIVE";
      } else if (char.net <= SAD_CEILING) {
        return "NEGATIVE";
      } else {
        return "NEUTRAL";
      }
    }
  }

  sentiment = feel => {
    switch (feel) {
      case "POSITIVE":
        return "sentimentHappy";
      case "NEUTRAL":
        return "sentimentNeutral";
      case "NEGATIVE":
        return "sentimentSad";
      default:
        return "sentimentNeutral";
    }
  };

  emoji = feel => {
    switch (feel) {
      case "POSITIVE":
        return ["😃", "💯", "🎉"];
      case "NEUTRAL":
        return ["😐", "😌", "🆗"];
      case "NEGATIVE":
        return ["😭", "😔", "😟"];
      default:
        return ["😐", "😌", "🆗"];
    }
  };

  render() {
    const sentimentImg = this.props.images[
      this.getImageIdx(this.state.sentiment)
    ];
    return (
      <div
        style={container}
        className="grow"
        onClick={() => this.reward.rewardMe()}
      >
        <div style={imageContainer}>
          <img alt={sentimentImg} src={sentimentImg} style={images} />
        </div>

        <div style={titles}>
          <h3>{this.props.name}</h3>
          <h2 className={this.sentiment(this.state.sentiment)}>
            {this.state.sentiment}
          </h2>

          <Reward
            ref={ref => {
              this.reward = ref;
            }}
            type="emoji"
            config={{
              emoji: this.props.alive
                ? this.emoji(this.state.sentiment)
                : ["🙏", "🙇", "⚰️️", "✊"],
              lifetime: 100,
              spread: 45,
              elementCount: 8,
              elementSize: 40,
              springAnimation: true
            }}
          />

          <h5>TWEETS</h5>
          <h4> {this.state.total}</h4>
          <div style={{ paddingTop: "8px", paddingRight: "20px" }}>
            <Trend
              smooth
              data={this.state.netArr}
              gradient={["#732727", "#407398", "#3A7737"]}
              radius={30}
              strokeWidth={6}
              strokeLinecap={"round"}
            />
            {/*Use these styles for whe nwe are live*/}}
            {/*<h6 style={{ marginTop: "12px" }}>Tweets from </h6>*/}
            {/*<h6 style={{ marginTop: "0px" }}>5/12 20:30 EDT - 5/13 4:00 EDT</h6>*/}
            {/*<h6>Past {this.state.netArr.length*30-30} Seconds</h6>*/}
            <h6 style={{ marginTop: "12px" }}>CURRENTLY OFFLINE</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
