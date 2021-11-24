import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';
import './header.styles.scss';
import { Dispatch } from 'redux';
import { fetchIcreamStart } from '../../redux/icream/icream.action';
import { HeaderProps } from './header.types';

const Header = ({ getAllICream } : HeaderProps) => {
    const navigate = useNavigate();

    const cartIcon : IconBtnProps = {
        iconName : "cart3",
        btnName: "Cart",
        url: "/cart-items",
        disabled: false,
    };

    const signIn : IconBtnProps = {
        iconName: "person-check-fill",
        btnName: "Sign In",
        url: "/sign-in-up",
        disabled: false,
    }

    const handleSearchFormSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleEmptySearch = (e: any) => {
        const searchBar : any = document.getElementById("search-bar");
        if (searchBar && searchBar?.value === "" && getAllICream) {
            getAllICream("");
        }
    }

    const handleSearch = () => {
        const searchBar: any = document.getElementById("search-bar")
        const searchValue = searchBar? searchBar.value : "";
        if (getAllICream) {
            getAllICream(searchValue);
        }
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
                        <Form className="d-flex" onSubmit={handleSearchFormSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="search-bar"
                                aria-label="Search"
                                id="search-bar"
                                onChange={handleEmptySearch}
                            />
                            <Button variant="outline-light search-icon" onClick={handleSearch}><i className="bi bi-search"></i></Button>
                        </Form>
                        <div className="icon-btn-group">
                            <IconButton button={signIn} />
                            <IconButton button={cartIcon} />
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const mapDispatchToProps = (dispatch : Dispatch) => ({
    getAllICream: (search: string) => dispatch(fetchIcreamStart(search))
});

export default connect(null, mapDispatchToProps)(Header);