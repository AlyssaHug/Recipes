import { useRef, cloneElement, isValidElement } from "react";
import "./Modal.css";

function Modal({ btnLabel, btnClassName, children, disabled, onSubmit }) {
    const modalRef = useRef();

    const openModal = () => modalRef.current.showModal();
    const closeModal = () => modalRef.current.close();

    // Clone children and pass onSubmit and closeModal props
    const childrenWithProps = isValidElement(children)
        ? cloneElement(children, { onSubmit, closeModal })
        : children;

    return (
        <>
            <button
                className={btnClassName}
                onClick={openModal}
                disabled={disabled}
            >
                {btnLabel}
            </button>

            <dialog ref={modalRef} className="modal">
                <button className="close-button" onClick={closeModal}>
                    x
                </button>
                <div className="modal-content">
                    {childrenWithProps}
                </div>
            </dialog>
        </>
    );
}

export default Modal;