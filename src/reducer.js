import { initialState } from "./App";
import { INCREASE, DECREASE, CLEAR_CART, REMOVE } from "./components/actions";

export function reducer(state = initialState, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], amount: 0 };
  }
  if (action.type === DECREASE) {
    console.log("DECREASED AMOUNT");
  }
  if (action.type === INCREASE) {
    console.log("INCREASED AMOUNT");
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payLoad.id),
      amount: state.cart.length - 1,
    };
  }
  return state;
}
