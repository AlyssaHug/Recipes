import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Card";
import Add from "./components/Add";
import

function App() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.meals) {
                    setRecipes(data.meals);
                } else {
                    setError("No recipes found.");
                }
            });
    }, []);

    function showRecipes(recipe) {
        return <Recipe recipe={recipe} />;
    }

    return (
        <div>
        <header
            <Add />
            <div className='recipes'>{recipes.map(showRecipes)}</div>
        </div>
    );
}

export default App;
