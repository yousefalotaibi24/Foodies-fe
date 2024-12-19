import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Nav from "./Nav";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ["recipes", categoryName],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8000/api/recipes/category/${categoryName}`);
      return response.data;
    },
  });

  return (
    <div className="page-container">
      <Nav />
      <div className="category-page">
        <div className="category-header">
          <h1>{categoryName} Recipes</h1>
          <p>Discover our collection of {categoryName.toLowerCase()} dishes</p>
        </div>
        
        <div className="recipes-container">
          {isLoading ? (
            <div className="loading-state">Loading recipes...</div>
          ) : error ? (
            <div className="error-state">
              Error loading recipes: {error.message}
            </div>
          ) : (
            recipes?.map((recipe) => (
              <div key={recipe.id} className="recipe-box">
                <div
                  className="recipe-img"
                  style={{
                    backgroundImage: `url(${recipe.image})`,
                  }}
                ></div>
                <div className="recipe-info">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>⭐ {recipe.rating}</span>
                    <span>🕒 {recipe.cookTime} min</span>
                    <span>👨‍🍳 {recipe.difficulty}</span>
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