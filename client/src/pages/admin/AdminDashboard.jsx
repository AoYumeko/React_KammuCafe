import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Accordion, Card, Col, Row, Button } from 'react-bootstrap';
import { numberWithCommas } from '../../utils/utils';
import { API_URL } from '../../utils/API';
import NavbarAdmin from '../../components/admin/NavbarAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [pesanans, setPesanans] = useState([]);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.get(`${API_URL}user/token`);
        setToken(response.data.accessToken);
        const decoded = jwtDecode(token);
        setName(decoded.username);
        setExpire(decoded.exp);
      }
      catch (error) {
        if (error.response) {
          navigate('/admin');
        }
      }
    }
    refreshToken();
    getPesanans();
  }, [name, pesanans, navigate, token]);

  const getPesanans = async () => {
    const response = await axios.get(`${API_URL}orders/`);
    await setPesanans(response.data);
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${API_URL}token`);
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  const confirmOrder = async (value) => {
    try {
      console.log(value._id);
      await axios.put(`${API_URL}orders/${value._id}`, {
        isBayar: true
      })
      getPesanans();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavbarAdmin />
      <main>
        <Container>
          <Accordion defaultActiveKey="0" style={{ marginTop: '90px' }}>
            <div className="d-flex flex-column align-items-center">
              <h4 className="text-center">Daftar Pesanan</h4>
              <hr className="w-25 text-center" style={{ height: "2px" }} />
            </div>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Belum Bayar</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Row style={{ display: "flex", justifyContent: "space-around" }}>
                    {pesanans.length !== 0 ? pesanans.map((item) => {
                      if (item.isBayar === false) {
                        return (
                          <Col md={4} key={item._id}>
                            <Card style={{ borderRadius: '10px', margin: '20px 0' }} className="shadow">
                              <Container>
                                <div className="customer text-center mt-3 d-flex flex-column" style={{ display: 'flex' }}>
                                  <p>id Transaksi: {item._id}</p>
                                  <p>No Meja: {item.no_meja}</p>
                                  <p>{item.pesanan[0].nama_pelanggan}</p>
                                </div>
                                <div className="customerOrder">
                                  <ul className="list-group m-1">
                                    {item.pesanan.map((ite, index) => {
                                      return (
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                          {ite.produk.nama}
                                          <span className="badge bg-primary rounded-pill">{ite.jumlah}</span>
                                        </li>
                                      )
                                    })
                                    }
                                  </ul>
                                </div>
                                <div className="customerOrderTotal my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p>Total Bayar : </p>
                                  <p>Rp. {numberWithCommas(item.total_bayar)}</p>
                                </div>
                                <div className="confirmOrder mt-2 mb-3">
                                  <Button style={{ width: "100%" }} onClick={() => confirmOrder(item)}>Konfirmasi</Button>
                                </div>
                              </Container>
                            </Card>
                          </Col>)
                      }
                      else {
                        return (null)
                      }
                    }) : <div>Pesanan Kosong</div>}
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="mt-5">
              <Accordion.Header>Sudah Bayar</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Row style={{ display: "flex", justifyContent: "space-around" }}>
                    {pesanans.length !== 0 ? pesanans.map((item) => {
                      if (item.isBayar === true) {
                        return (
                          <Col md={4} key={item._id}>
                            <Card style={{ borderRadius: '10px', margin: '20px 0' }} className="shadow">
                              <Container>
                                <div className="customer text-center mt-3 d-flex flex-column" style={{ display: 'flex' }}>
                                  <p>id Transaksi: {item._id}</p>
                                  <p>{item.pesanan[0].nama_pelanggan}</p>

                                </div>
                                <div className="customerOrder">
                                  <ul className="list-group m-1">
                                    {item.pesanan.map((ite, index) => {
                                      return (
                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={ite._id}>
                                          {ite.produk.nama}
                                          <span className="badge bg-primary rounded-pill">{ite.jumlah}</span>
                                        </li>
                                      )
                                    })
                                    }
                                  </ul>
                                </div>
                                <div className="customerOrderTotal my-3" style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p>Total Bayar : </p>
                                  <p>Rp. {numberWithCommas(item.total_bayar)}</p>
                                </div>
                                <div className="confirmOrder mt-2 mb-3">
                                  <button style={{ width: "100%" }} className="btn btn-success">{new Date(item.tanggal_bayar).toString()}</button>
                                </div>
                              </Container>
                            </Card>
                          </Col>)
                      }
                      else {
                        return (null)
                      }
                    }) : <div>Pesanan Kosong</div>}
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </main>
    </div>
  )
}

export default AdminDashboard