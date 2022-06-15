import { Modal, Form, Button } from "react-bootstrap"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/API";

const ModalEditProduct = (props) => {
  const [_id, set_id] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");
  
  useEffect(() => {
    const valueFill = async () => {
      await set_id(props.product._id);
      await setNama(props.product.nama);
      await setHarga(props.product.harga);
      await setKategori(props.product.kategori);
      await setPreview(`${API_URL}images/${props.product.gambar}`);
    }
    valueFill();
  }, [props.product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("kategori", kategori);
    formData.append("gambar", gambar);

    try {
      await axios.patch(`${API_URL}products/${_id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });
      props.handleClose();
      props.getProducts();
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    let newUrlImage = URL.createObjectURL(file);
    setGambar(file);
    setPreview(newUrlImage);
  }

  return (
    (_id && <Modal show={props.show} onHide={props.handleClose} fullscreen={"md-down"} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga</Form.Label>
            <Form.Control type="number" value={harga} onChange={(e) => {
              setHarga(parseInt(e.target.value))
            }} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Cemilan">Cemilan</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <img
              src={preview}
              alt="previewImg"
              className="img-thumbnail w-100 mb-3"
            />
            <Form.Label htmlFor="formImage">Upload Gambar</Form.Label>
            <Form.Control type="file" onChange={handleUploadImage} accept="image/*" />
          </Form.Group>

          <Button type="submit" className="w-100 mt-3 mb-3">Simpan</Button>

        </Form>
      </Modal.Body>
    </Modal>)
  )
}

export default ModalEditProduct;