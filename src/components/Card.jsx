function Recipe({ recipe }) {
    return (
        <div className='card'>
            <img
                className='cardImg'
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
            />
            <h3 className='recipe_name'>{recipe.strMeal}</h3>
            <h3 className='view'>
                <a
                    href={recipe.strSource || recipe.strYoutube}
                    target='_blank'>
                    View Full Recipe
                </a>
            </h3>
        </div>
    );
}

export default Recipe;
