import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Movie.css";
const Movie = ({ poster_path, title, vote_average, id, type }) => {
  return (
    <>
      {poster_path && (
        <Col xs={12} sm={6} md={4} lg={3}>
          <Link to={`/details/${type}/${id}`}>
            <div className="movie position-relative  overflow-hidden mb-4 ">
              <img
                className="w-100 movie-img"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
              />
              <div className="movie-title ">
                <h5>{title}</h5>
              </div>
              {vote_average > 0 && (
                <>
                  {
                    <span className="star">
                      <i className="fa-solid fa-star"></i> {vote_average}
                    </span>
                  }
                </>
              )}
            </div>
          </Link>
        </Col>
      )}
    </>
  );
};

export default Movie;
