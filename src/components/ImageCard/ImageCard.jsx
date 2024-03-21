import css from './ImageCard.module.css';

const ImageCard = ({ small, regular, alt, openModal, modalDate }) => {
  const handleClick = () => {
    openModal();
    modalDate(regular, alt);
  };
  return (
    <div className={css.ImageCardWrap}>
      <img
        onClick={handleClick}
        className={css.ImageCardImg}
        src={small}
        alt={alt}
      />
    </div>
  );
};

export default ImageCard;
