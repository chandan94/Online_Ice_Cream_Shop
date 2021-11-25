import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Button, Row, Col } from 'react-bootstrap';
import './sign-up.styles.scss';
import axios from 'axios';
var bcrypt = require('bcryptjs');


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
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g),
    password: yup.string()
        .required()
        .min(8, "Password should be of 8 characters at least.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
    confirm: yup.string()
        .required("Re-enter password.")
        .oneOf([yup.ref("password")], 'Passwords do not match.'),
    phoneNumber: yup.string()
        .optional()
        // eslint-disable-next-line no-useless-escape
        .matches(/(?:1?|\+1|\+\s1|\(?)(?:\(?|\s\(|[\.\-\s])\d{3}(?:\)?|\)\s|[\.\-\s])\d{3}[\.\-\s]\d{4}/g),
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
        .required("Zip code is required")
        .min(6, "Zip code should be of minimum 6 digits."),
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
const SignUp = () => {
    const width = window.outerWidth;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashdPwd=bcrypt.hashSync(values.password,salt);

                const url = '/api/customer/';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: hashdPwd,
                        phoneNumber: values.phoneNumber,
                        address1: values.address1,
                        address2: values.address2,
                        city: values.city,
                        state: values.state,
                        zip: values.zip
                    })
                };
                axios.post(url, requestOptions)
                .then((resp: { status: number; }) =>  {
                    if (resp.status === 200) {
                        console.log(resp);
                    }
                })
                .catch((err: any) => console.error(err));
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
            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Log me in" />
            </Form.Group>
            <Button variant="dark" type="submit" className="sign-up-button">
                Sign Up
            </Button>
        </Form>
    )}
        </Formik >
    );
}

export default SignUp;