import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import NavbarComponent from '../components/customer/NavbarComponent';
import axios from 'axios';
import { API_URL } from '../utils/API';
import swal from 'sweetalert';
import { numberWithCommas } from '../utils/utils';

const TransactionPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, [orders]);

    const getOrders =  async () => {
        const nama_pelanggan =  await localStorage.getItem("hello");
        const response =  await axios.get(`${API_URL}orders/${nama_pelanggan}`);
        if(response.data !== null) await setOrders(response.data);
    }

    const deleteOrder = async (id) => {
        swal({
            title: "Anda Yakin?",
            text: "^ ω ^",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        swal("Transaksi Berhasil dihapus!", {
                            icon: "success",
                            timer: 6000,
                            button: false
                        });
                        await axios.delete(`${API_URL}orders/${id}`)

                    }
                    catch (error) {
                        console.log(error.message);
                    }
                }
            })
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark flex-column" style={{ minHeight: "100vh", minWidth: "100%" }}>
                {orders.length !== 0 ? orders.map((order) => {
                    return <Card style={{ borderRadius: '10px', margin: "40px 0" }} className="shadow" key={order._id}>
                        <Container>
                            <div className="customer text-center mt-3" style={{ width: "70vw" }}>
                                <h2>Status Pesanan</h2>
                                <div className="customerOrderTotal d-flex flex-column" style={{ display: "flex", justifyContent: "center", fontSize: "20px", fontWeight: 900 }}>
                                    <p> Rp. {numberWithCommas(order.total_bayar)}</p>
                                    {order.isBayar ? <FontAwesomeIcon icon={faCheckCircle} size="2x" color="green" /> : <FontAwesomeIcon icon={faXmarkCircle} size="2x" color="red" />}
                                </div>
                                {order.isBayar ? <p className="mt-3">Sudah Dibayar</p> : <p className="mt-3">Belum Dibayar</p>} 
                            </div>

                            <div className="customerOrder">
                                <ul className="list-group m-1">
                                    <ul className="list-group">
                                        {order.pesanan.map((pesanan) => {
                                            return (
                                                <li key={pesanan._id}className="list-group-item d-flex justify-content-between align-items-center">
                                                    {pesanan.produk.nama}
                                                    <span className="badge bg-dark rounded-pill">{pesanan.jumlah}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ul>
                            </div>
                            {order.isBayar ? <div style={{marginBottom: "20px"}}></div> : <Button className="btn btn-danger w-100 my-3" onClick={() => deleteOrder(order._id)}>Batalkan Pesanan</Button>}
                        </Container>
                    </Card>
                }) : <h1 style={{color: '#FFF'}}>Transaksi Kosong</h1>}
            </div>
            <div className="mb-5"></div>
            <NavbarComponent />
        </>
    )
}

export default TransactionPage