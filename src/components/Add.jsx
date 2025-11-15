import Modal from "./Modal/Modal";
import { nanoid } from "nanoid";
import NewForm from "./NewForm/NewForm";

function Add({ recipes, setRecipes, selectedRecipeId, setSelectedRecipeId }) {
    function deleteRecipe() {
        if (!selectedRecipeId) return;
        const newRecipes = recipes.filter((r) => r.idMeal !== selectedRecipeId);
        setRecipes(newRecipes);
        setSelectedRecipeId(null);
    }

    const selectedRecipe = recipes.find((r) => r.idMeal === selectedRecipeId);

    return (
        <div className="add-controls">
            <Modal
                btnLabel="Add New Recipe!"
                btnClassName="button">
                <NewForm
                    onSubmit={(newRecipe) => {
                        const recipeWithId = { ...newRecipe, idMeal: nanoid() };
                        setRecipes((prev) => [...prev, recipeWithId]);
                    }}
                />
            </Modal>

            <Modal
                btnLabel="Edit"
                btnClassName="edit"
                disabled={!selectedRecipe}>
                {selectedRecipe && (
                    <NewForm
                        initialRecipe={selectedRecipe}
                        onSubmit={(updatedRecipe) => {
                            const updated = recipes.map((r) =>
                                r.idMeal === selectedRecipeId
                                    ? {
                                          ...updatedRecipe,
                                          idMeal: selectedRecipeId,
                                      }
                                    : r
                            );
                            setRecipes(updated);
                            setSelectedRecipeId(null);
                        }}
                    />
                )}
            </Modal>

            <button
                className="delete"
                onClick={deleteRecipe}
                disabled={!selectedRecipeId}>
                Delete
            </button>
        </div>
    );
}

export default Add;
