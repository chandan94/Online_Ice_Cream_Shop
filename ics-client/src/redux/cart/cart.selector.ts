import { createSelector } from 'reselect';

const selectCart = (state: { cart: any; }) => state.cart;


export const selectCartItems = createSelector (
    [selectCart],
    cart => cart.cartItems,
);

export const selectCartShow = createSelector (
    [selectCart],
    cart => cart.showCart,
);

export const selectCartItemsCount = createSelector (
    [selectCartItems],
    cartItems => cartItems.reduce((accumulator: any, item: { quantity: any; }) => accumulator + item.quantity ,0)
);

export const selectCartItemsTotal = createSelector (
    [selectCartItems],
    cartItems => cartItems.reduce((accumulator: number, item: { cost: number; quantity: number; }) => accumulator + (item.cost * item.quantity),0)
);