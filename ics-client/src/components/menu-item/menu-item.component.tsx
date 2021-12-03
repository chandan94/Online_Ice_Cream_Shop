import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ICE_CREAM_URL } from '../../ics-constants';

import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { addItem ,addNavigate} from '../../redux/cart/cart.action';
import { fetchIcreamStart } from '../../redux/icream/icream.action';
import { GetAllICreamPayload } from '../../redux/icream/icream.types';
import { onItemEditClick } from '../../redux/menu-item/menu-item.actions';
import { selectActivePage } from '../../redux/pagination/pagination.selector';
import { setToastComp } from '../../redux/toast/toast.actions';
import { ToastState } from '../../redux/toast/toast.types';

import './menu-item.styles.scss';
import { MenuItemProps, Item } from './menu-item.types';

const MenuItem = ({ item, isAdmin, isAddItem, showModal,showToast, editBtnClicked, getAllICream, activePage ,addItemToCart,addNavigateItemToCart }: MenuItemProps) => {
    const navigate = useNavigate();
    const { name, flavor, cost, img, calorie, ingredients, imageName, desc } = item;

    // const plusIconBtn: IconBtnProps = {
    //     iconName: "plus-circle",
    //     url: "",
    //     btnName: "",
    //     disabled: false,
    //     quantity :0
    // };

    // const minusIconBtn: IconBtnProps = {
    //     iconName: "dash-circle",
    //     url: "",
    //     btnName: "",
    //     disabled: true,
    //     quantity :0
    // };

    const setShowModal = () => {
        if (showModal) {
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

    const handleOnDelete = () => {
        const toastObj = {
            show: true,
            header: "Delete Ice-cream",
            msg: "",
            variant: "",
        };

        if (window.confirm(`Are you sure you want to delete ice-cream ${item.name}`)) {
            const data = {
                name,
                flavor,
                cost,
                calorie,
                ingredients,
                image: img,
                imageName: imageName ? imageName : '',
                delete: true,
            }
            axios.put(`${ICE_CREAM_URL}/${item._id}`, data)
                .then(resp => {
                    if (resp.status === 200) {
                        toastObj.msg = `${item.name} ice-cream deleted successfully`;
                        toastObj.variant = "success";
                        if (getAllICream) {
                            getAllICream({
                                search: "",
                                page: activePage && activePage > 1 ? activePage : 0,
                                filter: "",
                            });
                        }
                    }
                })
                .catch(() => {
                    toastObj.msg = `Error in deleting ${item.name} ice-cream, Try again after sometime.`
                    toastObj.variant = "warning";
                })
                .finally(() => {
                    showToast?.(toastObj);
                })
        }
    }

    const handleAddToCart = () => {
        if (addItemToCart) {
            addItemToCart(item);
        }
    }
    const handleNameClick = () => {
        if (addNavigateItemToCart) {
            const cartitem = {
                navigate :'true',
                ...item 
            }
            addNavigateItemToCart(cartitem);
            navigate('/ice-cream-detail')
        }
    }

    return (
        <div className="menu-item">
            <Card onClick={handleNameClick}>
                {
                    isAdmin && !isAddItem ?
                        (
                            <div className="modify-btn-group">
                                <span className="modify-btn" onClick={handleOnEdit}><i className="bi bi-pencil-fill custom-icon"></i></span>
                                <span className="modify-btn" onClick={handleOnDelete}><i className="bi bi-trash-fill trash-fill`"></i></span>
                            </div>
                        ) : null
                }
                <Card.Img variant="top" src={img} className={`${desc && desc.includes("add") ? "img-margin" : ""}`}  />
                <Card.Body>
                    <Card.Title >{name}</Card.Title>
                    {
                        !isAddItem ?    <Card.Subtitle>Cost : {cost}$</Card.Subtitle> : null
                    }
                    <Card.Text>{desc}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        isAdmin && isAddItem ? <Button variant="dark" onClick={setShowModal}>Add Ice-cream</Button> : null
                    }
                    {
                        !isAdmin && !isAddItem ?
                            (
                                // <div className="inc-dec-btn-group">
                                //     <IconButton button={minusIconBtn} />
                                //     <span>{0}</span>
                                //     <IconButton button={plusIconBtn} />
                                // </div>
                                // <Row>
                                // <Col>
                                <Button variant="dark" type="submit" className="add-to-cart" onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                                //     </Col>
                                // </Row>
                            ) : null
                    }
                </Card.Footer>
            </Card>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    activePage: selectActivePage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showModal: (show: boolean) => dispatch(setModalShow(show)),
    editBtnClicked: (item: Item) => dispatch(onItemEditClick(item)),
    getAllICream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
    addNavigateItemToCart: (item: Item) => dispatch(addNavigate(item)),
    addItemToCart: (item: Item) => dispatch(addItem(item)),
    showToast: (payload: ToastState) => dispatch(setToastComp(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);