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
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [detailRecipe, setDetailRecipe] = useState(null);

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
        // NewForm passes an object with strMeal, strMealThumb, strCategory, strInstructions, and ingredients
        // Preserve all properties including ingredients (strIngredient1-20, strMeasure1-20)
        const newRecipe = {
            ...recipeData, // Spread all properties first (includes ingredients)
            idMeal: recipeData.idMeal || nanoid(),
            strMeal: recipeData.strMeal || recipeData.name || recipeData.strMeal || "",
            strMealThumb: recipeData.strMealThumb || recipeData.imageUrl || recipeData.strMealThumb || "",
            strCategory: recipeData.strCategory || recipeData.category || recipeData.strCategory || "",
            strInstructions: recipeData.strInstructions || "",
            strSource: recipeData.strSource || "",
            strYoutube: recipeData.strYoutube || "",
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
        <div className='app-container'>
            <Header />
            <main>
                {/* DETAIL VIEW */}
                {detailRecipe ? (
                    <RecipeDetails
                        recipe={detailRecipe}
                        onClose={() => setDetailRecipe(null)}
                        isFavorite={favorites.has(detailRecipe.idMeal)}
                        onToggleFavorite={() =>
                            toggleFavorite(detailRecipe.idMeal)
                        }></RecipeDetails>
                ) : (
                    <>
                        {/* Toolbar*/}
                        <div className='filter'>
                            <Favorites
                                showFavorites={showFavorites}
                                onToggle={() => setShowFavorites((p) => !p)}
                            />
                            <Filter
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                recipes={recipes}
                            />
                        </div>
                        {/* Content */}
                        {showFavorites && favorites.size === 0 ? (
                            <div className='content'>
                                <p className='no-favorites-message'>
                                    There is no favorite recipes yet. Add the ones you like to your collection!
                                </p>
                            </div>
                        ) : (
                            <div className='content'>
                                {!showFavorites && (
                                    <div className='edit-delete-wrapper'>
                                        <Add onAddRecipe={handleAddRecipe} />

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
                                )}

                                <div className='recipes'>
                                    {recipesToShow.map((recipe) => (
                                        <Recipe
                                            key={recipe.idMeal}
                                            recipe={recipe}
                                            selectedRecipeId={selectedRecipeId}
                                            setSelectedRecipeId={
                                                setSelectedRecipeId
                                            }
                                            isFavorite={favorites.has(
                                                recipe.idMeal
                                            )}
                                            onToggleFavorite={() =>
                                                toggleFavorite(recipe.idMeal)
                                            }
                                            isSelected={
                                                selectedRecipeId === recipe.idMeal
                                            }
                                            onSelect={() =>
                                                setSelectedRecipeId((prev) =>
                                                    prev === recipe.idMeal
                                                        ? null
                                                        : recipe.idMeal
                                                )
                                            }
                                            onShowDetails={() =>
                                                setDetailRecipe(recipe)
                                            } // This opens full page
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
