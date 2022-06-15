import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/API';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    }, [username, password])

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}user/login`, {
                username: username,
                password: password
            })
            navigate('/admin/transactions');
        }
        catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <div className="bg-secondary">
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }} >
                <Card style={{ width: '18rem', boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.1)', borderRadius: '20px', background: 'rgba(33, 37, 41, 0.7)'}} className="text-white" >
                    <Card.Body>
                        <h3 className="text-center">Kammu Cafe</h3>
                        <Form onSubmit={login}>
                            <p className="text-danger text-center" style={{fontWeight: 800}}>{msg}</p>
                            <Form.Group className="my-3 mt-4">
                                <Form.Control type="text" placeholder="username" onChange={(e) => {
                                    setUsername(e.target.value)
                                    setMsg("")
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="password" onChange={(e) => {
                                    setPassword(e.target.value);
                                    setMsg("");
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex justify-content-center">
                                <Button type="submit" className="w-100">LOGIN</Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default LoginComponent