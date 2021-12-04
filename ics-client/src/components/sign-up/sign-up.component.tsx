import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Button, Row, Col } from 'react-bootstrap';
import './sign-up.styles.scss';
import axios from 'axios';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import ToastNotification from '../../components/toast/toast.component';
import { setToastComp } from '../../redux/toast/toast.actions';
import { ToastState } from '../../redux/toast/toast.types';
import { SignUpProps } from './sign-up.types';

const SignupSchema = yup.object().shape({
    firstName: yup.string()
        .min(2, "First name should have at least two characters.")
        .required("First name is a required field.")
        .trim(),
    lastName: yup.string()
        .required("Last name is a required field."),
    email: yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.')
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please enter a valid email address."),
    password: yup.string()
        .required()
        .min(8, "Password should be of 8 characters at least.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password should have at least 1 capital letter, small letter, 1 number and 1 special character among !@#$%^&*"),
    confirm: yup.string()
        .required("Re-enter password.")
        .oneOf([yup.ref("password")], 'Passwords do not match.'),
    phoneNumber: yup.number()
        .required("Please enter your phone number.")
        .test("length", "Phone number should be of 10 digit length.", val => val?.toString().length === 10),
    address1: yup.string()
        .required("Please enter your delivery address."),
    address2: yup.string()
        .optional(),
    city: yup.string()
        .min(3, "City name should have at least 3 characters.")
        .required("Enter the city name"),
    state: yup.string()
        .min(2, "State should have at least two characters.")
        .required("State is required."),
    zip: yup.number()
        .required("Zip code is required.")
        .test("length", "Zip code should have 5 digits.", val => val?.toString().length === 5),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
}
const SignUp = ({showToast} :SignUpProps) => {
    const width = window.outerWidth;
    const navigate = useNavigate();
    let toastMsg = "";
    const toastHeader = "Sign Up User";
    return (
        <div className="sign-up">
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashdPwd=bcrypt.hashSync(values.password,salt);

                const url = '/api/customer/';
                const body={
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: hashdPwd,
                        phoneNumber: values.phoneNumber,
                        address1: values.address1,
                        address2: values.address2,
                        city: values.city,
                        state: values.state,
                        zip: values.zip,
                        isAdmin :0
                    };

                    const geturl = '/api/customer/' + values.email;
                    axios.get(geturl)
                        .then(resp => {
                            if (resp.status === 200) {
                                if (resp.data === null) {
                 axios.post(url, body)
                .then((signUpResp: any) =>  {
                    if (signUpResp.status === 200) {
                        toastMsg = `Sign Up Success`;
                        showToast({
                            show: true,
                            header: toastHeader,
                            msg: toastMsg,
                            variant: "success",
                        });
                        navigate("/login");                    }
                })
                .catch((err: any) => console.error(err));
            }
            else if (resp.data !== null)
            {
                toastMsg = `Username / Email already exists`;
                showToast({
                    show: true,
                    header: toastHeader,
                    msg: toastMsg,
                    variant: "danger",
                });
            }
        }
    });
}}
        >
    {({
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
    }) => (
        <Form className="sign-up" onSubmit={handleSubmit} >
            <h3 className="mb-3">Sign Up</h3>
            <Row className="mb-1">
                <Form.Group as={Col} sm={6} className={width < 768 ? "mb-3" : ""} controlId="formGridFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        className={touched.firstName && errors.firstName ? "error" : ""}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {
                        touched.firstName && errors.firstName ?
                            (<div className="error-message">{errors.firstName}</div>)
                            : null
                    }
                </Form.Group>
                <Form.Group as={Col} sm={6} controlId="formGridLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        className={touched.lastName && errors.lastName ? "error" : ""}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {
                        touched.lastName && errors.lastName ?
                            (<div className="error-message">{errors.lastName}</div>)
                            : null
                    }
                </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    className={touched.email && errors.email ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.email && errors.email ?
                        (<div className="error-message">{errors.email}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={touched.password && errors.password ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.password && errors.password ?
                        (<div className="error-message">{errors.password}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridconfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className={touched.confirm && errors.confirm ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.confirm && errors.confirm ?
                        (<div className="error-message">{errors.confirm}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    className={touched.phoneNumber && errors.phoneNumber ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.phoneNumber && errors.phoneNumber ?
                        (<div className="error-message">{errors.phoneNumber}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    placeholder="1234 Main St"
                    type="text"
                    name="address1"
                    className={touched.address1 && errors.address1 ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.address1 && errors.address1 ?
                        (<div className="error-message">{errors.address1}</div>)
                        : null
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                    placeholder="Apartment, studio, or floor"
                    type="text"
                    name="address2"
                    className={touched.address2 && errors.address2 ? "error" : ""}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                {
                    touched.address2 && errors.address2 ?
                        (<div className="error-message">{errors.address2}</div>)
                        : null
                }
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        placeholder="City"
                        type="text"
                        name="city"
                        className={touched.city && errors.city ? "error" : ""}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {
                        touched.city && errors.city ?
                            (<div className="error-message">{errors.city}</div>)
                            : null
                    }
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        placeholder="State"
                        type="text"
                        name="state"
                        className={touched.state && errors.state ? "error" : ""}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {
                        touched.state && errors.state ?
                            (<div className="error-message">{errors.state}</div>)
                            : null
                    }
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        placeholder="Zip"
                        type="text"
                        name="zip"
                        className={touched.zip && errors.zip ? "error" : ""}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {
                        touched.zip && errors.zip ?
                            (<div className="error-message">{errors.zip}</div>)
                            : null
                    }
                </Form.Group>
            </Row>

            <Button variant="dark" type="submit" className="sign-up-button">
                Sign Up
            </Button>
        </Form>
    )}
        </Formik >
        <ToastNotification/>
        </div>
    );
}

const mapDispatchToProps = (dispatch : Dispatch) => ({
    showToast: (show: ToastState) => dispatch(setToastComp(show)),
});

export default connect(null, mapDispatchToProps)(SignUp);