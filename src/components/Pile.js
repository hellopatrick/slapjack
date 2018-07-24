import React, { PureComponent } from "react";

import "./Pile.css";

function Card({ card }) {
  return (
    <div className="card">
      <img src={card.image} alt={card.value} />
    </div>
  );
}

class Pile extends PureComponent {
  render() {
    const { pile = [] } = this.props;

    const children = pile.slice(-5).map(card => <Card card={card} />);

    return <div className="pile">{children}</div>;
  }
}

export default Pile;
