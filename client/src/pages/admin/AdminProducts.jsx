import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalAddProduct from "../../components/admin/ModalAddProduct";
import ModalEditProduct from "../../components/admin/ModalEditProduct";
import swal from "sweetalert";
import { numberWithCommas } from "../../utils/utils";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { API_URL } from "../../utils/API";

const AdminProducts = () => {
  const [products, setProducts] = useState("");

  //Modal Box
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (product) => {
    setShowEdit(true);
    setEditProduct(product);
    // console.log(product);

  }
  //End Modal Box

  const getProducts = useCallback(async () => {
    try {
      await axios.get(API_URL + "products/")
        .then(res => setProducts(res.data));
    }
    catch (error) {
      console.log(error.message);
    }
  }, []);

  const deleteProduct = async (id) => {
    swal({
      title: "Anda Yakin?",
      // text: "Once deleted, you wil not be able to recover this imanginary file!",
      text: "^ ω ^",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            await axios.delete(API_URL + "products/" + id)
            swal("Produk Berhasil dihapus!", {
              icon: "success",
              timer: 3000,
              button: false
            });
            getProducts();
          }
          catch (error) {
            console.log(error.message);
          }
        }
      })
  }

  useEffect(() => {
    getProducts();
  }, [products, getProducts]);

  return (
    <div>
      <NavbarAdmin />

      <div className="container mt-5" style={{ marginBottom: "100px" }}>
        <div className="row justify-content-center">
          <div className=" col-md-12 mt-4 text-center">
            <h2 className="my-3">MENU LIST</h2>
            <Button className="w-100" onClick={handleShowAdd}>Tambah Produk</Button>
            <Table bordered hover className="text-center my-3 align-middle">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Gambar</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {(!products) ? (<tr>
                  <td>
                    Sedang Loading...
                  </td>
                </tr>) :
                  products && products.map((product, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>
                        <img src={API_URL + "images/" + product.gambar} alt="gambarProduk" className="img-thumbnail" style={{ width: "500px", marginRight: -100, marginLeft: -100 }} />
                      </td>
                      <td>{product.nama}</td>
                      <td>Rp. {numberWithCommas(product.harga)}</td>
                      <td>{product.kategori}</td>
                      <td>
                        <Button className="btn btn-primary" onClick={() => handleShowEdit(product)}>Edit</Button>
                        &emsp;
                        <Button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Hapus</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>

            </Table>
          </div>
        </div>

        <ModalEditProduct show={showEdit} handleClose={handleCloseEdit} product={editProduct} getProducts={getProducts} />
        {/* Modal */}
        <ModalAddProduct show={showAdd} handleClose={handleCloseAdd} getProducts={getProducts} />
        {/* EndModal */}

      </div>
    </div>
  )
}

export default AdminProducts;