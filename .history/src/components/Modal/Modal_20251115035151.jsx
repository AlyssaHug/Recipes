import { useRef } from "react";
import NewForm from "../NewForm/NewForm";
import "./Modal.css";

function Modal({ btnLabel, btnClassName, onSubmit }) {
    const modalRef = useRef();

    function handleclick(e) {
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
                onClick={handleclick}>
                {" "}
                {btnLabel}{" "}
            </button>
            <dialog
                ref={modalRef}
                className='modal'>
                <NewForm onSubmit={handleSubmit} onClose={handleClose} />
            </dialog>
        </>
    );
}
export default Modal;
