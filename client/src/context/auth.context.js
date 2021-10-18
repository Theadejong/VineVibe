import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import { Users } from "../api/users";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [storedTokenState, setStoredTokenState] = useState(null)
  // const logInUser = (token) => {
  //   localStorage.setItem('authToken', token);
  //}
  const verifyStoredToken = async () => {
    const storedToken = localStorage.getItem("authToken");
    console.log("18 Stored token:", storedToken);
    // setStoredTokenState(storedToken)

    if (storedToken) {
      try {
        const response = await new Users().verifyToken(storedToken);
        console.log("Successfully verified JWT:", response);
        try {
          const fullUserResponse = await new Users().getOne(
            response.data._id,
            storedToken
          );

          const user = fullUserResponse.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        } catch (error) {
          let msg = error;
          if (error.response.data.message !== undefined) {
            msg = error.response.data.message
          }
          console.log(
            "Failed to fetch user after successfully verifying the JWT:",
            msg
          );
        }
      } catch (error) {
        console.log("error:", error)
        console.log(
          "Failed to fetch user after successfully verifying the JWT:",
          error.response.data.message
        );
        console.log("storedToken 37", storedToken);
        console.log("line 38 Failed to verify JWT:", error);
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  const logInUser = async (token) => {
    localStorage.setItem("authToken", token);
    await verifyStoredToken();
  };
  const logOutUser = () => {
    localStorage.removeItem("authToken");
    //Update the state variables
    setIsLoggedIn(false);
    setUser(null);
  };
  useEffect(() => {
    verifyStoredToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
}

export { AuthProviderWrapper, AuthContext };
