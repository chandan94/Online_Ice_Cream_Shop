import { useNavigate } from 'react-router';

import './icon-btn.styles.scss';
import { IconBtn } from './icon-btn.types';

const IconButton = ({ button : {iconName , btnName, url, disabled } }: IconBtn) => {

    const navigate = useNavigate();

    const navigateToURL = () => {
        navigate(url);
    }

    const iconBtn = document.getElementById("icon-btn-id");
    if (url && url.length > 0) {
        iconBtn?.addEventListener("click", navigateToURL);
    }

    return (
        <div className={`icon icon-btn ${disabled ? 'disable-btn': ''} `} id="icon-btn-id">
            <i className={`bi bi-${iconName} custom-icon`}></i>
            {
                btnName && btnName.length > 0 ?  <p className="icon-btn-name">{btnName}</p> : null
            }
        </div>
    );
}

export default IconButton;