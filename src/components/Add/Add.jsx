import Modal from "../Modal/Modal";
import NewForm from "../NewForm/NewForm";
import "./Add.css";

function Add({ onAddRecipe }) {
  return (
    <Modal btnLabel="Add New Recipe!" btnClassName="button" onSubmit={onAddRecipe}>
      <NewForm />
    </Modal>
  );
}

export default Add;

