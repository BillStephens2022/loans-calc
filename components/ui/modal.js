
import classes from "./modal.module.css";

const Modal = ({ onClose, content, title }) => {

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
      <div className={classes.titleBar}>
        <h2 className={classes.title}>{title}</h2>
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        </div>
        <div className={classes.modalContent}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
