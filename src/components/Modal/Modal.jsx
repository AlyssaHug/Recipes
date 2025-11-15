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
                <button className="close-button" onClick={handleClose}>×</button>
                <NewForm onSubmit={handleSubmit} />
            </dialog>
        </>
    );
}
export default Modal;
