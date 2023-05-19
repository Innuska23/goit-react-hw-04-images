import {useState } from 'react';

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './ImageGallery/ImageGalleryItem/Modal/Modal';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App () {
  const [modalImg, setModalImg] = useState({largeImageURL: '', tags: ''})
  const [searchQuery, setSearchQuery] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  
  const handlerSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const hideModal = () => {
    setIsShowModal(false)
  }

  const showModal = ({ largeImageURL, tags }) => {
    setModalImg({ largeImageURL, tags });
    setIsShowModal (true);
  }

    return (
      <div>
        <Searchbar onSubmit={handlerSubmit} />
        <ImageGallery searchQuery={searchQuery} showModal={showModal} />
        {isShowModal && <Modal imgData={modalImg} onClose={hideModal} />}
        <ToastContainer position='top-center'/>
      </div>
    );
  };

  export default App;