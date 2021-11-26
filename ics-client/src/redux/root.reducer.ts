import { combineReducers } from 'redux';
import modalReducer from './add-edit-modal/add-edit-modal.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import icreamReducer from './icream/icream.reducer';
import menuItemReducer from './menu-item/menu-item.reducer';
import paginatonReducer from './pagination/pagination.reducer';
import ordersReducer from './orders/order.reducer';
import overlayReducer from './overlay/overlay.reducer';

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

export default rootReducer;