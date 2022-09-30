import React from 'react'
import closeIcon from '../assets/icons/close.svg'
import '../assets/css/Modal.css'

const EditModal = ({ handleHideModal, updatedProduct, setUpdatedProduct, handleUpdateProduct }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) =>{
      return  { ...prev, [name] : value}
    })
  }

  const handleSubmit = () => {
    handleUpdateProduct();
    handleHideModal();
  }

  return (
    <div className="site-modal">
      <div className="btn btn-close-modal" onClick={handleHideModal}>
        <img src={closeIcon} alt="close icon" />
      </div>
      <div className="site-modal-wrapper">
        <div className="site-modal-header">
          <div className="title">Update Product</div>
        </div>
        <div className="site-modal-body">
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              value={updatedProduct.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Description</label>
            <input
              type="text"
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
            />
          </div>
          <div className='btn-confirm-wrapper'>
            <button onClick={handleSubmit} className="btn-confirm">Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
