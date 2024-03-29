import React from "react";

const container = {
  width: "100%",
  height: "56px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FBFBFB",
  boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.15)",
  position: "relative",
  bottom: "0",
  margin: "0px 0px"
};

const headerSub = {
  fontFamily: "Trajan Pro",
  textAlign: "center",
  fontWeight: "400",
  fontSize: "16px",
  color: "#272320",
  margin: "0px"
};

const Footer = () => {
  return (
    <div style={container}>
      <p style={headerSub}>
        Created by <a href="https://edfilbasan.github.io/work">Lord Edfil</a>{" "}
        &amp; <a href="https://github.com/Gnuck">King Nick </a>
      </p>
    </div>
  );
};

export default Footer;
