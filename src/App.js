import { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Loader from 'react-loader-spinner';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';


class App extends Component {
  static defaultProps = {
    initialShowModal: false,
    initialPictureName: '',
    initialLargeImageURL: '',
    initialPage: 1,
    initialStatus: 'idle',
  };

  static propTypes = {
    initialShowModal: PropTypes.bool.isRequired,
    initialPictureName: PropTypes.string.isRequired,
    initialLargeImageURL: PropTypes.string.isRequired,
    initialPage: PropTypes.number.isRequired,
    initialStatus: PropTypes.oneOf([
      'idle',
      'pending',
      'resolved',
      'rejected',
    ]),
  };

  state = {
    showModal: this.props.initialShowModal,
    pictureName: this.props.initialPictureName,
    largeImageURL: this.props.initialLargeImageURL,
    page: this.props.initialPage,
    status: this.props.initialStatus,
  };

  onLoadMore = () => {
    let { page } = this.state;
    this.setState({ page: page + 1, status: 'pending' });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName });
  };

  setStatus = status => this.setState({ status: status });

  render() {
    const {
      pictureName,
      showModal,
      largeImageURL,
      page,
      status,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          pictureName={pictureName}
          toggleModal={this.toggleModal}
          setModalImage={this.setModalImage}
          page={page}
          setStatus={this.setStatus}
        />

        {status === 'pending' && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={50}
            width={80}
            timeout={3000}
          />
        )}

        {status === 'resolved' && (
          <Button onClick={this.onLoadMore} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;