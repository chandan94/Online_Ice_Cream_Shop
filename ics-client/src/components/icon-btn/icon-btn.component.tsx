import { useNavigate } from 'react-router';

import './icon-btn.styles.scss';
import { IconBtn } from './icon-btn.types';

const IconButton = ({ button : {iconName , btnName, url, disabled }, onPress }: IconBtn) => {

    const navigate = useNavigate();

    const navigateToURL = () => {
        if (url && url.length > 0) {
            if (url !==  "/add-edit-modal") {
                navigate(url);
            } else {
                if (onPress) {
                    onPress();
                }
            }
        }
    }

    return (
        <div className={`icon icon-btn ${disabled ? 'disable-btn': ''} `} id="icon-btn-id" onClick={navigateToURL}>
            <i className={`bi bi-${iconName} custom-icon`}></i>
            {
                btnName && btnName.length > 0 ?  <p className="icon-btn-name">{btnName}</p> : null
            }
        </div>
    );
}

export default IconButton;