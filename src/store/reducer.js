import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_PURCHASABLE
} from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
  purchasable: false,
};

const INGREDIENT_PRICES = {
  salad: 0.50,
  bacon: 1.00,
  cheese: 0.75,
  meat: 3.00
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case UPDATE_PURCHASABLE:
      return {
        ...state,
        purchasable: action.purchasable
      };
    default:
      return state;
  }
};

export default reducer;