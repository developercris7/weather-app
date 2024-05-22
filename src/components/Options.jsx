import React, { useContext } from "react";
import "../styles/options.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { DataContext } from "../contextAPI/Context";

const Options = () => {
  const { setFormDisplay, searchInput, setSearchInput, handleRefresh } =
    useContext(DataContext);
  return (
    <div className="options-container">
      <div className="search-bar">
        <label htmlFor="search">
          <FaSearch />
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search city here..."
          autoComplete="off"
          className="search-input"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>

      <div className="option-button">
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCcw />
          <span>Refresh</span>
        </button>
        <button className="location-btn" onClick={() => setFormDisplay("add")}>
          <FaLocationDot />
          <span>Add Location</span>
        </button>
      </div>
    </div>
  );
};

export default Options;
