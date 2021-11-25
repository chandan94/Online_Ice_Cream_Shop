import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from '../../redux/cart/cart.selector';



import './header.styles.scss';
import { Dispatch } from 'redux';
import { fetchIcreamStart } from '../../redux/icream/icream.action';
import { HeaderProps } from './header.types';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const Header = ({ getAllICream }: HeaderProps, { itemCount }: any) => {
    const navigate = useNavigate();
    console.log(itemCount);
    const cartIcon: IconBtnProps = {
        iconName: "cart3",
        btnName: "Cart",
        url: "/cart-items",
        quantity: itemCount,
        disabled: false
    };


    const signIn: IconBtnProps = {
        iconName: "person-check-fill",
        btnName: "Sign In",
        url: "/sign-in-up",
        quantity: 0,
        disabled: false,
    }

    const handleSearchFormSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleEmptySearch = (e: any) => {
        const searchBar: any = document.getElementById("search-bar");
        if (searchBar && searchBar?.value === "" && getAllICream) {
            getAllICream("", "");
        }
    }

    const handleSearch = (evt: any) => {
        const searchBar: any = document.getElementById("search-bar")
        const searchValue = searchBar ? searchBar.value : "";
        const dropdown: any = document.getElementById("flavor-filter");
        const dropdownValue = dropdown ? dropdown.value : "";
        if (getAllICream) {
            console.log("In here");
            getAllICream(searchValue, dropdownValue);
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
                        <select id="flavor-filter" className="form-select form-select-lg" aria-label=".form-select-lg example" onChange={handleSearch}>

                            <option selected value="" >Flavor Filter</option>

                            <option value="drama" >Drama</option>

                            <option value="adventure">Adventure</option>

                            <option value="comedy">Comedy</option>

                            <option value="fantasy">Fantasy</option>

                            <option value="scifi">Sci-fi</option>

                        </select>

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllICream: (search: string, flavor: string) => dispatch(fetchIcreamStart(search, flavor)),
    itemCount: selectCartItemsCount
});

export default connect(null, mapDispatchToProps)(Header);
