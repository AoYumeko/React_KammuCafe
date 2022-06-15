import React from 'react'
import { Button, Container } from 'react-bootstrap'
import HeaderComponent from '../components/customer/HeaderComponent'
import NavbarComponent from '../components/customer/NavbarComponent'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const logOut = () => {
    swal({
      title: "Anda Yakin Keluar?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            localStorage.clear();
            navigate("/");
          }
          catch (error) {
            console.log(error.message);
          }
        }
      })
  }
  return (
    <div>
      <HeaderComponent />
      <Container>
        <Button className="btn btn-danger w-100" onClick={() => logOut()}>Log Out</Button>
      </Container>
      <NavbarComponent />
    </div>
  )
}

export default UserProfile