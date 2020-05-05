import React from "react";
import { Link } from "react-router-dom";
import { AppNameH1, NavButton, AppNameDiv } from "../styled";

const NavBar = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <AppNameDiv>
        <AppNameH1>Durak</AppNameH1>
        <strong>The Russian Card Game</strong>
      </AppNameDiv>
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/themes">Themes</Link> */}
      <Link to="/game">
        <NavButton>
          <strong>Start Game</strong>
        </NavButton>
      </Link>
      <Link to="stats">
        <NavButton>
          <strong>View Stats</strong>
        </NavButton>
      </Link>
    </div>
  );
};

export default NavBar;
