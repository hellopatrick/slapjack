import { applyMiddleware } from "redux";

const logger = store => next => action => {
  console.group(action.type);
  console.info("logger", new Date());
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const thunk = store => next => action =>
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);

const middleware = applyMiddleware(thunk, logger);

export default middleware;
