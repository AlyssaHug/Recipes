import Modal from "./Modal/Modal";

function Add({ onAddRecipe }) {
return (
<div>
    <Modal btnLabel="Add New Recipe!" btnClassName="button" onSubmit={onAddRecipe}>Add New Recipe!</Modal>
</div>
);
}

export default Add;
