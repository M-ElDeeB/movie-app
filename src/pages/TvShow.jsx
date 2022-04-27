import React from "react";
import { Col, Row } from "react-bootstrap";
import Movie from "../components/movie/Movie";
import useFetchData from "../hooks/useFetchData";
import { motion } from "framer-motion";
const Movies = () => {
  const { result: popularTv } = useFetchData(
    "https://api.themoviedb.org/3/tv/popular?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
  );
  const { result: TopRatedTv } = useFetchData(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="homePage mt-5">
        <Row>
          <Col md={6}>
            <h1 className="h2 home-heading">
              Trending <br />
              Popular Tv
              <br /> To Watch Now
            </h1>
            <p className=" home-paragraph">
            Makes it easy to find and enjoy the entertainment
              <br /> you love in one place.
            </p>
          </Col>

          {popularTv &&
            popularTv
              .slice(0, 15)
              .map((movie, index) => (
                <Movie
                  type="tv"
                  id={movie.id}
                  key={index}
                  poster_path={movie.poster_path}
                  title={movie.original_name}
                  vote_average={movie.vote_average}
                />
              ))}
        </Row>
      </div>
      <div className="homePage mt-5">
        <Row>
          <Col md={6}>
            <h1 className="h2 home-heading">
              Top <br />
              Trending Tv
              <br /> To Watch Now
            </h1>
            <p className=" home-paragraph">
            Makes it easy to find and enjoy the entertainment
              <br /> you love in one place.
            </p>
          </Col>

          {TopRatedTv &&
            TopRatedTv.slice(0, 15).map((movie, index) => (
              <Movie
                type="tv"
                id={movie.id}
                key={index}
                poster_path={movie.poster_path}
                title={movie.original_name}
                vote_average={movie.vote_average}
              />
            ))}
        </Row>
      </div>
    </motion.div>
  );
};

export default Movies;
