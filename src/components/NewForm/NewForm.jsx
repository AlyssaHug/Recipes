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
                    <label htmlFor="recipe-name"> Name </label>
                    <input type="text" name="recipe-name" placeholder="Name..." />
                </div>

                <div className="form-control"> 
                    <label htmlFor="recipe-steps"> Steps </label>
                    <input type="number" name="recipe-steps" placeholder="Steps..." />
                </div>

                <button className="create-button" value="submit"> Add Recipe </button>

            </form>
        </div>
    );
}

export default NewForm;