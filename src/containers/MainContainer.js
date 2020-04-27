import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import GameContainer from "./GameContainer";
import Stats from "../components/Stats";
import ThemeContainer from "./ThemeContainer";

const MainContainer = (props) => {
  return (
    <div>
      <div>MainContainer</div>
      <Login />
      <Signup />
      <GameContainer />
      <Stats />
      <ThemeContainer />
    </div>
  );
};

export default MainContainer;
