import React, { useState } from "react";
import "./BeautyHeaven.css";

const BeautyHeaven = () => {
  const [selectedCategory, setSelectedCategory] = useState("Skin Type");
  const [selectedOption, setSelectedOption] = useState("");

  const categories = {
    "Skin Type": [
      "Acne-prone skin",
      "Sensitive skin",
      "Combination skin",
      "Dry skin",
      "Normal skin",
      "Oily skin",
    ],
    "Skin Concerns": [
      "Acne & blemishes",
      "Dark spots & pigmentation",
      "Pores & blackheads",
      "Dryness",
      "Dullness",
      "Anti-aging",
    ],
    "By Range": [
      "Rice Water Bright",
      "White Seeds",
      "Pomegranate & Collagen",
      "Vitamin C",
      "Rice & Ceramide",
      "Tea Tree",
    ],
  };

  return (
    <div className="beauty-heaven-container">
      <div className="navigation">
        <span>Wishlist</span>
        <span>Cart</span>
        <span>About</span>
        <span>Shop</span>
      </div>

      <div className="sort-section">
        <label>SORT BY</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="skincare-categories">
        <h3>{selectedCategory}</h3>
        <ul>
          {categories[selectedCategory].map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedOption(item)}
              className={selectedOption === item ? "selected-option" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BeautyHeaven;
