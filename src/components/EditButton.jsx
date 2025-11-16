import Modal from "./Modal/Modal";
import NewForm from "./NewForm/NewForm";

function EditButton({ recipes, setRecipes, selectedRecipeId, setSelectedRecipeId }) {
  const selectedRecipe = recipes.find((r) => r.idMeal === selectedRecipeId);

  return (
    <Modal
      btnLabel="Edit"
      btnClassName="edit"
      disabled={!selectedRecipe}
    >
      {selectedRecipe && (
        <NewForm
          initialRecipe={selectedRecipe}
          onSubmit={(updatedRecipe) => {
            const updated = recipes.map((r) =>
              r.idMeal === selectedRecipeId
                ? { ...updatedRecipe, idMeal: selectedRecipeId }
                : r
            );
            setRecipes(updated);
            setSelectedRecipeId(null);
          }}
        />
      )}
    </Modal>
  );
}

export default EditButton;