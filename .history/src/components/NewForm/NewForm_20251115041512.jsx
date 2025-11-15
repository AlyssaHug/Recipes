import { useState, useEffect } from "react";
import "./NewForm.css";

function NewForm() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                return response.json();
            })
            .then((data) => {
                if (data.meals) {
                    setCategories(data.meals);
                }
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className="form-container">
            <h2 className="form-title"> Add a new recipe </h2>
            <form>

                <div className="form-control"> 
                    <label htmlFor="recipe-name"> Recipe Name </label>
                    <input type="text" name="recipe-name" placeholder="Recipe Name..." />
                </div>

                <div className="form-control"> 
                    <label htmlFor="food-category"> Food Category </label>
                    <select name="food-category" id="food-category" required>
                        <option value="">Select a category...</option>
                        {categories.map((category) => (
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-control"> 
                    <label htmlFor="image-url"> Image URL </label>
                    <input type="url" name="image-url" placeholder="Image URL..." />
                </div>

                <button className="create-button" value="submit"> Add Recipe </button>

            </form>
        </div>
    );
}

export default NewForm;