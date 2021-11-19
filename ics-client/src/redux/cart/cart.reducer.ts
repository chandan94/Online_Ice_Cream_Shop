import cartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_CART_STATE = {
    showCart: false,
    cartItems  :[],
}

const cartReducer = (state = INITIAL_CART_STATE, action: { type: any; payload: { id: any; }; }) => {
    switch (action.type) {
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        case cartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item: { id: any; }) => item.id !== action.payload.id),
            }

        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
};

export default cartReducer;