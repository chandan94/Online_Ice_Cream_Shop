import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Button, Row, Col } from 'react-bootstrap';
import './log-in.styles.scss';

const LoginSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email address.')
        .required('Email is required.')
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
        .trim(),
    password: yup.string()
        .required('Password is required.'),
});

const LogIn = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={values => {
                console.log(values);
            }}>
            {({
                errors,
                touched,
                handleChange,
                handleBlur
            }) => (
                <Form className="log-in" onSubmit={(e) => { e.preventDefault(); }}>
                    <h3>Log In</h3>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className={touched.email && errors.email ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    touched.email && errors.email ?
                                        (<div className="error-message">{errors.email}</div>)
                                        : null
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password"
                                    placeholder="Password"
                                    className={touched.password && errors.password ? "error" : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}/>
                                {
                                    touched.password && errors.password ?
                                        (<div className="error-message">{errors.password}</div>)
                                        : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" className="log-in-button">
                                Log In
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default LogIn;
