import css from './ImageCard.module.css';

const ImageCard = ({ small, regular, openModal, modalImage }) => {
  const handleClick = () => {
    openModal();
    modalImage(regular);
  };
  return (
    <div className={css.ImageCardWrap}>
      <img
        onClick={handleClick}
        className={css.ImageCardImg}
        src={small}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
