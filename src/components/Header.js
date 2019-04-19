import React from "react";

const container = {
  width: "100%",
  height: "80px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "white",
  boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.15)",
  position: "static",
  margin: "0px 0px"
};

const headerText = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "auto 5%",
  height: "100%"
};

const headerTitle = {
  margin: "0px 0px"
};

const headerSub = {
  fontFamily: "Trajan Pro",
  fontWeight: "400",
  fontSize: "16px",
  color: "#272320",
  margin: "4px 0px 0px 0px"
};

const nav = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginRight: "80px"
};

const navText = {
  margin: "0px 10px",
  fontFamily: "Trajan Pro",
  fontSize: "20px",
  color: "#272320",
  textAlign: "center"
};

const Header = props => {
  return (
    <div style={container}>
      <div style={headerText}>
        <h3 style={headerTitle}>Game of Thrones</h3>
        <p style={headerSub}>Twitter Feels Analysis</p>
      </div>

      <div style={nav}>
        <p style={navText}>Home</p>
        <p style={navText}>About</p>
      </div>
    </div>
  );
};

export default Header;

// <div className="header">
//           <h1> Game of Thrones </h1> <h2> S8E1 Twitter Feels Chart </h2>{" "}
//         </div>
