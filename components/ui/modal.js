
import classes from "./modal.module.css";

const Modal = ({ isOpen, onClose, content, title }) => {

    const handleCloseModal = (event) => {
        const modalContent = document.querySelector(`.${classes.modalContent}`);
        if (!modalContent.contains(event.target)) {
            onClose();
        }
    };

    if (!isOpen) return null;


  return (
    <div className={classes.modalOverlay} onClick={handleCloseModal}>
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
