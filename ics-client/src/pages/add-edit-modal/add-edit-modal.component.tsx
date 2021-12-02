import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import ToastNotification from '../../components/toast/toast.component';
import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { selectModalShow } from '../../redux/add-edit-modal/add-edit-modal.selector';
import { AddEditModalProps } from './add-edit-modal.types';
import { fetchIcreamStart } from '../../redux/icream/icream.action';
import { editDone } from '../../redux/menu-item/menu-item.actions';
import { FILE_SIZE, ICE_CREAM_URL, SUPPORTED_FORMATS } from '../../ics-constants';
import { GetAllICreamPayload } from '../../redux/icream/icream.types';
import { selectActivePage } from '../../redux/pagination/pagination.selector';

import './add-edit-modal.styles.scss';
import { setToastComp } from '../../redux/toast/toast.actions';
import { ToastState } from '../../redux/toast/toast.types';

const AddEditModal = ({ showModal, closeModal, modalTitle, modalButton, getAllICream,
                        currIcream, isEdit, editCleanUp, activePage, showToast }: AddEditModalProps) => {

    let imageData: any;
    let imageName: string | undefined = isEdit && currIcream ? currIcream.imageName : "";
    let toastMsg = "";
    const toastHeader = "Add/Edit Ice-cream";
    let toastVariant = ""
    // let imageFile: any;

    const handleClose = () => {
        if (closeModal) {
            closeModal(false);
        }
        if (isEdit && editCleanUp) {
            editCleanUp();
        }
    };

    const handleAddEdit = () => {
        return;
    };

    const modalSchema = yup.object().shape({
        name: yup.string()
            .required('Please enter a name for the ice-cream.')
            .min(3, "Name should be of 3 characters length at least"),
        flavor: yup.string()
            .required('Please enter a name for the flavor.')
            .min(3, "Flavor should be of 3 characters length at least"),
        image: yup.mixed()
            .required("Please upload an image for the file.")
            .test("fileSize",
                "File size should be less than " + FILE_SIZE,
                value => {
                    return ( isEdit && value === currIcream?.imageName) || (value && value.size <= FILE_SIZE)
                })
            .test("fileType",
                "Only JPG/JPEG and PNG format are supported.",
                value => {
                    return ( isEdit && value === currIcream?.imageName) || (value &&  SUPPORTED_FORMATS.includes(value.type))
                }),
        cost: yup.number()
            .test("isDecimal", "Enter a valid cost for the ice-cream.",
                value => value && (value + "").match(/^\d{0,2}(\.\d{1,2})?$/) ? true : false)
            .required("Please enter the cost of ice-cream..")
            .min(1, "Cost cannot be 0."),
        calorie: yup.number()
            .required("Please enter the quantity of ice-cream costable.")
            .min(1, "Calories should be greater than 0."),
        ingredients: yup.string()
            .required("Please enter at least one ingredient."),
        quantity: yup.number()
            .required("Please enter the quantity of ice-cream costable.")
            .min(1, "At least 1 quantity of the ice-cream should be costable."),
    });

    const handleImageUpload = (e: any, setFieldValue: any) => {
        const reader = new FileReader();
        reader.onload = image => {
            imageData = image.target?.result;
        };
        if (e.target && e.target.files) {
            const imgFile = e.target.files[0];
            imageName = imgFile.name;
            reader.readAsDataURL(imgFile);
            setFieldValue("image", imgFile);
        }
    };

    return (
        <div className="add-edit-modal">
            <Modal show={showModal} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: currIcream ? currIcream.name : '',
                            flavor: currIcream ? currIcream.flavor : '',
                            image: currIcream ? currIcream.imageName : '',
                            cost: currIcream ? currIcream.cost : 0,
                            ingredients: currIcream ? currIcream.ingredients : '',
                            calorie: currIcream ? currIcream.calorie : '',
                            quantity: currIcream ? currIcream.quantity: 0,
                            servingSize: 'small',
                        }}
                        validationSchema={modalSchema}
                        onSubmit={(values, actions) => {
                            const { name, flavor, calorie, ingredients, cost, image, quantity } = values;

                            const data = {
                                name,
                                flavor,
                                calorie,
                                ingredients,
                                cost,
                                image: isEdit && image === '' ?  currIcream ? currIcream.img : '' : imageData,
                                imageName,
                                delete: false,
                                servingSize: "small",
                                quantity,
                            };
                            if (!isEdit) {
                                if (!imageData || imageData.length === 0) {
                                    actions.setFieldError("image", "Please upload a valid image  file.")
                                }
                                axios.post(ICE_CREAM_URL, data)
                                    .then(resp => {
                                        if (resp.status === 200) {
                                            toastMsg = `${values.name} ice-cream added successfully`;
                                            showToast({
                                                show: true,
                                                header: toastHeader,
                                                msg: toastMsg,
                                                variant: "success",
                                            });
                                            getAllICream({
                                                search: "",
                                                page: activePage && activePage > 1 ? activePage : 0,
                                                filter: "",
                                            });
                                        } else {
                                            toastMsg = `There was an issue in adding ${values.name}, please try later`;
                                            showToast({
                                                show: true,
                                                header: toastHeader,
                                                msg: toastMsg,
                                                variant: "danger",
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                                    .finally(() => {
                                        if (closeModal) {
                                            closeModal(false);
                                        }
                                    });
                            } else if (isEdit) {
                                const id = currIcream ? currIcream._id : ''
                                if (image === '' && currIcream && currIcream.img !== '') {
                                    actions.setFieldValue("image", currIcream.img)
                                }
                                axios.put(`${ICE_CREAM_URL}/${id}`, data)
                                    .then(resp => {
                                        if (resp.status === 200) {
                                            toastMsg = `${values.name} ice-cream updated successfully`;
                                            showToast({
                                                show: true,
                                                header: toastHeader,
                                                msg: toastMsg,
                                                variant: "success",
                                            });
                                            getAllICream({
                                                search: "",
                                                page: activePage && activePage > 1 ? activePage : 0,
                                                filter: "",
                                            });
                                        } else {
                                            toastMsg = `There was an issue in updating ${values.name}, please try later`;
                                            showToast({
                                                show: true,
                                                header: toastHeader,
                                                msg: toastMsg,
                                                variant: "warning",
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    })
                                    .finally(() => {
                                        handleClose();
                                    })
                            }
                        }}>
                        {({
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <Form className="add-edit-modal" onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="ice-cream-name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter Ice-cream name."
                                                className={touched.name && errors.name ? "error" : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={currIcream ? currIcream.name : ''}
                                            />
                                            {
                                                touched.name && errors.name ?
                                                    (<div className="error-message">{errors.name}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="ice-cream-flav">
                                            <Form.Label>Flavor</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="flavor"
                                                placeholder="Enter the flavor."
                                                className={touched.flavor && errors.flavor ? "error" : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={currIcream ? currIcream.flavor : ''}
                                            />
                                            {
                                                touched.flavor && errors.flavor ?
                                                    (<div className="error-message">{errors.flavor}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {
                                    isEdit ?
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" >
                                            <Form.Label>Existing Image name</Form.Label>
                                            <Form.Control type="text" name="existing-image"
                                                placeholder="Chosen Image"
                                                onBlur={handleBlur}
                                                defaultValue={currIcream ? currIcream.imageName : ''}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row> : null
                                }
                                <Row>
                                    <Form.Group as={Col} className="mb-3" >
                                        <Form.Label>{isEdit? `New Image` : `Image`}</Form.Label>
                                        <Form.Control type="file" name="image"
                                            placeholder="Upload an image"
                                            className={touched.image && errors.image ? "error" : ""}
                                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.image && errors.image ?
                                                (<div className="error-message">{errors.image}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="ice-cream-calorie">
                                        <Form.Label>Calorie</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="calorie"
                                            placeholder="Enter Ice-cream calories."
                                            className={touched.calorie && errors.calorie ? "error" : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            defaultValue={currIcream ? currIcream.calorie : ''}
                                        />
                                        {
                                            touched.calorie && errors.calorie ?
                                                (<div className="error-message">{errors.calorie}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="ice-cream-cost">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cost"
                                            placeholder="Enter the cost (in $)."
                                            className={touched.cost && errors.cost ? "error" : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            defaultValue={currIcream ? currIcream.cost : ''}
                                        />
                                        {
                                            touched.cost && errors.cost ?
                                                (<div className="error-message">{errors.cost}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="ice-cream-quant">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="quantity"
                                            placeholder="Enter the quantity available."
                                            className={touched.quantity && errors.quantity ? "error" : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            defaultValue={currIcream? currIcream.quantity : 0}
                                        />
                                        {
                                            touched.quantity && errors.quantity ?
                                                (<div className="error-message">{errors.quantity}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="ic-ingredients">
                                        <Form.Label>Ingredients</Form.Label>
                                        <Form.Control type="text" name="ingredients"
                                            placeholder="Enter the ingredients. (Comma seperated values)"
                                            className={touched.ingredients && errors.ingredients ? "error" : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            defaultValue={currIcream ? currIcream.ingredients : ''} />
                                        {
                                            touched.ingredients && errors.ingredients ?
                                                (<div className="error-message">{errors.ingredients}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                </Row>
                                <div className="submit-btn">
                                    <Button variant="dark" type="submit" onClick={handleAddEdit}>
                                        {modalButton}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <ToastNotification />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    showModal: selectModalShow,
    activePage: selectActivePage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    closeModal: (show: boolean) => dispatch(setModalShow(show)),
    getAllICream: (payload: GetAllICreamPayload) => dispatch(fetchIcreamStart(payload)),
    editCleanUp: () => dispatch(editDone()),
    showToast: (show: ToastState) => dispatch(setToastComp(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);