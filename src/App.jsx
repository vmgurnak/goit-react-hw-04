import { useEffect, useState } from 'react';
import { requestImageByQuery } from './services/api';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';

const App = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  console.log(images);
  console.log(searchQuery);

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        const data = await requestImageByQuery(searchQuery);
        if (data.results.length === 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setImages(null);
          return;
        } else {
          setImages(data.results);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = query => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} />}
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
    </div>
  );
};

export default App;
