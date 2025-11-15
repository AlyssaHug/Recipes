import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Card";
import Add from "./components/Add";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { nanoid } from "nanoid";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Uh Oh. Something went wrong! 😢");
                }
                return response.json();
            })
            .then((data) => {
                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    setError("No recipes found.");
                }
            })
            .catch((err) => {
                setError("Failed to fetch recipes: " + err.message);
            });
    }, []);

    const toggleFavorite = (recipeId) => {
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(recipeId)) {
                newFavorites.delete(recipeId);
            } else {
                newFavorites.add(recipeId);
            }
            return newFavorites;
        });
    };

    return (
        <div>
            <Header />
            <div className='content'>
                <Add />
                {error && <div className='error'>{error}</div>}
                <div className='recipes'>
                    {recipes.map((recipe) => (
                        <Recipe
                            key={recipe.idMeal}
                            recipe={recipe}
                            selectedRecipeId={selectedRecipeId}
                            setSelectedRecipeId={setSelectedRecipeId}
                            isFavorite={favorites.has(recipe.idMeal)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
