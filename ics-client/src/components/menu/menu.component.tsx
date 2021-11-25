import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import AddEditModal from '../../pages/add-edit-modal/add-edit-modal.component';
import { selectIsAdminUser } from '../../redux/user/user.selector';
import { Item } from '../menu-item/menu-item.types';
import { MenuProps } from './menu.types';
import { selectAllICream } from '../../redux/icream/icream.selector';
import './menu.styles.scss';
import { selectMenuCurrItem, selectMenuItemEdit } from '../../redux/menu-item/menu-item.selector';

const Menu = ({ isAdmin, icreams, editClicked, currIcream }: MenuProps) => {

    const addIceCreamItem: Item = {
        img: "./images/plus-lg.svg",
        name: "Add Ice-cream",
        desc: "Click here to add a new ice-cream.",
    };

    const modalTitle = editClicked ? "Update Ice-cream" : "Add Ice-cream";
    const modalButton = editClicked ? "Update" : "Add";

    return (
        <Container className="menu">
            {
                isAdmin ? <MenuItem item={addIceCreamItem} isAdmin={isAdmin} isAddItem={true} /> : null
            }
            {
                icreams.map(({ _id, name, flavor, calorie, cost, ingredients, image, imageName, quantity }, index) => {
                    const item: Item = {
                        _id,
                        name,
                        calorie,
                        cost,
                        ingredients,
                        flavor,
                        desc: `This ice-cream is of ${flavor} flavor,
                               made up of ${ingredients} and
                               has ${calorie} calorie per serving.`,
                        img: image,
                        imageName,
                        orderAmount: 0,
                        quantity,
                    };
                    return (
                        <MenuItem key={index + 1} item={item} isAdmin={isAdmin} isAddItem={false} />
                    );
                })
            }
            <AddEditModal modalTitle={modalTitle} modalButton={modalButton} currIcream={currIcream} isEdit={editClicked}/>
        </Container>

    );
}

const mapStateToProps = createStructuredSelector({
    isAdmin: selectIsAdminUser,
    icreams: selectAllICream,
    currIcream: selectMenuCurrItem,
    editClicked: selectMenuItemEdit,
})
export default connect(mapStateToProps)(Menu);