import { useRef } from "react";
import "./Modal.css";

function Modal({ btnLabel, btnClassName, children, disabled }) {
    const modalRef = useRef();

    const openModal = () => modalRef.current.showModal();
    const closeModal = () => modalRef.current.close();

    const handleSubmit = (data) => {
        const form = modalRef.current.querySelector("form");
        if (form && form.onsubmit) {
            form.onsubmit({ preventDefault: () => {} }); 
        }
        closeModal();
    };

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
                    {children}
                </div>
            </dialog>
        </>
    );
}

export default Modal;