import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Block, Columns } from "react-bulma-components";
import {
  FaCheck,
  FaHeart,
  FaHeartBroken,
  FaStar,
  FaRegStar,
  FaTimes,
} from "react-icons/fa";

import { Wines } from "../api/wines";
import { Users } from "../api/users";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";
import "./WineDetailsPage.css";
import ErrorBoundary from "../components/ErrorBoundary";
import { AuthContext } from "../context/auth.context";

export default function WineDetailsPage(props) {
  console.log("wine details props", props);
  const [wine, setWine] = useState({});
  // const [updateUser, setUpdateUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loved, setLoved] = useState(false);
  const [tried, setTried] = useState(false);
  const [wannaTry, setWannaTry] = useState(false);


  const { isLoggedIn, isLoading, user } = useContext(AuthContext);


  const checkUser = () => {
    if (isLoggedIn) {
      user.Favorite.map((userWine) => {
        if (userWine._id == wine._id) {
          setLoved(true)
        }
      })
      user.TriedInThePast.map((userWine) => {
        if (userWine._id == wine._id) {
          setTried(true)
        }
      })
      user.WantToTry.map((userWine) => {
        if (userWine._id == wine._id) {
          setWannaTry(true)
        }
      })
    }
  }

  async function fetchWine(id) {
    const response = await new Wines().getOne(id);
    setWine(response.data);
    setLoading(false);
  }
  // async function fetchUser(id) {
  //   const response = await new Users().getOne(id);
  //   setUpdateUser(response.data);
  //   setLoading(false);
  // }

  async function refreshWine(newWine) {
    await fetchWine(newWine._id);
  }
  // async function refreshUser() {
  //   await fetchUser(user._id);
  // }


  const handleLove = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("authToken");
      await new Users().addToLoved(
        { userId: user._id, wineId: wine._id },
        storedToken
      );
      setLoved(true);
    } catch (error) {
      console.error("Received error:", error);
      setErrorMessage(error.response.data.message);
    }
  };
  const handleTried = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("authToken");
      await new Users().addToTried(
        { userId: user._id, wineId: wine._id },
        storedToken
      );
      setTried(true);
    } catch (error) {
      console.error("Received error:", error);
      setErrorMessage(error.response.data.message);
    }
  };
  const handleWannaTry = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem("authToken");
      await new Users().addToWantToTry(
        { userId: user._id, wineId: wine._id },
        storedToken
      );
      setWannaTry(true);
    } catch (error) {
      console.error("Received error:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    checkUser(user)
    fetchWine(props.match.params.id);
  }, [user, isLoggedIn, props.match.params.id]);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="WineDetailsPage">
      <Block>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <Link className="has-text-grey-light" to={() => "/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="has-text-grey-light" to={() => "/search"}>
                Search Wines
              </Link>
            </li>
            <li className="is-active">
              <Link
                className="has-text-grey-light"
                to={() => `/wines/${wine._id}`}
              >
                {wine.title}
              </Link>
            </li>
          </ul>
        </nav>
      </Block>
      <Columns className="is-centered is-vcentered">
        <Columns.Column className="">
          <h2 className="wineDetailTitle">{wine.title}</h2>
        </Columns.Column>
        <Columns.Column className="is-narrow">
          <button
         
            className="button"
            onClick={(e) => handleLove(e) }
          >
            {loved ? <FaHeartBroken /> : <FaHeart />}
          </button>
          <button
            className="button"
            onClick={(e) => handleTried(e)}
          >
            {tried ? <FaRegStar /> : <FaStar />}
          </button>
          <button
            className="button"
            onClick={(e) => handleWannaTry(e)}
          >
            {wannaTry ? <FaTimes /> : <FaCheck />}
          </button>
        </Columns.Column>
      </Columns>
      {loading ? (
        <div style={{ fontSize: "128px" }}>
          <p>Loading ...</p>
        </div>
      ) : (
        <Box>
          {errorMessage}
          <Block className="">
            <b>Description:</b> {wine.description}
          </Block>
          <Block className="">
            <b>Average Price:</b> € {wine.price}
          </Block>
          <Block className="">
            <b>Variety:</b> {wine.variety}
          </Block>
          <Block className="">
            <b>Region:</b> {wine.region_1}
          </Block>
          <Block className="">
            <b>Province:</b> {wine.province}
          </Block>
          <Block className="">
            <b>Country:</b> {wine.country}
          </Block>
          <Block className="">
            <b>Winery:</b> {wine.winery}
          </Block>
          <Block className="">
            <b>Add your own review:</b>
            <ErrorBoundary>
              <AddReview wineId={wine._id} refreshWine={refreshWine} />
            </ErrorBoundary>
            <b>Reviews:</b>
            <div>
              <ErrorBoundary>
                {wine.reviews.map((element) => {
                  return (
                    <ReviewCard
                      key={element._id}
                      review={element}
                      refreshWine={refreshWine}
                      wine={wine}
                    />
                  );
                })}
              </ErrorBoundary>
            </div>
          </Block>
        </Box>
      )}
    </div>
  );
}

import PropTypes from "prop-types";
WineDetailsPage.propTypes = {
  match: PropTypes.object
}