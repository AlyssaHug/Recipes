import "./RecipeDetails.css";
export default function RecipeDetails({ recipe, onClose, children }) {
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

    // Split instructions by newlines for paragraphs (if available)
    const instructions = recipe.strInstructions
        ? recipe.strInstructions.split(/\r?\n/).filter((line) => line.trim())
        : [];

    return (
        <div className='recipe-Details'>
            <button
                className='close-details'
                onClick={onClose}>
                Close
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
                </div>
                <div className='ingredient-info'>
                    {ingredients.length > 0 ? (
                        <>
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.measure} {item.ingredient}
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
                                className='step'>
                                {step}
                            </p>
                        ))}
                    </>
                ) : (
                    <p>No instructions available for this recipe.</p>
                )}
            </div>
            {children}{" "}
            {/* If you need to render additional content passed as children */}
        </div>
    );
}
