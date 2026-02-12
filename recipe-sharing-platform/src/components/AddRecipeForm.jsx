

import { useState } from "react"

const AddRecipeForm = () => {
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [errors, setErrors] = useState({})

  // Validation logic
  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Recipe title is required"
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required"
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients =
        "Please enter at least two ingredients (comma separated)"
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Preparation steps are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions: instructions.split("\n").map((step) => step.trim()),
    }

    console.log("Submitted recipe:", newRecipe)

    // Reset form
    setTitle("")
    setIngredients("")
    setInstructions("")
    setErrors({})
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Add New Recipe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        {/* Recipe Title */}
        <div>
          <label className="block font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-1">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter ingredients separated by commas"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients}
            </p>
          )}
        </div>

        {/* Preparation Steps */}
        <div>
          <label className="block font-medium mb-1">
            Preparation Steps
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="5"
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter each step on a new line"
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instructions}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg
                     hover:bg-green-700 transition-colors font-medium"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipeForm;
