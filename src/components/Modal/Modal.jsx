import { useRef } from "react";
import "./Modal.css";

function Modal({ btnLabel, btnClassName, children, disabled }) {
  const modalRef = useRef();

  function handleClick(e) {
    if (disabled) return;
    modalRef.current.showModal();
  }

  return (
    <>
      <button
        className={btnClassName}
        onClick={handleClick}
        disabled={disabled}
      >
        {btnLabel}
      </button>

      <dialog ref={modalRef} className="modal">
        {children}
      </dialog>
    </>
  );
}
export default Modal;