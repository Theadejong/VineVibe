import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Wines from "../api/wines";
import wine from "../Images/aesop-wines-12MlCD5KlYw-unsplash.jpg";

export default function AddWine() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [variety, setVariety] = useState("");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [winery, setWinery] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      price,
      variety,
      region,
      province,
      country,
      winery,
    };

    try {
      try {
        const response = await new Wines().createOne(body);
        console.log(response);
        history.push(`/wine/${response.data.newWine._id}`);
      } catch (error) {
        setErrorMessage(`Received error: ${error.response.data.message}`);
      }

      //   setTitle("");
      //   setDescription("");
      //   setPrice("");
      //   setVariety("");
      //   setRegion("");
      //   setProvince("");
      //   setCountry("");
      //   setWinery("");

      // history.push("./wines");
    } catch (error) {
      //Discuss redirecting route
      console.log(error);
    }
  };
  return (
    <div className="position-addwine">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
              <form action="" onSubmit={handleSubmit}>
                <h3 className="is-3">Add new wine</h3>
                <div className="field">{errorMessage}</div>
                <div className="field">
                  <label>Title</label>
                  <div className="control">
                    <input
                      type="text"
                      name="title"
                      placeholder="Name of the wine"
                      className="input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Description</label>
                  <div className="control">
                    <input
                      type="text"
                      name="title"
                      placeholder="Description of the wine"
                      className="input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Average Price</label>
                  <div className="control">
                    <input
                      type="number"
                      name="price"
                      placeholder="€"
                      className="input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Variety</label>
                  <div className="control">
                    <input
                      type="text"
                      name="variety"
                      placeholder="Style of wine"
                      className="input"
                      value={variety}
                      onChange={(e) => setVariety(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Region</label>
                  <div className="control">
                    <input
                      type="text"
                      name="region"
                      placeholder="Region the wine comes from"
                      className="input"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Province</label>
                  <div className="control">
                    <input
                      type="text"
                      name="province"
                      placeholder="Province the wine comes from"
                      className="input"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Country</label>
                  <div className="control">
                    <input
                      type="text"
                      name="country"
                      placeholder="Country the wine comes from"
                      className="input"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <label>Winery</label>
                  <div className="control">
                    <input
                      type="text"
                      name="winery"
                      placeholder="Winery that produced the wine"
                      className="input"
                      value={winery}
                      onChange={(e) => setWinery(e.target.value)}
                     />
                  </div>
                </div>
                <div className="field">
                  <motion.button
                    className="button"
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Add wine
                  </motion.button>
                </div>
              </form>
            </div>
            <div className="column is-6">
              <img className="addWine" src={wine} alt="wine" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
