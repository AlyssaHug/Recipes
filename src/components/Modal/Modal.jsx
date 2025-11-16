import { useRef } from "react";
import NewForm from "../NewForm/NewForm";
import "./Modal.css";

function Modal({ btnLabel, btnClassName, onSubmit, disabled }) {
    const modalRef = useRef();

    function handleclick() {
        modalRef.current.showModal();
    }

    function handleClose() {
        modalRef.current.close();
    }

    function handleSubmit(recipeData) {
        onSubmit(recipeData);
        handleClose();
    }

    return (
        <>
            <button
                className={btnClassName}
                onClick={handleclick}
                disabled={disabled}
            >
                {btnLabel}
            </button>
            <dialog ref={modalRef} className='modal'>
                <button className="close-button" onClick={handleClose}>×</button>
                <NewForm onSubmit={handleSubmit} />
            </dialog>
        </>
    );
}

export default Modal;