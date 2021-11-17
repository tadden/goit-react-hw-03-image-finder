import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';


export default function ImageGalleryItem({
  pictures,
  onClick,
}) {
  return (
    <>
      {pictures.map(({ id, webformatURL }) => (
        <li className={s.item} key={id}>
          <img
            id={id}
            src={webformatURL}
            alt=""
            onClick={onClick}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};