
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./NewForm.css";

function NewForm({ recipe, onSubmit, closeModal }) {
  const isEditing = !!recipe;

  // Parse existing instructions into steps (split by newlines)
  const parseInstructions = (instructions) => {
    if (!instructions) return [""];
    const steps = instructions.split(/\r?\n/).filter((step) => step.trim());
    return steps.length > 0 ? steps : [""];
  };

  const initial = isEditing
    ? {
        name: recipe.strMeal || "",
        category: recipe.strCategory || "",
        imageUrl: recipe.strMealThumb || "",
      }
    : { name: "", category: "", imageUrl: "" };

  const [categories, setCategories] = useState([]);
  const [instructionSteps, setInstructionSteps] = useState(
    isEditing ? parseInstructions(recipe.strInstructions) : [""]
  );

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []))
      .catch(() => {});
  }, []);

  const addInstructionStep = (index) => {
    const newSteps = [...instructionSteps];
    newSteps.splice(index + 1, 0, "");
    setInstructionSteps(newSteps);
  };

  const removeInstructionStep = (index) => {
    if (instructionSteps.length > 1) {
      const newSteps = instructionSteps.filter((_, i) => i !== index);
      setInstructionSteps(newSteps);
    }
  };

  const updateInstructionStep = (index, value) => {
    const newSteps = [...instructionSteps];
    newSteps[index] = value;
    setInstructionSteps(newSteps);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    // Join instruction steps with newlines, filtering out empty steps
    const instructions = instructionSteps
      .map((step) => step.trim())
      .filter((step) => step.length > 0)
      .join("\n");

    const newRecipe = {
      idMeal: isEditing ? recipe.idMeal : nanoid(),
      strMeal: data.get("name")?.trim() || "",
      strCategory: data.get("category")?.trim() || "",
      strMealThumb: data.get("imageUrl")?.trim() || "",
      strInstructions: instructions,
      strSource: "",
      strYoutube: "",
    };

    onSubmit(newRecipe);
    e.target.reset();
    closeModal();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {isEditing ? "Edit Recipe" : "Add New Recipe"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={initial.name}
            placeholder="Recipe name..."
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="category">Food Category</label>
          <select
            name="category"
            id="category"
            defaultValue={initial.category}
            required
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            defaultValue={initial.imageUrl}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="form-control">
          <label>Instructions</label>
          <div className="instructions-container">
            {instructionSteps.map((step, index) => {
              const isLastStep = index === instructionSteps.length - 1;
              return (
                <div key={index} className="instruction-step">
                  <div className="step-input-wrapper">
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => updateInstructionStep(index, e.target.value)}
                      placeholder={`Step ${index + 1}...`}
                      className="step-input"
                    />
                    {isLastStep ? (
                      <button
                        type="button"
                        onClick={() => addInstructionStep(index)}
                        className="add-step-button"
                        aria-label="Add next step"
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeInstructionStep(index)}
                        className="remove-step-button"
                        aria-label="Remove step"
                      >
                        −
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="create-button" type="submit">
          {isEditing ? "Update" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}

export default NewForm;