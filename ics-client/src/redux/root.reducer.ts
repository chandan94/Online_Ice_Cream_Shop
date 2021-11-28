import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import modalReducer from './add-edit-modal/add-edit-modal.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import icreamReducer from './icream/icream.reducer';
import menuItemReducer from './menu-item/menu-item.reducer';
import paginatonReducer from './pagination/pagination.reducer';
import ordersReducer from './orders/order.reducer';
import overlayReducer from './overlay/overlay.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart','user']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart : cartReducer,
    modal: modalReducer,
    icream: icreamReducer,
    menu: menuItemReducer,
    page: paginatonReducer,
    orderDetails: ordersReducer,
    spinner: overlayReducer,
});

export default persistReducer(persistConfig, rootReducer);