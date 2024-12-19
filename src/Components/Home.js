import React from "react";
import Nav from "./Nav";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/recipes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8000/api/categories");
      return response.data;
    },
  });

  // Sort recipes alphabetically by name
  const sortedRecipes = data?.slice().sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Sort categories alphabetically by name
  const sortedCategories = categoriesData?.slice().sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="page-container">
      <Nav />
      <div className="hero">
        <div className="hero-content">
          <h1>Discover Delicious Recipes</h1>
          <p>Find and share the best recipes from around the world</p>
        </div>
      </div>

      <div className="main-content">
        <section className="categories-section">
          <h2>Popular Categories</h2>
          <div className="category-container">
            {sortedCategories?.map((category, index) => (
              <Link 
                to={`/category/${category.name}`} 
                key={index} 
                className="category-box"
              >
                <h3>{category.name}</h3>
                <div className="category-decoration"></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <h2>Featured Recipes</h2>
          <div className="recipes-container">
            {isLoading ? (
              <div className="loading-state">Loading recipes...</div>
            ) : error ? (
              <div className="error-state">
                Error loading recipes: {error.message}
              </div>
            ) : (
              sortedRecipes?.map((recipe) => (
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
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
