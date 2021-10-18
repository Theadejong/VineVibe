import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bulma/css/bulma.min.css";
import ImageCarousel from "../components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Wines } from "../api/wines";
import Namloos2 from "../Images/Naamloos2.png";
import "./WineDetailsPage.css";
import ErrorBoundary from "../components/ErrorBoundary";

// import { useLoading } from 'react-use-loading';
// import LoadingPageAnimation from './components/LoadingPageAnimation';

export default function HomePage() {
  // const MyComponent = () => {
  //   const [{ isLoading }] = useLoading(true);
  // }
  const [wines, setWines] = useState([]);
  async function fetchWines() {
    const response = await new Wines().topWines();
    // console.log("this is the response", response);
    // console.log("this is the response data", response.data.winesTop);
    setWines(response.data.winesTop.slice(0, 1));
  }

  useEffect(() => {
    fetchWines();
  }, []);

  return (
    // <div>
    //   isLoading ? <LoadingPageAnimation /> :
    <div>
      <div className="columns is-centered">
        <div className="column is-4">
          <ErrorBoundary>
            <ImageCarousel />
          </ErrorBoundary>
        </div>
        <div className="column is-8">
          <div className="has-text-centered">
            <img src={Namloos2} className="logoPosition" alt="logo" />
          </div>
          <p>
            “One should always be drunk. That’s all that matters...But with what?
            With wine, with poetry, or with virtue, as you chose. But get drunk.” ―
            Charles Baudelaire
          </p>
          <div>
            <h2 className="is-size-1">Wine of the month:</h2>
            <ErrorBoundary>
              {wines.map((wine) => {
                return (
                  <Link key={wine._id} to={() => `/wine/${wine._id}`}>
                    {wine.title}
                  </Link>
                );
              })}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
