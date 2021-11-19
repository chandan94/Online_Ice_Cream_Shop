import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';


import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';
import './header.styles.scss';

const Header = () => {
    const navigate = useNavigate();

    const cartIcon : IconBtnProps = {
        iconName : "cart3",
        btnName: "Cart",
        url: "/cart-items",
    };

    const signIn : IconBtnProps = {
        iconName: "person-check-fill",
        btnName: "Sign In",
        url: "/sign-in-up"
    }

    const handleNavSelect = (selectedKey: string | null) => navigate(selectedKey ? selectedKey : "", { replace: true });

    return (
        <Navbar className="header" bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="" onClick={() => { navigate("/") }}>Ice-Cream Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav onSelect={handleNavSelect} id="ice-cream-nav" className="me-auto justify-content-center">
                        <Nav.Link href="" eventKey="/menu" >Menu</Nav.Link>
                        {/* <Nav.Link href="#"></Nav.Link> */}
                        <Nav.Link href="" eventKey="/contact">Contact Us</Nav.Link>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="search-bar"
                                aria-label="Search"
                            />
                            <Button variant="outline-light search-icon"><i className="bi bi-search"></i></Button>
                        </Form>
                        <div className="icon-btn-group">
                            {/* <Link to="/sign-in-up" > */}
                                <IconButton button={signIn} />
                            {/* </Link> */}
                            <IconButton button={cartIcon} />
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;