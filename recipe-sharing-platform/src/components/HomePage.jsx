import { useState, useEffect } from "react";
import recipeData from "../data.json";

const HomePage = () => {
  const  [recipes, SetRecipes] = useState([]);

  useEffect(() => {
    SetRecipes(recipeData)}, []
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Recipe Sharing Platform
      </h1>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl overflow-hidden shadow-md
                       hover:shadow-xl hover:scale-[1.02]
                       transition-all duration-300"
          >
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Recipe Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">
                {recipe.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {recipe.summary}
              </p>

              <a
                href="#"
                className="inline-block text-green-600 font-medium hover:underline"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  

}

export default HomePage;