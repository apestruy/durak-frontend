import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainContainer from "./containers/MainContainer";
import Login from "./components/Login";
import ThemeContainer from "./containers/ThemeContainer";
import GameContainer from "./containers/GameContainer";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="App">
      <div>App</div>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/themes" component={ThemeContainer} />
        <Route path="/game" component={GameContainer} />
        <Route path="/stats" component={Stats} />
        <MainContainer />
      </Switch>
    </div>
  );
}

export default App;
