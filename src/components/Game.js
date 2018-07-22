import React, { Component } from "react";

import Pile from "./Pile";
import Deck from "./Deck";

import { tick } from "../store/actions";

class Game extends Component {
  componentDidMount() {
    const interval = setInterval(() => {
      const { dispatch } = this.props.store;

      dispatch(tick());
    }, 750);

    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const {
      active,
      dealing,
      pile,
      winner,
      playerOne,
      playerTwo,
    } = this.props.store.getState();

    if (active) {
      const win = winner === -1 ? null : <p>Player {winner} wins!</p>;
      return (
        <React.Fragment>
          <Deck deck={playerOne} />
          <Deck deck={playerTwo} />
          <Pile pile={pile} />
          {win}
        </React.Fragment>
      );
    } else if (dealing) {
      return <p>dealing</p>;
    } else {
      return <p>...</p>;
    }
  }
}

export default Game;
