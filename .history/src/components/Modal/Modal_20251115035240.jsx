import { useRef } from "react";
import NewForm from "../NewForm/NewForm";
import "./Modal.css";

function Modal({ btnLabel, btnClassName }) {
    const modalRef = useRef();

    function handleclick(e) {
        modalRef.current.showModal();
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
                <NewForm />
            </dialog>
        </>
    );
}
export default Modal;
