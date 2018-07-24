import React from "react";

import { storiesOf } from "@storybook/react";

import Pile from "../components/Pile";

import deck from "./deck";

storiesOf("Pile", module)
  .add("with no cards", () => <Pile pile={[]} />)
  .add("with one card", () => <Pile pile={deck.slice(-1)} />)
  .add("with two cards", () => <Pile pile={deck.slice(-2)} />)
  .add("with more than five cards", () => <Pile pile={deck.slice(-10)} />);
