import React, { Component, StrictMode } from "react";
import { createStore, compose } from "redux";

import Game from "./components/Game";

import reducer from "./store/reducer";
import middleware from "./store/middleware";

import { handleNewGame, handleKeyDown } from "./store/actions";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
      reducer,
      { active: false },
      composeEnhancers(middleware)
    );

    this.state = {
      store,
    };

    store.subscribe(() => {
      this.forceUpdate();
    });

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown({ key }) {
    const { store } = this.state;

    store.dispatch(handleKeyDown(key));
  }

  componentDidMount() {
    this.state.store.dispatch(handleNewGame());

    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <StrictMode>
        <Game store={this.state.store} />
      </StrictMode>
    );
  }
}

export default App;
