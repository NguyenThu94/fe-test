import { useState } from 'react';

const useModal = () => {

  const [showModal, setShowModal] = useState(false);

  const handleHideModal = () => {
    setShowModal(false);
  }

  const handleShowModal = () => {
    setShowModal(true);
  }
  return {
    showModal,
    handleHideModal,
    handleShowModal
  }
};

export default useModal;
