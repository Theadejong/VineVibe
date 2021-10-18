import { useState } from "react";
import { motion } from "framer-motion";
import { Columns } from "react-bulma-components";
import React from "react";

import {Review} from "../api/review";

function AddReview(props) {
  const { wineId } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [comment, setComment] = useState("");
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { comment, wineId };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    try {
      const response = await new Review().createReview(
        requestBody,
        storedToken
      );
      setComment("");
      await props.refreshWine(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="AddTask">
      <form onSubmit={handleReviewSubmit}>
        {errorMessage}
        <Columns>
          <Columns.Column>
            <div className="field">
              <div className="control">
                <input
                  placeholder="Write your review here"
                  type="text"
                  name="review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </Columns.Column>
          <Columns.Column className="is-narrow">
            <motion.button
              type="submit"
              className="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add Review
            </motion.button>
          </Columns.Column>
        </Columns>
      </form>
    </div>
  );
}

import PropTypes from "prop-types";
AddReview.propTypes = {
  wineId: PropTypes.string,
  refreshWine: PropTypes.func,
}

export default AddReview;
