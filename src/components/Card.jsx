function Recipe({ recipe, setSelectedRecipeId, selectedRecipeId }) {
    function handleClick() {
        setSelectedRecipeId(
            recipe.idMeal === selectedRecipeId ? null : recipe.idMeal
        );
    }

    return (
        <div
            className={`card ${
                recipe.idMeal === selectedRecipeId ? "selected" : ""
            }`}
            onClick={handleClick}>
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
