function DeleteButton({ recipes, setRecipes, selectedRecipeId, setSelectedRecipeId }) {
  const handleDelete = () => {
    setRecipes(recipes.filter(r => r.idMeal !== selectedRecipeId));
    setSelectedRecipeId(null);
  };

  return (
    <button className="delete" onClick={handleDelete} disabled={!selectedRecipeId}>
      Delete
    </button>
  );
}

export default DeleteButton;