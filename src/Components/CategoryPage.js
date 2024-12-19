import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Nav from "./Nav";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Fetch categories with their recipes
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/api/recipes/category/${categoryName}`
      );
      return response.data;
    },
  });

  // Find the current category and its recipes
  const currentCategory = categories?.find(
    (category) => category.name === categoryName
  );

  // Get recipes for the current category
  const categoryRecipes = currentCategory?.recipe || [];

  // Sort recipes alphabetically
  const sortedRecipes = categoryRecipes
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  if (isLoading) {
    return (
      <div className="page-container">
        <Nav />
        <div className="category-page">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading {categoryName} recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Nav />
        <div className="category-page">
          <div className="error-state">
            <p>Error loading recipes: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="page-container">
        <Nav />
        <div className="category-page">
          <div className="error-state">
            <p>Category not found: {categoryName}</p>
            <a href="/" className="retry-button">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Nav />
      <div className="category-page">
        <div className="category-header">
          <h1>{categoryName} Recipes</h1>
          <p>Discover our collection of {categoryName.toLowerCase()} dishes</p>
          <div className="recipe-count">
            {categoryRecipes.length} recipes found
          </div>
        </div>

        <div className="recipes-container">
          {categoryRecipes.length === 0 ? (
            <div className="no-recipes">
              <p>No recipes found in {categoryName} category.</p>
            </div>
          ) : (
            sortedRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-box">
                <div
                  className="recipe-img"
                  style={{
                    backgroundImage: `url(${recipe.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="recipe-info">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="recipe-rating">
                      <span className="meta-icon">⭐</span>
                      {recipe.rating}
                    </span>
                    <span className="recipe-time">
                      <span className="meta-icon">🕒</span>
                      {recipe.cookTime} min
                    </span>
                    <span className="recipe-difficulty">
                      <span className="meta-icon">👨‍🍳</span>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
