import "./RecipeDetails.css";

// Check if a step contains only a number (with optional "step" prefix)
const isOnlyNumber = (step) => {
    const trimmed = step.trim();
    // Match patterns like "2", "step2", "Step 2", "step 2", etc. (case-insensitive)
    const numberOnlyPattern = /^(step\s*)?\d+$/i;
    return numberOnlyPattern.test(trimmed);
};

export default function RecipeDetails({
    recipe,
    onClose,
    children,
    isFavorite,
    onToggleFavorite,
}) {
    const img = recipe.strMealThumb || recipe.imageUrl || "";

    // Extract ingredients and measures into a list (filter out empty ones)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure });
        }
    }

    // Split instructions by newlines and filter out number-only steps
    const instructions = recipe.strInstructions
        ? recipe.strInstructions
              .split(/\r?\n/)
              .map((line) => line.trim())
              .filter((line) => line.length > 0 && !isOnlyNumber(line))
        : [];

    const handleViewOriginalRecipe = () => {
        // If recipe has a source URL, open that
        if (recipe.strSource && recipe.strSource.trim()) {
            window.open(
                recipe.strSource.trim(),
                "_blank",
                "noopener,noreferrer"
            );
        }
        // Otherwise, if it's an API recipe, open the themealdb link
        else if (recipe.idMeal) {
            window.open(
                `https://www.themealdb.com/meal/${recipe.idMeal}`,
                "_blank",
                "noopener,noreferrer"
            );
        }
    };

    return (
        <div className='recipe-Details'>
            <button
                className='close-details'
                onClick={onClose}
            >
                Return to Recipes Catalog ⏎
            </button>
            <div className='details-grid'>
                <div className='Recipe-stack'>
                    <h1>{recipe.strMeal || recipe.name}</h1>
                    {img && (
                        <img
                            src={img}
                            alt={recipe.strMeal || recipe.name}
                            className='details-cover'
                            onError={(e) => (e.target.style.display = "none")}
                        />
                    )}
                    <div className='button-group'>
                        {onToggleFavorite && (
                            <button
                                className={`favorite-button ${
                                    isFavorite ? "favorited" : ""
                                }`}
                                onClick={onToggleFavorite}
                                aria-label={
                                    isFavorite
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                            >
                                <img
                                    src={
                                        isFavorite
                                            ? "/assets/archive-filled.svg"
                                            : "/assets/archive-outline.svg"
                                    }
                                    alt={
                                        isFavorite
                                            ? "Remove from favorites"
                                            : "Add to favorites"
                                    }
                                    className='favorite-icon'
                                />
                                {isFavorite
                                    ? "Remove from Favorites"
                                    : "Add to Favorites"}
                            </button>
                        )}
                        {(recipe.strSource || recipe.idMeal) && (
                            <button
                                className='view-recipe-btn'
                                onClick={handleViewOriginalRecipe}
                            >
                                View Original Recipe
                            </button>
                        )}
                    </div>
                </div>
                <div className='ingredient-info'>
                    {ingredients.length > 0 ? (
                        <>
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.measure ? `${item.measure} ` : ""}
                                        {item.ingredient}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No ingredients available for this recipe.</p>
                    )}
                </div>
            </div>
            <div className='instructions'>
                {instructions.length > 0 ? (
                    <>
                        <h2>Instructions</h2>
                        {instructions.map((step, index) => (
                            <p
                                key={index}
                                className='step'
                            >
                                <strong>Step {index + 1}:</strong>
                                <br />
                                {step}
                            </p>
                        ))}
                    </>
                ) : (
                    <p>No instructions available for this recipe.</p>
                )}
            </div>
            {children}{" "}
        </div>
    );
}
