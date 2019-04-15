import React from "react";

const container = {
  width: "auto",
  borderRadius: "4px",
  backgroundColor: "white",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, .5)"
};

const images = {
  width: "auto",
  height: "auto",
  borderRadius: "4px 4px 0px 0px"
};

const titles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const Card = props => {
  return (
    <div style={container}>
      <img alt="fuck source" src={props.image} style={images} />
      <section style={titles}>
        <h2 className="nameTitle">{props.name}</h2>
        <h1 className="sentimentSad">{props.sentiment}</h1>
      </section>
    </div>
  );
};

export default Card;
