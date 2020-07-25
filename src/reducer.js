import { initialState } from "./App";
import {
  INCREASE,
  DECREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
} from "./components/actions";

export function reducer(state = initialState, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], amount: 0 };
  }
  if (action.type === DECREASE) {
    let tempCart = [];
    if (action.payLoad.amount === 1) {
      tempCart = state.cart.filter((item) => item.id !== action.payLoad.id);
    } else {
      tempCart = state.cart.map((item) => {
        if (item.id === action.payLoad.id) {
          item = { ...item, amount: item.amount - 1 };
        }
        return item;
      });
    }
    return { ...state, cart: tempCart };
  }
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payLoad.id) {
        item = { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payLoad.id),
      amount: state.cart.length - 1,
    };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.amount += amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      amount: amount,
      total: total,
    };
  }
  return state;
}
