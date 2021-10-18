import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "react-bulma-components";
import { motion } from "framer-motion";
import { Wines } from "../api/wines";

export default function SearchWines() {
  const [page, setPage] = useState(1);
  const [wines, setWines] = useState([]);
  let filteredWines = wines;

  let lastQuery;
  const [query, setQuery] = useState("");
  if (query !== "") {
    filteredWines = wines.filter((wine) => {
      return wine.title.toLowerCase().includes(query.toLowerCase());
    });
  }
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  async function searchWines(query, lastQuery, page) {
    if (query !== lastQuery) {
      console.log("new query:", query);
      lastQuery = query;
      const response = await new Wines().search(query, page);
      console.log("this is the response", response);
      console.log("this is the response data", response.data.wines);
      setWines(response.data.wines);
    }
  }

  useEffect(() => {
    searchWines(query, lastQuery, page);
  }, [query, lastQuery, page]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="columns is-centered">
      <div className="column is-10">
        <h1 className="is-size-1">Search Wines</h1>
        <input
          className="input"
          onChange={changeHandler}
          type="text"
          placeholder="Type a query..."
        />
        {filteredWines.map((wine) => {
          return (
            <Link key={wine._id} to={() => `/wine/${wine._id}`}>
              <Box className="is-size-3">{wine.title}</Box>
            </Link>
          );
        })}
        <nav
          className="pagination is-pulled-right"
          role="navigation"
          aria-label="pagination"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="pagination-previous button"
            onClick={previousPage}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="pagination-next button"
            onClick={nextPage}
          >
            Next page
          </motion.button>
        </nav>
      </div>
    </div>
  );
}
