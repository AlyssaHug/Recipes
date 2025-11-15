import "./NewForm.css";

function NewForm() {
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
                    <input type="text" name="food-category" placeholder="Food Category..." />
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