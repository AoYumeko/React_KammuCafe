import React, { useState, useEffect } from 'react'
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../utils/API';

const AdminRegister = () => {
    const navigate = useNavigate('/');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        console.log(username);
        console.log(password);
        console.log(confirmPassword);
    }, [username, password, confirmPassword])

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}user/register/`, {
                username: username,
                password: password,
                confirmPassword: confirmPassword
            });
            navigate('/admin');
        }
        catch (error) {
            console.log(error.message);
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }} >
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Form onSubmit={Register}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-center">
                            <Button type="submit" className="w-100">Daftar</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AdminRegister;