import Modal from "./Modal/Modal";
import NewForm from "./NewForm/NewForm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function Add({ recipes, setRecipes, selectedRecipeId, setSelectedRecipeId }) {
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

            <EditButton
                recipes={recipes}
                setRecipes={setRecipes}
                selectedRecipeId={selectedRecipeId}
                setSelectedRecipeId={setSelectedRecipeId}
            />

            <DeleteButton
                recipes={recipes}
                setRecipes={setRecipes}
                selectedRecipeId={selectedRecipeId}
                setSelectedRecipeId={setSelectedRecipeId}
            />
        </div>
    );
}

export default Add;
