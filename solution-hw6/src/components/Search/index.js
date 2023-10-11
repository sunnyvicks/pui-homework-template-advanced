import "./style.css";
import { useState } from "react";
import { PRODUCTS } from "utils";

const Search = ({ setProducts }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const handleSearch = (evt) => {
    evt.preventDefault();
    setProducts(
      PRODUCTS.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleFilterChange = (evt) => {
    const newFilter = evt.target.value;
    setFilter(newFilter);
    setProducts((prev) => {
      switch (newFilter) {
        case "name":
          return [...prev].sort((a, b) => a.name.localeCompare(b.name));
        case "base_price":
          return [...prev].sort((a, b) => a.price - b.price);
        default:
          return prev;
      }
    });
  };

  return (
    <div className="search">
      <form onSubmit={(evt) => handleSearch(evt)}>
        <input value={search} onChange={(evt) => setSearch(evt.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={filter}
          onChange={(evt) => handleFilterChange(evt)}
        >
          <option value="name">Name</option>
          <option value="base_price">Base Price</option>
        </select>
      </div>
    </div>
  );
};
export default Search;
