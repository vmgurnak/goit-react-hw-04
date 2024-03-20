import Modal from 'react-modal';

const ImageModal = ({ modalIsOpen, closeModal, modalImg }) => {
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <img src={modalImg} alt="" />
      </Modal>
    </div>
  );
};

export default ImageModal;
