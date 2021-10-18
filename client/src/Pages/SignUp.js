import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Users } from "../api/users";
import { AuthContext } from "../context/auth.context";
import wine from "../Images/aesop-wines-12MlCD5KlYw-unsplash.jpg";

import "./SignUp.css";

export default function SignUp() {
  const { logInUser } = useContext(AuthContext);
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password };
    const storedToken = localStorage.getItem("authToken");

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    try {
      const resp = await new Users().createOne(requestBody, storedToken);
      await logInUser(resp.data.authToken);
      history.push(`/user`);
    } catch (error) {
      console.log("line 31", error.response);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="container sign-up">
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <img src={wine} alt="wine" />
        </div>
        <div className="column is-3">
          <form
            action="/users/create-user"
            method="POST"
            className="box"
            onSubmit={handleSignupSubmit}
          >
            <h3 className="is-3 has-text-centered">Sign up</h3>
            <div className="field" style={{ fontSize: "12px" }} />
            <div className="field">
              <label htmlFor="username" className="label">
                Username
              </label>
              <div className="control">
                <input
                  type="username"
                  placeholder="e.g. VineVibe"
                  className="input"
                  value={username}
                  onChange={handleUserName}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control">
                <input
                  htmlFor="email"
                  type="email"
                  placeholder="e.g. your_email@VineVibe.com"
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
                  placeholder="********"
                  className="input"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
              <div className="field" style={{ fontSize: "12px" }}>
                <Link to={"/Userlogin"}>
                  Already have an account? Login here
                </Link>
              </div>
              <div className="field is-flex is-justify-content-center">
                <div className="control">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="button"
                  >
                    Sign up
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
