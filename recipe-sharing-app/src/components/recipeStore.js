import { create } from 'zustand'

export const useRecipeStore = create((set, get) => ({
  /* =======================
     Core State
  ======================== */
  recipes: [],
  searchTerm: '',
  favorites: [],

  /* =======================
     CRUD Actions
  ======================== */
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  /* =======================
     Search & Filtering
  ======================== */
  setSearchTerm: (term) => set({ searchTerm: term }),

  filteredRecipes: () => {
    const { recipes, searchTerm } = get()

    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  },

  /* =======================
     Favorites
  ======================== */
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  toggleFavorite: (recipeId) => {
    const { favorites, addFavorite, removeFavorite } = get()

    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  },

  /* =======================
     Recommendations
  ======================== */
  recommendations: () => {
    const { recipes, favorites } = get()

    if (favorites.length === 0) return []

    // Simple heuristic: recommend non-favorited recipes
    return recipes.filter(
      (recipe) =>
        !favorites.includes(recipe.id) && Math.random() > 0.6
    )
  },
}))
