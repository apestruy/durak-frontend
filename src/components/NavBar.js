import React from "react";
import { Link } from "react-router-dom";
import { NavBarDiv } from "../styled";

const NavBar = (props) => {
  return (
    <NavBarDiv style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>AppName</div>
      <Link to="/login">Login</Link>
      <Link to="/themes">Themes</Link>
      <Link to="/game">Start Game</Link>
      <Link to="stats">Stats</Link>
    </NavBarDiv>
  );
};

export default NavBar;
