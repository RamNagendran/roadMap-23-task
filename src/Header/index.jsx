import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import CartIcon from '../assets/cart.svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Rating } from 'react-simple-star-rating';


export default function Header({ cartItems }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Navbar expand="lg" className='header p-3 bg-body-tertiary' style={{ width: "100%" }} >
                <Container className='w-100'>
                    <Navbar.Brand>Amazon-Shopping</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/home">Home</Nav.Link>
                            <Nav.Link href="#/link">About</Nav.Link>
                            <NavDropdown title="Shop" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#/action/3.1">All Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#/action/3.2">
                                    Popular items
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#/action/3.3">New Arrivals</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Button onClick={() => setShow(true)} className='cart-btn' >
                    <img src={CartIcon} height={18} width={18} />
                    <span >Cart</span>
                    <div className='cart-counter' >{cartItems?.length}</div>
                </Button>
            </Navbar>
            <Offcanvas placement='end' show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>CART ITEMS</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartItems && cartItems.map((items, index) => {
                        return (
                            <div key={index} className="card m-2 p-2" style={{ width: "18rem" }}>
                                <img src={items?.image} className="card-img-top" height={250} alt="pro-image" />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{items?.title}</h5>
                                    <p className="card-text">{items?.category}</p>
                                    <div style={{ fontWeight: 800 }} >$ {items?.price}</div>
                                    <Rating readonly size={25} initialValue={items?.rating?.rate} />
                                </div>
                            </div>
                        )
                    })}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
