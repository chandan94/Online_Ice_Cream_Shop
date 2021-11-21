import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import './menu.styles.scss';
import { selectIsAdminUser } from '../../redux/user/user.selector';
import { Item } from '../menu-item/menu-item.types';
import { MenuProps } from './menu.types';
import { selectAllICream } from '../../redux/icream/icream.selector';

const Menu = ({ isAdmin, icreams }: MenuProps) => {

    const addIceCreamItem: Item = {
        img: "./images/plus-lg.svg",
        name: "Add Ice-cream",
        desc: "Click here to add a new ice-cream.",
        quantity: -1,
    }
    return (
        <Container className="menu">
            {
                isAdmin ? <MenuItem item={addIceCreamItem} isAdmin={isAdmin} isAddItem={true} /> : null
            }
            {
                icreams.map(({ name, flavor, calorie, quantity, ingredients, image }, index) => {
                    const item: Item = {
                        name,
                        calorie,
                        quantity,
                        ingredients,
                        flavor,
                        desc: `This ice-cream is of ${flavor}, made up of ${ingredients} and has ${calorie} per serving`,
                        img: image,
                    };
                    return (
                        <MenuItem key={index + 1} item={item} isAdmin={isAdmin} isAddItem={false} />
                    );
                })
            }
        </Container>

    );
}

const mapStateToProps = createStructuredSelector({
    isAdmin: selectIsAdminUser,
    icreams: selectAllICream,
})
export default connect(mapStateToProps)(Menu);