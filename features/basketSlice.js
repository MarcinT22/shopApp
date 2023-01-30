import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  count: 1,
  removedItem: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        if (itemInCart.count) {
          if (itemInCart.quantity + itemInCart.count < itemInCart.count) {
            itemInCart.quantity += state.count;
          } else {
            itemInCart.quantity = itemInCart.count;
          }
        }
      } else {
        state.items.push({ ...action.payload, quantity: state.count ?? 1 });
      }
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    removeItem: (state, action) => {
      const item = state.items.filter((item) => item.id == action.payload.id);
      state.removedItem = item;

      const removeItem = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      state.items = removeItem;
    },

    undoRemoveItem: (state) => {
      state.items = [...state.items, state.removedItem[0]];
      state.removedItem = [];
    },

    // removeFromBasket: (state, action) => {
    //   const removeItem = state.items.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   state.items = removeItem;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  removeFromBasket,
  setCount,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  undoRemoveItem,
} = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id == id);

export const getTotalPrice = (state) => {
  return state.basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export default basketSlice.reducer;
