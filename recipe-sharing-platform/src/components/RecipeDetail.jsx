import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import recipesData from "../data.json"

const RecipeDetail = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  // Load recipe when component mounts or ID changes
  useEffect(() => {
    const selectedRecipe = recipesData.find(
      (item) => item.id === Number(id)
    )
    setRecipe(selectedRecipe)
  }, [id])

  // Loading / invalid recipe guard
  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Recipe not found
        </h2>
        <Link
          to="/"
          className="text-green-600 hover:underline"
        >
          Go back home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        to="/"
        className="text-green-600 hover:underline mb-6 inline-block"
      >
        ← Back to recipes
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        {recipe.title}
      </h1>

      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mb-8"
      />

      {/* Summary */}
      <p className="text-gray-700 mb-8">
        {recipe.summary}
      </p>

      {/* Ingredients */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Cooking Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-3">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetail;
