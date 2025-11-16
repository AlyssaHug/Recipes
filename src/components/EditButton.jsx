import Modal from "./Modal/Modal";
import NewForm from "./NewForm/NewForm";


function EditButton({ recipes, setRecipes, selectedRecipeId, setSelectedRecipeId }) {
  const recipe = recipes.find(r => r.idMeal === selectedRecipeId);

  function handleSubmit(data) {
    setRecipes(recipes.map(r =>
      r.idMeal === selectedRecipeId
        ? { ...r, strMeal: data.name, strMealThumb: data.imageUrl, strCategory: data.category }
        : r
    ));
    setSelectedRecipeId(null);
  }

  return (
    <Modal btnLabel="Edit" btnClassName="edit" disabled={!recipe}>
      {recipe && <NewForm initialRecipe={{ name: recipe.strMeal, category: recipe.strCategory, imageUrl: recipe.strMealThumb }} onSubmit={handleSubmit} />}
    </Modal>
  );
}

export default EditButton;