import css from './ImageCard.module.css';

const ImageCard = ({ small, regular }) => {
  return (
    <div className={css.ImageCardWrap}>
      <img className={css.ImageCardImg} src={small} alt="" />
    </div>
  );
};

export default ImageCard;
