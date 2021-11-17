import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import fetchImages from '../API/ImageApi';

 class ImageGallery extends Component {
  state = {
    pictures: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const nextName = this.props.pictureName;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      fetchImages(nextName, 1)
        .then(pictures => {
          this.setState({
            pictures: pictures.hits,
            status: 'resolved',
          });
          this.props.setStatus(this.state.status);
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          this.props.setStatus(this.state.status);
          toast.error(error.message);
        });
    }

    if (prevPage !== nextPage) {
      fetchImages(nextName, this.props.page)
        .then(pictures => {
          this.setState({
            pictures: [
              ...prevState.pictures,
              ...pictures.hits,
            ],
            status: 'resolved',
          });
          this.props.setStatus(this.state.status);
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          this.props.setStatus(this.state.status);
        });
    }
  }

  handleImageClick = e => {
    const { pictures } = this.state;
    const currentPicture = pictures.find(
      picture => picture.id === Number(e.currentTarget.id),
    );
    if (currentPicture) {
      this.props.toggleModal();
      this.props.setModalImage(
        currentPicture.largeImageURL,
      );
    }
  };

  render() {
    const { pictures, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return (
        <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={50}
          width={80}
          timeout={3000}
        />
      );
    }

    if (status === 'rejected') {
      return <p>No images</p>;
    }

    if (status === 'resolved') {
      return (
        <ul className={s.gallery}>
          <ImageGalleryItem
            pictures={pictures}
            onClick={this.handleImageClick}
          />
        </ul>
      );
    }
  }
}


ImageGallery.propTypes = {
    page: PropTypes.number.isRequired,
    pictureName: PropTypes.string.isRequired,
    setModalImage: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
};
  
export default ImageGallery;