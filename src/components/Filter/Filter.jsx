import { useEffect, useState } from "react";
import "./Filter.css";

function Filter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    onCategoryChange(e.target.value || null);
  };

  return (
    <div className="filter-container">
      <label htmlFor="category-filter" className="filter-label">
        Filter by Category:
      </label>
      <select
        id="category-filter"
        className="category-filter"
        value={selectedCategory || ""}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;

