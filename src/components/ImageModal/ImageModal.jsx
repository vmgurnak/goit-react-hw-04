import Modal from 'react-modal';

import css from './ImageModal.module.css';

const ImageModal = ({ modalIsOpen, closeModal, modalImg }) => {
  return (
    <div>
      <Modal
        className={css.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <img className={css.modalImg} src={modalImg} alt="" />
      </Modal>
    </div>
  );
};

export default ImageModal;
