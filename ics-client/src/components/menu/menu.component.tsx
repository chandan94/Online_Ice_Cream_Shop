import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import AddEditModal from '../../pages/add-edit-modal/add-edit-modal.component';
import { selectIsAdminUser } from '../../redux/user/user.selector';
import { Item } from '../menu-item/menu-item.types';
import { MenuProps } from './menu.types';
import { selectAllICream, selectICreamFilter, selectIsFetching } from '../../redux/icream/icream.selector';
import { selectMenuCurrItem, selectMenuItemEdit } from '../../redux/menu-item/menu-item.selector';
import './menu.styles.scss';


const Menu = ({ isAdmin, icreams, editClicked, currIcream, filter, isFetching }: MenuProps) => {

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
                icreams && icreams.length > 0 ?
                    icreams.map(({ _id, name, flavor, calorie, cost, ingredients, image, imageName, inventory }, index) => {
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
                        inventory,
                    };
                    return (
                        <MenuItem key={index + 1} item={item} isAdmin={isAdmin} isAddItem={false} />
                    );
                }) : !isFetching ? <div className="no-flavor">Oh no! we don't have any more ice-creams of {filter} flavor &#128546;.<br /> Please check after a day!</div> : null
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
    filter: selectICreamFilter,
    isFetching: selectIsFetching,
})
export default connect(mapStateToProps)(Menu);