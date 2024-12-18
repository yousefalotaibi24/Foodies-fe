import React from "react";
import Nav from "./Nav";
import { useQuery } from "@tanstack/react-query";
import "../App.css";
import axios from "axios";

const Home = () => {
  const categories = ["American", "Italian", "Indian", "Chinese", "Kuwaiti"];

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

      console.log(response, "ddd");
      return response.data;
    },
  });

  console.log("categories", categoriesData);

  return (
    <div className="page-container">
      <Nav />
      <div className="hero">
        <div className="hero-content">
          <h1>Discover Delicious Recipes</h1>
          <p>Find and share the best recipes from around the world</p>
          <button className="cta-button">Explore Recipes</button>
        </div>
      </div>

      <div className="main-content">
        <section className="categories-section">
          <h2>Popular Categories</h2>
          <div className="category-container">
            {categoriesData?.map((category, index) => (
              <div key={index} className="category-box">
                <div className="category-img"></div>
                <h3>{category.name}</h3>
              </div>
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
              data?.map((recipe) => (
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
                      <span>⭐ {recipe.rating}</span>
                      <span>🕒 {recipe.cookTime} min</span>
                      <span>👨‍🍳 {recipe.difficulty}</span>
                    </div>
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
