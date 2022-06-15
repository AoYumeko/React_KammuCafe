import { Modal, Form, Button } from "react-bootstrap"
import React, { useState } from "react";
import axios from "axios";
import previewImagesLocal from "../../assets/images/preview.png";
import { API_URL } from "../../utils/API";


const ModalAddProduct = (props) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", parseInt(harga));
    formData.append("kategori", kategori);
    // formData.append("topping", topping);
    formData.append("gambar", gambar);

    try {
      await axios.post(`${API_URL}products/`, formData, {
        heeaders: {
          "Content-type": "multipart/form-data"
        }
      });
      setPreview(previewImagesLocal);
      props.handleClose();
      props.getProducts();
    }
    catch (error) {
      console.log("error.message");
    }
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    let newUrlImage = URL.createObjectURL(file);
    setGambar(file);
    setPreview(newUrlImage);
  }


  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} fullscreen={"md-down"} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" placeholder="Sate Ayam" onChange={(e) => setNama(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control type="number" placeholder="15,000" onChange={(e) => setHarga(e.target.value)} required />
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
                <option value="Seafood">Seafood</option>
                <option value="Lainnya">Lainnya</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              {preview ? <img
                src={preview}
                alt="previewImage"
                className="img-thumbnail w-100 mb-3"
              /> : <img
                src={previewImagesLocal}
                alt="previewImage"
                className="img-thumbnail w-100 mb-3"
              />}
              <Form.Label htmlFor="formImage">Upload Gambar</Form.Label>
              <Form.Control type="file" id="formImage" onChange={handleUploadImage} accept="image/*" required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-3 mb-3">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalAddProduct;