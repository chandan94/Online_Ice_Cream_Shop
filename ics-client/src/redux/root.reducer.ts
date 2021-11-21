import { combineReducers } from 'redux';
import modalReducer from './add-edit-modal/add-edit-modal.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import icreamReducer from './icream/icream.reducer';
const rootReducer = combineReducers({
    user: userReducer,
    cart : cartReducer,
    modal: modalReducer,
    icream: icreamReducer,
});

export default rootReducer;