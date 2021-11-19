import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import './menu.styles.scss';
import { selectIsAdminUser } from '../../redux/user/user.selector';
import { Item } from '../menu-item/menu-item.types';
import { MenuProps } from './menu.types';

const Menu = ({ isAdmin }: MenuProps) => {

    const addIceCreamItem: Item = {
        img: "./images/plus-lg.svg",
        name: "Add Ice-cream",
        desc: "Click here to add a new ice-cream.",
        quantity: -1,
    }
    return (
        <div className="menu">
            <Container>
                {
                    isAdmin ? <MenuItem item={addIceCreamItem} isAdmin={isAdmin} isAddItem={true} /> : null
                }
            </Container>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isAdmin: selectIsAdminUser
})
export default connect(mapStateToProps)(Menu);