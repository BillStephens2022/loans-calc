
import React from "react";
import classes from "./modal.module.css";

// reusable pop-up modal component to render input forms to the user

interface ModalProps {
  onClose: () => void;
  content: React.ReactNode;
  title?: string,
}
const Modal: React.FC<ModalProps> = ({ onClose, content, title }) => {

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
