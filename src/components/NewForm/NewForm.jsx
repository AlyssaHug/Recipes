
import { nanoid } from "nanoid";
import { useEffect, useState, useMemo } from "react";
import "./NewForm.css";

// Check if a step contains only a number (with optional "step" prefix)
const isOnlyNumber = (step) => {
  const trimmed = step.trim();
  // Match patterns like "2", "step2", "Step 2", "step 2", etc. (case-insensitive)
  const numberOnlyPattern = /^(step\s*)?\d+$/i;
  return numberOnlyPattern.test(trimmed);
};

// Parse existing instructions into steps (split by newlines)
const parseInstructions = (instructions) => {
  if (!instructions) return [""];
  const steps = instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0 && !isOnlyNumber(step));
  return steps.length > 0 ? steps : [""];
};

function NewForm({ recipe, onSubmit, closeModal }) {
  const isEditing = !!recipe;

  const initial = useMemo(() => {
    return isEditing
      ? {
          name: recipe.strMeal || "",
          category: recipe.strCategory || "",
          imageUrl: recipe.strMealThumb || "",
        }
      : { name: "", category: "", imageUrl: "" };
  }, [recipe, isEditing]);

  const [categories, setCategories] = useState([]);
  const [instructionSteps, setInstructionSteps] = useState(
    isEditing ? parseInstructions(recipe?.strInstructions) : [""]
  );

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []))
      .catch(() => {});
  }, []);

  // Update instruction steps when recipe changes (for editing)
  useEffect(() => {
    if (recipe) {
      // When editing, parse instructions or use empty array
      const parsed = parseInstructions(recipe.strInstructions);
      setInstructionSteps(parsed);
    } else {
      // Reset to single empty step when not editing
      setInstructionSteps([""]);
    }
  }, [recipe]);

  // Auto-resize textareas when instruction steps change
  useEffect(() => {
    const textareas = document.querySelectorAll('.step-input');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }, [instructionSteps]);

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

    // Join instruction steps with newlines, filtering out empty steps and number-only steps
    const instructions = instructionSteps
      .map((step) => step.trim())
      .filter((step) => step.length > 0 && !isOnlyNumber(step))
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

      <form key={recipe?.idMeal || "new"} onSubmit={handleSubmit}>
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
            {instructionSteps
              .map((step, originalIndex) => ({ step, originalIndex }))
              .filter(({ step }) => !isOnlyNumber(step))
              .map(({ step, originalIndex }, displayIndex, filteredArray) => {
                const isLastStep = displayIndex === filteredArray.length - 1;
                return (
                  <div key={originalIndex} className="instruction-step">
                    <label className="step-label">Step {displayIndex + 1}</label>
                    <div className="step-input-wrapper">
                      <textarea
                        value={step}
                        onChange={(e) => {
                          updateInstructionStep(originalIndex, e.target.value);
                          // Auto-resize textarea
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        onInput={(e) => {
                          // Auto-resize on input
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        placeholder={`Step ${displayIndex + 1}...`}
                        className="step-input"
                        rows={1}
                      />
                      {isLastStep ? (
                        <button
                          type="button"
                          onClick={() => {
                            // Add after the last step in the original array
                            const lastIndex = instructionSteps.length - 1;
                            addInstructionStep(lastIndex);
                          }}
                          className="add-step-button"
                          aria-label="Add next step"
                        >
                          +
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeInstructionStep(originalIndex)}
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