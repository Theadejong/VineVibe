import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { AuthContext } from "../context/auth.context";
import { motion } from "framer-motion";
import namloos3 from "../Images/Naamloos3.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { isLoading, isLoggedIn, logOutUser } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar1 is-flex is-vcentered is-justify-content-space-between">
          <Link to="/" className="">
            <img src={namloos3} alt="icon" id="iconLeft" />
          </Link>
          <div>
          {isLoggedIn ? (
            <>
              <motion.button
                id="logButton"
                onClick={logOutUser}
                className="button is-normal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/signup">
                {" "}
                <motion.button
                  id="logButton"
                  className="button is-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Signup
                </motion.button>{" "}
              </Link>
              <Link to="/login">
                {" "}
                <motion.button
                  id="logButton"
                  className="button is-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Login
                </motion.button>{" "}
              </Link>
            </>
          )}
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
