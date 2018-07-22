import React, { Component } from "react";

class Pile extends Component {
  render() {
    const { pile } = this.props;

    if (pile.length === 0) {
      return <React.Fragment />;
    }

    const top = pile.length - 1;
    const topCard = pile[top];

    return (
      <p>
        <img src={topCard.image} />
      </p>
    );
  }
}

export default Pile;
