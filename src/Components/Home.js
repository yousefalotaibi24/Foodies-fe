import React from "react";
import Nav from "./Nav";
import "../App.css";
const Home = () => {
  return (
    <div>
      <Nav />
      <div className="container">
        <h1>Home</h1>
        <p>Home page</p>
      </div>
      <div>
        <h1>Catgory</h1> <h2>Amrecan, italian, indian, chinese, kuwaiti</h2>
      </div>
      <div>
        <h1>Recipes</h1>
        <div className="Recipe">
          <div className="food ">
            <h1>1</h1>
          </div>
          <div className="food ">
            <h1>2</h1>
          </div>
          <div className="food ">
            <h1>3</h1>
          </div>
          <div className="food ">
            <h1>4</h1>
          </div>
          <div className="food ">
            <h1>5</h1>
          </div>
          <div className="food ">
            <h1>6</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
