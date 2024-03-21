import './App.css';

import { useEffect, useState } from 'react';
import { requestImageByQuery } from './services/api';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false);
  const [isImages, setIsImages] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  console.log(currentPage);
  let perPage = 6;

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsError(false);
        setIsLoading(true);
        setIsLoadMoreBtn(false);
        // setIsImages(false);
        const data = await requestImageByQuery(
          searchQuery,
          currentPage,
          perPage
        );
        console.log(data);
        if (data.results.length === 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setImages([]);
          return;
        } else {
          setImages(prevImages => {
            return [...prevImages, ...data.results];
          });
          setIsImages(true);
          setIsLoadMoreBtn(
            data.total_pages && data.total_pages !== currentPage
          );
        }
      } catch (err) {
        setImages([]);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataByQuery();
  }, [searchQuery, currentPage, perPage]);

  const onSetSearchQuery = query => {
    setImages([]);
    setSearchQuery(query);
  };

  const onSetPage = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const modalDate = (img, alt) => {
    setModalImg(img);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      <section className="section">
        {isError && <ErrorMessage />}
        {isImages && (
          <ImageGallery
            images={images}
            openModal={openModal}
            modalDate={modalDate}
          />
        )}
        {isLoading && <Loader />}
        {isLoadMoreBtn && <LoadMoreBtn onSetPage={onSetPage} />}
      </section>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(157, 222, 255, 0.9)',
            color: '#000',
          },
        }}
      />
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalImg={modalImg}
        alt={modalAlt}
      />
    </div>
  );
};

export default App;
