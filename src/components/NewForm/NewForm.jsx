import "./NewForm.css";

function NewForm({ initialRecipe = {}, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const newRecipe = {
      strMeal: form["recipe-name"].value.trim(),
      strMealThumb: initialRecipe.strMealThumb || "",
      strSource: initialRecipe.strSource || "",
      strYoutube: initialRecipe.strYoutube || "",
    };

    onSubmit(newRecipe);
    form.reset();
    form.closest("dialog")?.close();
  }

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialRecipe.idMeal ? "Edit Recipe" : "Add a new recipe"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="recipe-name">Name</label>
          <input
            type="text"
            name="recipe-name"
            placeholder="Name..."
            defaultValue={initialRecipe.strMeal || ""}
            required
          />
        </div>

       
        <button className="create-button" type="submit">
          {initialRecipe.idMeal ? "Save Changes" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default NewForm;