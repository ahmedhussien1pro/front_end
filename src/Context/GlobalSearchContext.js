// src/context/GlobalSearchContext.js
import React, { createContext, useState, useEffect } from "react";
import demoData from "../Pages/Website/UserHome/Components/Courses/courseData";

export const GlobalSearchContext = createContext();

export const GlobalSearchProvider = ({ children }) => {
  const [globalItems, setGlobalItems] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      try {
       

        setGlobalItems(demoData);
      } catch (err) {
        console.error("Error fetching global search data:", err);
      }
    }

    fetchAllData();
  }, []);

  return (
    <GlobalSearchContext.Provider value={{ globalItems }}>
      {children}
    </GlobalSearchContext.Provider>
  );
};
