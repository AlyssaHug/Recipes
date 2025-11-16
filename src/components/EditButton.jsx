
import Modal from "./Modal/Modal";
import NewForm from "./NewForm/NewForm";

function EditButton({
  recipes,
  setRecipes,
  selectedRecipeId,
  setSelectedRecipeId,
}) {
  const selectedRecipe = recipes.find((r) => r.idMeal === selectedRecipeId);

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.idMeal === selectedRecipeId ? updatedRecipe : r))
    );
    setSelectedRecipeId(null);
  };

  return (
    <Modal
      btnLabel="Edit"
      btnClassName="edit"
      disabled={!selectedRecipe}
      onSubmit={handleUpdate}
    >
      {selectedRecipe && <NewForm recipe={selectedRecipe} />}
    </Modal>
  );
}

export default EditButton;