import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup, Badge, Card, Container, Button } from 'react-bootstrap';
import NavbarComponent from '../components/customer/NavbarComponent'
import { API_URL } from '../utils/API';
import { numberWithCommas } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [payTotal, setPayTotal] = useState('');
  const [payTotalString, setPayTotalString] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const submitPayTotal = async () => {
    const orders = {
      nama_pelanggan: carts[0].nama_pelanggan,
      no_meja: localStorage.getItem("table"),
      total_bayar: payTotal,
      pesanan: carts
    }

    //check localstorage
    if (typeof (Storage) !== "undefined") {
      console.log("local storage available");
    }
    else {
      console.log("Oops, your data will gone after page reload");
    }

    axios.post(`${API_URL}orders`, orders)
      .then(res => {
        swal({
          title: "Sukses",
          text: "Silahkan Lakukan Pembayaran pada Kasir",
          icon: "success",
          button: false,
          timer: 2000
        }).then(() => {
          navigate("/transaction")
        })
        getCart();
      })
  }

  const getCart = async () => {
    const nama_pelanggan = localStorage.getItem("hello");
    const response = await axios.get(`${API_URL}cart?nama_pelanggan=${nama_pelanggan}`);
    setCarts(response.data);
    const total = response.data.reduce(function (result, item) {
      return parseInt(result) + parseInt(item.total_harga);
    }, 0)
    setPayTotal(total);
    setPayTotalString(numberWithCommas(total));
  }


  return (
    <div className="m-5">
      <Card style={{ borderRadius: '10px', marginBottom: "100px" }} className="shadow mt-3">
        <Container>
          {carts.length !== 0 ? (
            <div>
              <div className="my-4 text-center" style={{ width: "100vw" }}>
              </div>

              <div style={{ minHeight: "60vh" }}>
                <ListGroup>
                  {carts.map((cart, index) => {
                    return (
                      <ListGroup.Item className="d-flex justify-content-between align-items-center" key={cart._id}>
                        <div className="left d-flex align-items-center">
                          <h4>
                            <Badge>
                              {cart.jumlah}
                            </Badge>
                          </h4>
                          <div className="produkHarga mx-3 d-flex flex-column justify-content-center align-middle ">
                            <h5>{cart.produk.nama}</h5>
                            <p>Rp. {numberWithCommas(cart.produk.harga)}</p>
                          </div>
                        </div>
                        <h5>Rp. {numberWithCommas(cart.total_harga)}</h5>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </div>
              <div className="my-3 d-flex justify-content-between">
                <h3>Total Bayar</h3>
                <h3>Rp. {payTotalString}</h3>
              </div>
              <div className="my-3">
                <Button className="w-100 bg-dark" onClick={() => submitPayTotal()}>Bayar</Button>
              </div>
            </div>
          ) : <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "84vh" }}>
            <h2>Keranjang Masih Kosong</h2>
          </div>}
        </Container>
      </Card>
      <NavbarComponent />
    </div>
  )
}

export default CartPage