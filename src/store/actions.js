export const GAME_TICK = "GAME_TICK";
export const DECKS_DEALING = "DEALING";
export const DECKS_DEALT = "DECKS_DEALT";
export const SLAP = "SLAP";

export const tick = () => ({
  type: GAME_TICK,
});

const dealNewDeck = () => {
  return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(({ deck_id }) => deck_id);
};

const drawFromDeck = deckId => n => {
  return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${n}`)
    .then(response => response.json())
    .then(({ cards }) => cards);
};

export const handleNewGame = () => dispatch => {
  const payload = dealNewDeck()
    .then(deck_id => {
      const draw = drawFromDeck(deck_id);
      return Promise.all([draw(26), draw(26)]);
    })
    .then(([playerOne, playerTwo]) => {
      dispatch({ type: DECKS_DEALT, playerOne, playerTwo });
    });

  dispatch({
    type: DECKS_DEALING,
    payload,
  });
};

export const handleKeyDown = key => dispatch => {
  if (key === "a") {
    dispatch({ type: SLAP, player: 1 });
  } else if (key === "l") {
    dispatch({ type: SLAP, player: 2 });
  }
};
