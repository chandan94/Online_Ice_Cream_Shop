import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { onItemEditClick } from '../../redux/menu-item/menu-item.actions';
import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';

import './menu-item.styles.scss';
import { MenuItemProps, Item } from './menu-item.types';

const MenuItem = ({ item, isAdmin, isAddItem, showModal, editBtnClicked }: MenuItemProps) => {

    const  { name, desc, img, cost } = item;

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
        disabled: true,
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

    const handleOnEdit = () => {
        if (editBtnClicked) {
            editBtnClicked(item);
            if (showModal) {
                showModal(true);
            }
        }
    }

    return (
        <div className="menu-item">
            <Card>
                {
                    isAdmin && !isAddItem ?
                        (
                            <div className="modify-btn-group">
                                <IconButton button={editBtn} onPress={handleOnEdit}/>
                                <IconButton button={delBtn} />
                            </div>
                        ) : null
                }
                <Card.Img variant="top" src={img} className={`${desc && desc.includes("add") ? "img-margin" : ""}`}/>
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
                                    <span>{0}</span>
                                    <IconButton button={plusIconBtn} />
                                </div>
                            ) : null
                    }
                </Card.Body>
            </Card>
        </div>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showModal: (show: boolean) => dispatch(setModalShow(show)),
    editBtnClicked: (item: Item) => dispatch(onItemEditClick(item)),
});

export default connect(null, mapDispatchToProps)(MenuItem);