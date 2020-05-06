import React from "react";
import { Link } from "react-router-dom";
import {
  EndOfGameLoserDiv,
  EndOfGameWinnerDiv,
  RestartButton,
} from "../styled";

class EndOfGame extends React.Component {
  refreshPage = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        {this.props.playerLost ? (
          <EndOfGameLoserDiv>
            <strong>🤪 You lost! You are the Durak 🤪</strong>
            <br></br>
            <Link to="/game">
              <RestartButton onClick={this.refreshPage}>
                <strong>Restart Game?</strong>
              </RestartButton>
            </Link>
          </EndOfGameLoserDiv>
        ) : null}

        {this.props.playerWon ? (
          <EndOfGameWinnerDiv>
            <strong>🥳 You Won! You are NOT the Durak 🤩</strong>
            <br></br>
            <Link to="/game">
              <RestartButton onClick={this.refreshPage}>
                <strong>Restart Game?</strong>
              </RestartButton>
            </Link>
          </EndOfGameWinnerDiv>
        ) : null}
      </div>
    );
  }
}

export default EndOfGame;
