import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      if (searchTerm.trim() === "") {
        setDrinks([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );

        setDrinks(response.data.drinks || []);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  const handleCloseDetails = () => {
    setSelectedDrink(null);
  };

  return (
    <div className="App">
      <h1>Drink Mixer</h1>
      <input
        type="text"
        placeholder="Search for a drink"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="drink-list">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="drink-card"
            onClick={() => handleDrinkClick(drink)}
          >
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            <h3>{drink.strDrink}</h3>
            <p>{drink.strInstructions.slice(0, 50)}...</p>{" "}
          </div>
        ))}
      </div>

      {selectedDrink && (
        <div className="drink-details">
          <h2>{selectedDrink.strDrink}</h2>
          <img src={selectedDrink.strDrinkThumb} alt={selectedDrink.strDrink} />
          <h3>Ingredients:</h3>
          <ul>
            {}
            {Array.from({ length: 15 }, (_, index) => index + 1).map(
              (i) =>
                selectedDrink[`strIngredient${i}`] && (
                  <li key={i}>
                    {selectedDrink[`strIngredient${i}`]}{" "}
                    {selectedDrink[`strMeasure${i}`]}{" "}
                  </li>
                )
            )}
          </ul>
          <h3>Instructions:</h3>
          <p>{selectedDrink.strInstructions}</p>
          <button onClick={handleCloseDetails}>Close</button>{" "}
        </div>
      )}
    </div>
  );
}
