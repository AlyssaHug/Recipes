
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./NewForm.css";

function NewForm({ recipe, onSubmit, closeModal }) {
  const isEditing = !!recipe;


  const initial = isEditing
    ? {
        name: recipe.strMeal || "",
        category: recipe.strCategory || "",
        imageUrl: recipe.strMealThumb || "",
      }
    : { name: "", category: "", imageUrl: "" };


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []))
      .catch(() => {});
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const newRecipe = {
      idMeal: isEditing ? recipe.idMeal : nanoid(),
      strMeal: data.get("name")?.trim() || "",
      strCategory: data.get("category")?.trim() || "",
      strMealThumb: data.get("imageUrl")?.trim() || "",
      strSource: "",
      strYoutube: "",
    };

    onSubmit(newRecipe);
    e.target.reset();
    closeModal();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {isEditing ? "Edit Recipe" : "Add New Recipe"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initial.name}
            placeholder="Recipe name..."
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="category">Food Category</label>
          <select
            name="category"
            id="category"
            defaultValue={initial.category}
            required
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            defaultValue={initial.imageUrl}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <button className="create-button" type="submit">
          {isEditing ? "Update" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default NewForm;