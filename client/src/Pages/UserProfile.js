import React from "react";
import { useContext, useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Box } from "react-bulma-components";
import {Users} from "../api/users"
import "../App.css";
import Tabs from "../components/Tabs";
import { AuthContext } from "../context/auth.context";
import {
  FaCheck,
  FaHeart,
  FaStar,
} from "react-icons/fa";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState(user)
  const authToken = localStorage.getItem('authToken')
  async function fetchUser(id) {
    const response = await new Users().getOne(id, authToken );
    setUpdatedUser(response.data);
  }

  useEffect(()=> {
    fetchUser(user._id)
  }, [])

  return (
    <div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-centered">
            <div className="column is-6 is-offset-1">
              <h1 className="is-2">Hello, {user.username}!</h1>
              <h2 className="is-4">Welcome to your personal wine cellar</h2>
              <br />
              <p>
                Here, you can have a virtual tasting of all of the wines you
                have experienced, the wines that you have loved and the wines
                you still want to explore
              </p>
              {/* <p className="has-text-centered">
                        <motion.button className="button" href="/">
                            Edit Profile
                        </motion.button>
                    </p> */}
            </div>
          </div>
        </div>
      </div>
      <Tabs>
        <div label="Most Loved ♥︎"><FaHeart />
          A collection of your favorite wines
          {updatedUser.Favorite.map((wine) => {
            return (
              <Link key={wine._id} to={() => `/wine/${wine._id}`}>
                <Box className="is-size-3">{wine.title}</Box>
              </Link>
            );
          })}
        </div>
        <div label="Have Tried ✓" src={FaCheck}> <FaCheck />
          All the wines that you&apos;ve tried
          {updatedUser.TriedInThePast.map((wine) => {
            return (
              <Link key={wine._id} to={() => `/wine/${wine._id}`}>
                <Box className="is-size-3">{wine.title}</Box>
              </Link>
            );
          })}
        </div>
        <div label="Want to try ★"> <FaStar />
          Wines to look forward to
          {updatedUser.WantToTry.map((wine) => {
            return (
              <Link key={wine._id} to={() => `/wine/${wine._id}`}>
                <Box className="is-size-3">{wine.title}</Box>
              </Link>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
