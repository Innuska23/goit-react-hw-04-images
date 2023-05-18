import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ModalImg, ModalStyle, Overlay } from './Modal.styled';
function Modal({ onClose, children, imgData }) {
    useEffect(() => {
        function handleClose(e) {
            if (e.code === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleClose);
        return () => {
            window.removeEventListener('keydown', handleClose);
        };
    }, [onClose]);

    const clickBackdrop = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <Overlay onClick={clickBackdrop}>
            <ModalStyle>{children}
                <ModalImg src={imgData.largeImageURL} alt={imgData.tags} />
            </ModalStyle>
        </Overlay>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    imgData: PropTypes.shape({
        largeImageURL: PropTypes.string,
        tags: PropTypes.string
    }).isRequired,
};

export default Modal;