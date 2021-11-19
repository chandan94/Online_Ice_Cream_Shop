import { useNavigate } from 'react-router';

import './icon-btn.styles.scss';
import { IconBtn } from './icon-btn.types';

const IconButton = ({ button : {iconName , btnName, url } }: IconBtn) => {
    const navigate = useNavigate();

    const navigateToURL = () => {
        navigate(url);
    }
    return (
        <div className="icon icon-btn" onClick={navigateToURL}>
            <i className={`bi bi-${iconName} custom-icon`}></i>
            <p className="icon-btn-name">{btnName}</p>
        </div>
    );
}

export default IconButton;