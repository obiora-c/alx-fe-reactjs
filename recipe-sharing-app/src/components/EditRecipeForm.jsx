

import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ Explicitly using 'event.preventDefault'

    updateRecipe({
      ...recipe,
      title,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        required
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;