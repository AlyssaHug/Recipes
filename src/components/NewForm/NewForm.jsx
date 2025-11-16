import { useState, useEffect } from "react";
import "./NewForm.css";

function NewForm({ onSubmit, initialRecipe = {} }) {
    const [categories, setCategories] = useState([]);
    const [recipeName, setRecipeName] = useState(initialRecipe.name || "");
    const [foodCategory, setFoodCategory] = useState(initialRecipe.category || "");
    const [imageUrl, setImageUrl] = useState(initialRecipe.imageUrl || "");

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch categories");
                return response.json();
            })
            .then((data) => {
                if (data.meals) setCategories(data.meals);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (recipeName.trim() && foodCategory && imageUrl.trim()) {
            onSubmit({
                name: recipeName.trim(),
                category: foodCategory,
                imageUrl: imageUrl.trim()
            });
            setRecipeName("");
            setFoodCategory("");
            setImageUrl("");
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Add a new recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="recipe-name">Recipe Name</label>
                    <input
                        type="text"
                        id="recipe-name"
                        placeholder="Recipe Name..."
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="food-category">Food Category</label>
                    <select
                        id="food-category"
                        value={foodCategory}
                        onChange={(e) => setFoodCategory(e.target.value)}
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
                    <label htmlFor="image-url">Image URL</label>
                    <input
                        type="url"
                        id="image-url"
                        placeholder="Image URL..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>

                <button className="create-button" type="submit">
                    {initialRecipe.name ? "Update" : "Add Recipe"}
                </button>
            </form>
        </div>
    );
}

export default NewForm;