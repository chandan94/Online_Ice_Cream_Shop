import { useNavigate } from 'react-router';

import './icon-btn.styles.scss';
import { IconBtn } from './icon-btn.types';

const IconButton = ({ button : {iconName , btnName, url,quantity,disabled } }: IconBtn) => {
    const navigate = useNavigate();
    const navigateToURL = () => {
        if (url && url.length > 0) {
            navigate(url);
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


export default IconButton;