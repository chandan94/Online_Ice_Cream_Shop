import { useNavigate } from 'react-router';
import { clearCart } from '../../redux/cart/cart.action';

import './icon-btn.styles.scss';
import { connect } from 'react-redux';

import { IconBtn } from './icon-btn.types';
import { Dispatch } from 'redux';
import { setCurrentUser } from '../../redux/user/user.actions';

const IconButton = ({ button : {iconName , btnName, url,quantity,disabled}, clearCart,setCurrentUser }: IconBtn) => {
    const navigate = useNavigate();
    const navigateToURL = () => {
        if (url && url.length > 0) {
            navigate(url);
        }
        if (!url && url.length===0 && btnName === 'Log Out')
        {
            clearCart();
            const user = {
                email : '',
                isAdmin :false
            };   
            setCurrentUser(user);
            navigate('/login');
        }
    }

    return (
        <div className={`icon icon-btn ${disabled ? 'disable-btn': ''} `} id="icon-btn-id" onClick={navigateToURL}>
                {
                 btnName && btnName === 'Cart' ? <span className='badge badge-warning' id='lblCartCount'> {quantity}</span> :null
            }
            <i className={`bi bi-${iconName} custom-icon`}></i>

            {
                btnName && btnName.length > 0 ?  <p className="icon-btn-name">{btnName}</p> : null
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch : Dispatch) => ({ 
    clearCart :() => dispatch(clearCart()),
    setCurrentUser: (payload: any) => dispatch(setCurrentUser(payload)),
});
export default connect(null,mapDispatchToProps)(IconButton);