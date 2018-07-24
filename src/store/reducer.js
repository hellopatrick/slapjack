import { DECKS_DEALT, GAME_TICK, DECKS_DEALING, SLAP } from "./actions";

const initialState = {
  active: false,
  dealing: false,
  playerOne: [],
  playerTwo: [],
  pile: [],
  currentPlayer: -1,
  winner: -1,
};

const tick = state => {
  if (state.active) {
    const { pile, playerOne, playerTwo, currentPlayer } = state;

    if (pile.length > 2) {
      const top = pile.length - 1;
      const underTop = pile.length - 2;

      const topCard = pile[top];
      const underTopCard = pile[underTop];

      if (topCard.value === underTopCard.value) {
        console.log("MATCH!", topCard, underTopCard);
      }
    }

    if (currentPlayer === 1) {
      if (playerOne.length === 0) {
        return { ...state, winner: 2 };
      }

      const newPlayerPile = playerOne.slice(1);
      const newPile = pile.concat(playerOne[0]);
      const nextPlayer = 2;

      return {
        ...state,
        pile: newPile,
        playerOne: newPlayerPile,
        currentPlayer: nextPlayer,
      };
    } else {
      if (playerTwo.length === 0) {
        return { ...state, winner: 1 };
      }

      const newPlayerPile = playerTwo.slice(1);
      const newPile = pile.concat(playerTwo[0]);
      const nextPlayer = 1;

      return {
        ...state,
        pile: newPile,
        playerTwo: newPlayerPile,
        currentPlayer: nextPlayer,
      };
    }
  }

  return state;
};

const slap = (state, { player }) => {
  const { pile, playerOne, playerTwo } = state;

  if (pile.length < 2) {
    return state;
  }

  const [underTopCard, topCard] = pile.slice(-2);

  console.log(topCard.value, underTopCard.value);

  if (topCard.value === underTopCard.value || topCard.value === "JACK") {
    console.log("OKAY!");
    if (player === 1) {
      const newPlayerPile = playerOne.concat(pile);
      const newPile = [];
      return { ...state, pile: newPile, playerOne: newPlayerPile };
    } else {
      const newPlayerPile = playerTwo.concat(pile);
      const newPile = [];
      return { ...state, pile: newPile, playerTwo: newPlayerPile };
    }
  } else {
    if (player === 2) {
      const newPlayerPile = playerOne.concat(pile);
      const newPile = [];
      return { ...state, pile: newPile, playerOne: newPlayerPile };
    } else {
      const newPlayerPile = playerTwo.concat(pile);
      const newPile = [];
      return { ...state, pile: newPile, playerTwo: newPlayerPile };
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DECKS_DEALT:
      const { playerOne, playerTwo } = action;
      return {
        ...state,
        active: true,
        dealing: false,
        playerOne,
        playerTwo,
        pile: [],
        currentPlayer: 1,
      };
    case GAME_TICK:
      return tick(state);
    case DECKS_DEALING:
      return {
        ...initialState,
        dealing: true,
      };
    case SLAP:
      return slap(state, action);
    default:
      console.log(action);
      return state;
  }
};

export default reducer;
