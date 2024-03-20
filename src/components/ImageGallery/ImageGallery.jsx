import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, openModal, modalImage }) => {
  return (
    <div className={css.imageGalleryContainer}>
      <ul className={css.imageGalleryList}>
        {images !== null &&
          Array.isArray(images) &&
          images.map(({ id, urls: { small, regular } }) => {
            return (
              <li className={css.imageGalleryItem} key={id}>
                <ImageCard
                  small={small}
                  regular={regular}
                  openModal={openModal}
                  modalImage={modalImage}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
