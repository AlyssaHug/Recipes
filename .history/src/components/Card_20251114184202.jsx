function Recipe({ recipe, setSelectedRecipeId, selectedRecipeId, isFavorite, onToggleFavorite }) {
    function handleClick() {
        setSelectedRecipeId(
            recipe.idMeal === selectedRecipeId ? null : recipe.idMeal
        );
    }

    function handleFavoriteClick(e) {
        e.stopPropagation(); // Prevent card selection when clicking the icon
        onToggleFavorite(recipe.idMeal);
    }

    return (
        <div
            className={`card ${
                recipe.idMeal === selectedRecipeId ? "selected" : ""
            }`}
            onClick={handleClick}>
            <button
                className={`archive-icon ${isFavorite ? "filled" : ""}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <img
                    src={isFavorite ? "/assets/archive-filled.svg" : "/assets/archive-outline.svg"}
                    alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className="archive-icon-img"
                />
            </button>
            <img
                className='cardImg'
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
            />
            <h3 className='recipe_name'>{recipe.strMeal}</h3>
            <h3 className='view'>
                <a
                    href={recipe.strSource || recipe.strYoutube}
                    target='_blank'
                    rel='noopener noreferrer'>
                    View Full Recipe
                </a>
            </h3>
        </div>
    );
}

export default Recipe;
