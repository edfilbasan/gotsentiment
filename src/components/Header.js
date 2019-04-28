import React from "react";

const container = {
  width: "100%",
  height: "92px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FBFBFB",
  boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.15)",
  position: "static",
  margin: "0px 0px"
};

const headerText = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  margin: "auto 0px",
  marginLeft: "8px",
  marginRight: "16px",
  height: "100%",
  clear: "both",
  cursor: "pointer"
};

const headerTitle = {
  margin: "0px 0px"
};

const headerSub = {
  fontFamily: "Trajan Pro",
  textAlign: "left",
  fontWeight: "400",
  fontSize: "14px",
  color: "#272320",
  margin: "4px 0px 0px 0px"
};

// const nav = {
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "space-between",
//   marginRight: "5%"
// };

// const navText = {
//   margin: "0px 10px",
//   fontFamily: "Trajan Pro",
//   fontSize: "20px",
//   color: "#272320",
//   textAlign: "center"
// };

const Header = () => {
  return (
    <div style={container}>
      <img
        alt="ravenlogo"
        src="./ravenlogo.png"
        style={{
          width: "64px",
          height: "64px",
          margin: "auto 0px",
          marginLeft: "16px",
          cursor: "pointer"
        }}
        onClick={() => window.location.reload()}
      />
      <div style={headerText} onClick={() => window.location.reload()}>
        <h3 style={headerTitle}>Game of Thrones</h3>
        <p style={headerSub}>
          How Twitter Feels About GOT Characters in Real Time
        </p>
      </div>
    </div>
  );
};

export default Header;
