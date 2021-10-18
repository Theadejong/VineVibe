import { motion } from "framer-motion";
import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Users } from "../api/users";
import { AuthContext } from "../context/auth.context";
import wine from "../Images/aesop-wines-12MlCD5KlYw-unsplash.jpg";
import "./UserLogin.css";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { logInUser } = useContext(AuthContext);
  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await new Users().login(requestBody, storedToken);
      const token = response.data.authToken;
      logInUser(token);
      history.push("/user");
    } catch (error) {
      console.log("Received error:", error);
      let errorDescription = `${error}`;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorDescription = error.response.data.message;
      }
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="container user-login">
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <img src={wine} alt="wine" />
        </div>
        <div className="column is-3">
          <form
            action="/users/login"
            method="POST"
            className="box"
            onSubmit={handleLoginSubmit}
          >
            <h3 className="is-3 has-text-centered">Login</h3>
            <div className="field" />
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control">
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. your_email@Vinevibe.com"
                  className="input"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" type="password" className="label">
                Password
              </label>
              <div className="control">
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
            </div>
            <div className="field is-flex is-justify-content-center">
              <div className="control">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="button"
                  type="submit"
                >
                  Login
                </motion.button>
              </div>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
