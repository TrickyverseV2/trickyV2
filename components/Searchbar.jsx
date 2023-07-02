"use client";

import React, { useState } from "react";
import styles from "../styles/Searchbar.module.css";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [dropdownValue, setDropdownValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value, option) => {
    setSelectedOption(option);
    setDropdownValue(value);
    setIsOpen(false);
  };


  return (
    <div className={styles.search}>
      <div className={styles.dropdown}>
        <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedOption}
          <img src="/images/arw.png" alt="" style={{marginLeft: "0.2rem"}}/>
        </button>
        {isOpen && (
          <ul className={styles.dropdownmenu}>
            <li onClick={() => handleOptionSelect("option1", "All")}>All</li>
            <li onClick={() => handleOptionSelect("option2", "Blogs")}>Blogs</li>
            <li onClick={() => handleOptionSelect("option1", "Products")}>Products</li>
            <li onClick={() => handleOptionSelect("option1", "Eco-Stays")}>Eco-Stays</li>
            <li onClick={() => handleOptionSelect("option1", "Packages")}>Packages</li>
            <li onClick={() => handleOptionSelect("option1", "Events")}>Events</li>
          </ul>
        )}
      </div>
      <input type="text" className={styles.searchinput} placeholder="Search  Blogs,  Trips,  Events..." />
      <button className={styles.searchbtn}>
        <img src="/images/search.png" alt="" />
      </button>
    </div>
  );
};

export default Searchbar;
