import cartActionTypes from './cart.types';


export const addItem = (item: any) => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item,
});
export const addNavigate = (item: any) => ({
    type: cartActionTypes.ADD_NAVIGATE_ITEM,
    payload: item,
});


export const removeItem = (item: any) => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item,
});

export const removeNavigateItem = (item: any) => ({
    type: cartActionTypes.REMOVE_NAVIGATE,
    payload: item,
});

export const clearItem = (item: any) => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item,
});

export const clearCart = () => ({
    type: cartActionTypes.CLEAR_CART,
    payload :null
});