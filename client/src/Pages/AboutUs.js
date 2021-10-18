import React from "react";
import theGroup from "../Images/theGroup.jpeg";
import thea from "../Images/thea.jpg"
import mathijs from "../Images/mathijs.jpeg";
import jesse from "../Images/jesse.jpeg";
import cooper from "../Images/Cooper.jpg";
import { motion } from "framer-motion";
import "./WineDetailsPage.css";

export default function AboutUs() {

  const handleClickCooper = () => {
    window.open("https://www.linkedin.com/in/cooper-bjorkelund/");
  };
  const handleClickJesse = () => {
    window.open("https://www.linkedin.com/in/jessevermeulen123/");
  };
  const handleClickMathijs = () => {
    window.open("https://www.linkedin.com/in/mathijsvanginneken/");
  };
  const handleClickThea = () => {
    window.open("https://www.linkedin.com/in/theadejong1985/");
  };

  
  return (
    <div>
      <section className="hero">
        <div className="hero-body">
          <div className="columns is-centered">
            <div className="column is-narrow">
              <h1 className="">
                About Us
              </h1>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <img className="aboutImage" src={theGroup} alt="group photo of founders" />
              <br />
              * Cooper took this photo
            </div>
          </div>
        </div>
      </section>
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow has-text-centered">
          <h1>
            Cooper Bjorkelund
          </h1>
          <p className="block">
            Clean haircuts and even cleaner code, backend aficionado that bakes his own pizza.
          </p>
          <motion.button onClick={handleClickCooper} className="button is-small"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>LinkedIn</motion.button>
        </div>
        <div className="column is-narrow">
          <img className="peronalImage" src={cooper} alt="cooper" />
        </div>
      </div>
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <img className="peronalImage" src={jesse} alt="jesse" />
        </div>
        <div className="column is-narrow has-text-centered">
          <h1>
            Jessé Vermeulen
          </h1>
          <p className="block">
            Colourful chaotic copywriter. Powering UX dreams with frog memes. 🐸
          </p>
          <motion.button onClick={handleClickJesse} className="button is-small"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>LinkedIn</motion.button>
        </div>
      </div>
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow has-text-centered">
          <h1>
            Mathijs van Ginneken
          </h1>
          <p className="block">
            Mixologist and animation library master. Will always help centre an image.
          </p>
          <motion.button onClick={handleClickMathijs} className="button is-small"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>LinkedIn</motion.button>
        </div>
        <div className="column is-narrow">
          <img className="peronalImage" src={mathijs} alt="mathijs" />
        </div>
      </div>
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <img className="peronalImage" src={thea} alt="thea" />
        </div>
        <div className="column is-narrow has-text-centered">
          <h1>
            Thea de Jong
          </h1>
          <p className="block">
            The voice of reason, manages people and can stop a bug from a mile away.
          </p>
          <motion.button onClick={handleClickThea} className="button is-small"  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>LinkedIn</motion.button>
        </div>
      </div>
    </div>
  );
}
