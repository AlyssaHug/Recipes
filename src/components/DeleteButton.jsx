function DeleteButton({
    recipes,
    setRecipes,
    selectedRecipeId,
    setSelectedRecipeId,
}) {
    function deleteRecipe() {
        if (!selectedRecipeId) return;
        const newRecipes = recipes.filter((r) => r.idMeal !== selectedRecipeId);
        setRecipes(newRecipes);
        setSelectedRecipeId(null);
    }

    return (
        <button
            className="delete"
            onClick={deleteRecipe}
            disabled={!selectedRecipeId}>
            Delete
        </button>
    );
}

export default DeleteButton;
