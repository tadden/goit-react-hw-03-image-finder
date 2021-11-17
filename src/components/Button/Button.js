import propTypes from 'prop-types';
import s from './Button.module.css';


 function Button({ onClick }) {
  return (
    <button
      type="button"
      className={s.button}
      onClick={onClick}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;