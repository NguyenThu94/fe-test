import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/Auth";
import { getAllProducts, deleteProduct, updateProduct } from "../api/axios";
import Pagination from "../components/Pagination";
import EditModal from "../components/EditModal";
import useModal from "../hooks/useModal";

import logo from '../assets/images/logo.png';
import updateIcon from '../assets/icons/update.svg';
import deleteIcon from '../assets/icons/delete.svg';

const Profile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const { showModal, handleHideModal, handleShowModal } = useModal();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const productsPerPage = 10;

  useEffect(() => {
    getAllProducts().then(json => setProducts(json))
  }, [])

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products?.slice(firstProductIndex, lastProductIndex) || [];
  const currentSearchedProducts = searchedProducts?.slice(firstProductIndex, lastProductIndex) || [];

  useEffect(() => {
    if (searchQuery) {
      const searched = setTimeout(() => {
        setSearchedProducts(
          products.filter((product) => {
            return product.title
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase())
          })
        )
      }, 1000);
      return () => clearTimeout(searched)
    } else {
      setProducts(products)
    }
  }, [searchQuery])

  const handleDeleteProduct = id => {
    deleteProduct(id).then(res => {
      console.log('Delete success!');
      const updatedProducts = products.filter(product => product.id !== id)
      const updatedSearchedProducts = searchedProducts.filter(product => product.id !== id)
      setProducts(updatedProducts);
      setSearchedProducts(updatedSearchedProducts)
    })
  }

  const handleUpdateProduct = () => {
    updateProduct(updatedProduct.id, updatedProduct).then(res => {
      console.log('Update success!');
      const updatedProducts = products.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        }
        return product
      })

      const updatedSearchedProducts = searchedProducts.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        }
        return product
      })
      setProducts(updatedProducts);
      setSearchedProducts(updatedSearchedProducts)
    })
  }

  const handleShowEditModal = (product) => {
    handleShowModal();
    setUpdatedProduct(product)
  }

  const handleLogout = () => {
    Cookies.remove('token');
    setUser({});
    navigate("/");
  }

  return (
    <div className="container-profile">
      <div className="site-profile">
        <div className="left">
          <Link className="profile-image" to='/'>
            <img src={logo} alt="logo" />
          </Link>
          <div className="navigation">
            <ul>
              <li>Order</li>
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <input type="text" placeholder="25/2/2002" disabled className="profile-input date" />
            <input
              type="text"
              placeholder="Search name"
              className="profile-input filter-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="content">
            {
              searchQuery.length > 0 ? (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentSearchedProducts.map((product, index) => (
                          <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                              <div className="table-actions">
                                <span onClick={() => handleShowEditModal(product)}>
                                  <img src={updateIcon} alt="update" />
                                </span>
                                <span onClick={() => handleDeleteProduct(product.id)}>
                                  <img src={deleteIcon} alt="delete" />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalProducts={searchedProducts.length}
                    productsPerPage={productsPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentProducts.map((product, index) => (
                          <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                              <div className="table-actions">
                                <span onClick={() => handleShowEditModal(product)}>
                                  <img src={updateIcon} alt="update" />
                                </span>
                                <span onClick={() => handleDeleteProduct(product.id)}>
                                  <img src={deleteIcon} alt="delete" />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalProducts={products.length}
                    productsPerPage={productsPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )
            }
          </div>
          {
            showModal && <EditModal
              handleHideModal={handleHideModal}
              updatedProduct={updatedProduct}
              setUpdatedProduct={setUpdatedProduct}
              handleUpdateProduct={handleUpdateProduct}
            />
          }

        </div>
      </div>
    </div>
  )
}

export default Profile
