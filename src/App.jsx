import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Card/Card";
import Add from "./components/Add/Add";
import EditButton from "./components/EditButton/EditButton";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Filter from "./components/Filter/Filter";
import Favorites from "./components/Favorites/Favorites";
import { nanoid } from "nanoid";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Uh Oh. Something went wrong!");
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
    const recipesToShow = recipes.filter((r) => {
        // Filter by favorites if showFavorites is true
        if (showFavorites && !favorites.has(r.idMeal)) {
            return false;
        }
        // Filter by category if selectedCategory is set
        if (selectedCategory && r.strCategory !== selectedCategory) {
            return false;
        }
        return true;
    });

    function handleAddRecipe(recipeData) {
        const newRecipe = {
            idMeal: nanoid(),
            strMeal: recipeData.name,
            strMealThumb: recipeData.imageUrl,
            strCategory: recipeData.category,
            strSource: "",
            strYoutube: "",
        };
        setRecipes([newRecipe, ...recipes]);
    }

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
            <div className='filter'>
                <Favorites
                    showFavorites={showFavorites}
                    onToggle={() => setShowFavorites((prev) => !prev)}
                />
                <Filter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </div>
            <div className='content'>
                <div className='edit-delete-wrapper'>
                    <Add onAddRecipe={handleAddRecipe} />
                    {error && <div className='error'>{error}</div>}

                    <EditButton
                        className='edit'
                        recipes={recipes}
                        setRecipes={setRecipes}
                        selectedRecipeId={selectedRecipeId}
                        setSelectedRecipeId={setSelectedRecipeId}
                    />
                    <DeleteButton
                        className='delete'
                        recipes={recipes}
                        setRecipes={setRecipes}
                        selectedRecipeId={selectedRecipeId}
                        setSelectedRecipeId={setSelectedRecipeId}
                    />
                </div>

                <div className='recipes'>
                    {recipesToShow.map((recipe) => (
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
