import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/API';
import axios from 'axios';

const NavbarAdmin = () => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await axios.delete(`${API_URL}user/logout`);
            navigate('/admin');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/" className="text-center" style={{ fontWeight: 900 }}>Kammu Cafe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin/transactions">Transaksi</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products">Atur Produk</Nav.Link>
                    </Nav>
                    <Nav clasName="me-auto">
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarAdmin