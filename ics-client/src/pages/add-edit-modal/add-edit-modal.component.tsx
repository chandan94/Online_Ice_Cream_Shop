import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import  * as yup from 'yup';

import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { selectModalShow } from '../../redux/add-edit-modal/add-edit-modal.selector';

import './add-edit-modal.styles.scss';
import { AddEditModalProps, HTMLInputEvent } from './add-edit-modal.types';

const FILE_SIZE = 1024 * 160;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const AddEditModal = ({ showModal, closeModal, modalTitle } : AddEditModalProps) => {

    const handleClose = () => {
        if(closeModal) {
            closeModal(false);
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
                    "File size should be less than "+FILE_SIZE,
                    value => value && value.size <= FILE_SIZE
                )
            .test("fileType",
                "Only JPG/JPEG and PNG format are supported.",
                value => value && SUPPORTED_FORMATS.includes(value.type)),
        avail: yup.number()
            .required("Please enter the quantity of ice-cream available.")
            .min(0, "At least 1 quantity of the ice-cream should be available."),
        calorie: yup.number()
            .required("Please enter the quantity of ice-cream available.")
        .   min(0, "At least 1 quantity of the ice-cream should be available."),
        ingredients: yup.string()
            .required("Please enter at least one ingredient."),
        servingSize: yup.string()
            .optional(),
    });

    const handleImageUpload = (e: any) => {
        const reader = new FileReader();
        reader.onload = e1 => {
            console.log(e1);
        };
        if(e.target && e.target.files) {
            reader.readAsDataURL(e.target.files[0])
        }
    };

    return (
        <div>
            <Modal show={showModal} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            flavor: '',
                            image: {},
                            avail: 0,
                            ingredients: '',
                            calorie: 0,
                            servingSize: 'small',
                        }}
                        validationSchema={modalSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}>
                        {({
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit
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
                                            />
                                            {
                                                touched.flavor && errors.flavor ?
                                                    (<div className="error-message">{errors.flavor}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="image-file">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" name="image"
                                            placeholder="Upload an image"
                                            className={touched.image && errors.image ? "error" : ""}
                                            onChange={handleImageUpload}
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
                                            />
                                            {
                                                touched.calorie && errors.calorie ?
                                                    (<div className="error-message">{errors.calorie}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="ice-cream-quant">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="avail"
                                                placeholder="Enter the quantity."
                                                className={touched.avail && errors.avail ? "error" : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                touched.avail && errors.avail ?
                                                    (<div className="error-message">{errors.avail}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="ice-cream-size">
                                            <Form.Label>Size</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="servingSize"
                                                placeholder="Enter the default serving size."
                                                className={touched.servingSize && errors.servingSize ? "error" : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                touched.servingSize && errors.servingSize ?
                                                    (<div className="error-message">{errors.servingSize}</div>)
                                                    : null
                                            }
                                        </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="ic-ingredients">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="text" name="ingredients"
                                            placeholder="Enter the ingredients. (Comma seperated values)"
                                            className={touched.ingredients && errors.ingredients ? "error" : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {
                                            touched.ingredients && errors.ingredients ?
                                                (<div className="error-message">{errors.ingredients}</div>)
                                                : null
                                        }
                                    </Form.Group>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    showModal : selectModalShow,
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    closeModal: (show:boolean) => dispatch(setModalShow(show)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);