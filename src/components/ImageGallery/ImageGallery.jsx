import { useState, useEffect } from 'react';

import GalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Item, Wrap, Text } from './ImageGallery.styled';
import Loader from './ImageGalleryItem/Loader/Loader';

import getImages from '../services/api'
import LoadMoreBtn from './ImageGalleryItem/Button/Button';

function ImageGallery({ showModal, searchQuery }) {
  const [imageList, setImageList] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)

  const fetchImages = (searchQuery, page) => getImages(searchQuery, page)
    .then(data => {
      setImageList((hue) => hue.concat(data.hits));
      setTotalPage(data.totalPage);
      setStatus('resolved')
    })
    .catch(error => { setError(error); setStatus('rejected') });

  useEffect(() => {
    if (!searchQuery) return

    setImageList([]);
    setPage(1);
    setStatus('pending')

    fetchImages(searchQuery, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) return;

    setStatus('pending')
    fetchImages(searchQuery, page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlerBtnClick = (e) => {
    setPage(
      page + 1,
    );
  };

  if (status === 'idle') {
    return <Text>Enter a search query</Text>;
  }

  if (status === 'pending' && imageList.length === 0) {
    return <Loader visible />;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  return (
    <Wrap>
      {imageList.length === 0 && <Text>Nothing was found for this query</Text>}
      <Item>
        {imageList.map(({ id, webformatURL, tags, largeImageURL }) => (
          <GalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            openModal={() => showModal({ largeImageURL, tags })} />
        ))}
      </Item>

      {page < totalPage && <LoadMoreBtn isLoading={status === 'pending'} onClick={handlerBtnClick} />}
    </Wrap>
  );
}


export default ImageGallery;