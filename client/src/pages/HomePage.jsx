import React, { useEffect, useState } from "react";
import { Row, Container, Button, Modal, Form } from "react-bootstrap"
import DishCategoryComponent from "../components/customer/HomePageComponents/DishCategoryComponent";
import DishMenuComponent from "../components/customer/HomePageComponents/DishMenuComponent";
import HeaderComponent from "../components/customer/HeaderComponent";
import NavbarComponent from "../components/customer/NavbarComponent";
import swal from 'sweetalert';
import axios from "axios";
import { API_URL } from "../utils/API";

const HomePage = () => {
    const [listMenus, setListMenus] = useState([]);
    const [choosedCategory, setChoosedCategory] = useState("Semua");
    const [tableNumber, setTableNumber] = useState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        (localStorage.getItem("hello") === null ? setShow(true) : setShow(false));
        getProducts(choosedCategory);
    }, [choosedCategory])

    //dapatkan List Menu
    const getProducts = async (value) => {
        try {
            if (value === "Semua" || value === null) {
                const response = await axios.get(`${API_URL}products`);
                setListMenus(response.data);
            }
            else {
                const response = await axios.get(`${API_URL}products/category?nama=${value}`);
                setListMenus(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //ganti kategori
    const changeCategory = (value) => {
        setChoosedCategory(value);
        getProducts(value);
    }

    //masukkan ke keranjang
    const insertToCart = (value) => {
        axios
            .get(`${API_URL}cart/${value._id}`)
            .then(res => {
                if (res.data.length === 0) {
                    const cartData = {
                        nama_pelanggan: localStorage.getItem("hello"),
                        jumlah: 1,
                        produk: value,
                        total_harga: value.harga
                    }
                    axios
                        .post(`${API_URL}cart/`, cartData)
                        .then((res) => {
                            swal({
                                title: value.nama,
                                text: "Sukses Masuk Keranjang",
                                icon: "success",
                                button: false,
                                timer: 2000
                            })
                        })
                        .catch((error) => {
                            console.log("error" + error);
                        })
                }
                else {
                    const cartData = {
                        jumlah: res.data[0].jumlah + 1,
                        produk: value,
                        total_harga: res.data[0].total_harga + value.harga
                    }
                    axios
                        .put(`${API_URL}cart/${res.data[0]._id}`, cartData)
                        .then(res => {
                            swal({
                                title: value.nama,
                                text: "Ditambahkan lagi ke Keranjang",
                                icon: "success",
                                button: false,
                                timer: 2000
                            })
                        })
                        .catch((error) => {
                            console.log("error" + error);
                        })
                }
            })
    }

    //Menyimpan nama pelanggan di local browser
    const [customerName, setCustomerName] = useState("");
    const saveUserInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}customer`, {
                nama: customerName
            })
            await localStorage.setItem("hello", customerName);
            await localStorage.setItem("table", tableNumber);
            if (response.data) setShow(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavbarComponent />
            <HeaderComponent />
            <main>
                <Container>
                    <div className="dishContainer mt-3 mb-5">
                        <DishCategoryComponent changeCategory={changeCategory} choosedCategory={choosedCategory} />

                        <div className="dishMenu">
                            <Row>
                                {listMenus && listMenus.map((listMenu) => {
                                    return <DishMenuComponent
                                        key={listMenu._id}
                                        listMenu={listMenu}
                                        insertToCart={insertToCart} />
                                })}
                            </Row>
                        </div>
                    </div>
                </Container>
            </main>

            <Modal show={show} backdrop="static" keyboard={false} centered>
                {/* <Modal.Header >
                    <Modal.Title>Selamat Datang di Website Pemesanan Kammu Cafe</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <Form onSubmit={saveUserInfo}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Masukkan Nama Anda</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setCustomerName(e.target.value)}
                                value={customerName}
                                autoFocus
                                required
                            />
                            <Form.Label>Masukkan No Meja</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setTableNumber(e.target.value)}
                                value={tableNumber}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ width: "100%" }}>Simpan Nama</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default HomePage