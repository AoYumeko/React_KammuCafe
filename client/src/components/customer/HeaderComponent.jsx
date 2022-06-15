import React from 'react';
import { Container } from "react-bootstrap";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const user = localStorage.getItem("hello");
    const navigate = useNavigate();

    const profilePage = () => {
        navigate("/user/profile");
    }
    return (
        <Container>
            <header className=" d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                        <p style={{ fontSize: '20px', fontWeight: 'normal' }}>Hi, <span style={{ fontSize: '25px', fontWeight: '800' }}>{user}</span></p>
                        <p style={{ fontSize: "17px", fontWeight: 'normal', margin: "-20px 0" }}>Mau makan apa hari ini ?</p>
                </div>
                <FontAwesomeIcon icon={faUserCircle} size="3x" className="mt-3" onClick={() => profilePage()}/>
            </header>
            <hr />
        </Container>
    )
}

export default HeaderComponent