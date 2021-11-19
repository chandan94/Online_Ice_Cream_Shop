import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import IconButton from '../icon-btn/icon-btn.component';
import AddEditModal from '../../pages/add-edit-modal/add-edit-modal.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';

import './menu-item.styles.scss';
import { MenuItemProps } from './menu-item.types';
import { createStructuredSelector } from 'reselect';
import { selectModalShow } from '../../redux/add-edit-modal/add-edit-modal.selector';

const MenuItem = ({ item: { name, desc, img, quantity }, isAdmin, isAddItem, showModal}: MenuItemProps,) => {

    const plusIconBtn: IconBtnProps = {
        iconName: "plus-circle",
        url: "",
        btnName: "",
        disabled: false,
    };

    const minusIconBtn: IconBtnProps = {
        iconName: "dash-circle",
        url: "",
        btnName: "",
        disabled: quantity < 0 ? true : false,
    };

    const editBtn: IconBtnProps = {
        iconName: "pencil-fill",
        url: "/add-edit-modal",
        btnName: "",
        disabled: false,
    };

    const delBtn: IconBtnProps = {
        iconName: "trash-fill",
        url: "/add-edit-modal",
        btnName: "",
        disabled: false,
    };

    const setShowModal = () => {
        if(showModal) {
            showModal(true);
        }
    };

    return (
        <div className="menu-item">
            <Card style={{ width: '18rem' }}>
                {
                    isAdmin && !isAddItem ?
                        (
                            <div className="modify-btn-group">
                                <IconButton button={editBtn} />
                                <IconButton button={delBtn} />
                            </div>
                        ) : null
                }
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{desc}</Card.Text>
                    {
                        isAdmin && isAddItem ? <Button variant="primary" onClick={setShowModal}>Add Ice-cream</Button> : null
                    }
                    {
                        !isAdmin && !isAddItem ?
                            (
                                <div className="inc-dec-btn-group">
                                    <IconButton button={minusIconBtn} />
                                    <span>{quantity}</span>
                                    <IconButton button={plusIconBtn} />
                                </div>
                            ) : null
                    }
                </Card.Body>
            </Card>
            <AddEditModal />
        </div>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showModal: (show: boolean) => dispatch(setModalShow(show)),
})

export default connect(null, mapDispatchToProps)(MenuItem);