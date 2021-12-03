import cartActionTypes from './cart.types';
import { addItemToCart, removeNavigate,removeItemFromCart, addNavigateItemToCart } from './cart.utils';

const INITIAL_CART_STATE = {
    showCart: false,
    cartItems  :[],
}

const cartReducer = (state = INITIAL_CART_STATE, action: any) => {
    switch (action.type) {
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
            case cartActionTypes.ADD_NAVIGATE_ITEM:
            return {
                ...state,
                cartItems: addNavigateItemToCart(state.cartItems, action.payload)
            }

        case cartActionTypes.CLEAR_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item: any) => item.name !== action.payload.name),
            }

        case cartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case cartActionTypes.REMOVE_NAVIGATE:
            {
            return {
                ...state,
                cartItems: removeNavigate(state.cartItems, action.payload)
            }}

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