import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaPencilAlt, FaTimes, FaTrashAlt } from "react-icons/fa";

import { Review } from "../api/review";

export default function ReviewCard(props) {
  const reviewId = props.review._id;
  const [comment, setComment] = useState(props.review.comment);

  const [isEditing, setEditing] = useState(false);
  const handleChange = (e) => {
    // e.preventDefault()
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { comment };
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await new Review().updateReview(
        reviewId,
        requestBody,
        storedToken
      );
      setComment(response.data.comment);
      await props.refreshWine(props.wine);
    } catch (error) {
      console.log("Got an error:", error);
      // TODO: setErrorMessage so user seems something in the UI and not just in the console
    }
    setEditing(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setComment(props.review.comment);
    setEditing(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    try {
      await new Review().deleteReview(reviewId, storedToken);
      props.refreshWine(props.wine);
    } catch (error) {
      console.log("Got an error:", error);
      // TODO: setErrorMessage so user seems something in the UI and not just in the console
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">{props.review.user.username}</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={comment}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <motion.button
                  className="button is-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCheck />
                </motion.button>
              </div>
              <div className="control">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="button is-link is-light"
                  onClick={(e) => handleCancel(e)}
                >
                  <FaTimes />
                </motion.button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="is-flex is-align-items-flex-center is-justify-content-space-between">
          @{props.review.user.username}:
          <br />
          {props.review.comment}
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="button is-small"
              onClick={(e) => handleEdit(e)}
            >
              <FaPencilAlt />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="button is-small"
              onClick={(e) => handleDelete(e)}
            >
              <FaTrashAlt />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

import PropTypes from 'prop-types';
ReviewCard.propTypes = {
  review: PropTypes.object,
  refreshWine: PropTypes.func,
  wine: PropTypes.object
}