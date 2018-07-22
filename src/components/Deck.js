import React, { Component } from "react";

class Deck extends Component {
  render() {
    const length = this.props.deck.length;

    return <div>{length}</div>;
  }
}

export default Deck;
