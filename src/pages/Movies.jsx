import React from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import Movie from "../components/movie/Movie";
import useFetchData from "../hooks/useFetchData";

const Movies = () => {
  const {
    error,
    isLoading,
    result: popularMovies,
  } = useFetchData(
    "https://api.themoviedb.org/3/movie/popular?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
  );
  const { result: topRatedMovies } = useFetchData(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
  );
  const { result: upcomingMovies } = useFetchData(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
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
              Trending Popular <br />
              Movies
              <br /> To Watch Now
            </h1>
            <p className=" home-paragraph">
              Makes it easy to find and enjoy the entertainment
              <br /> you love in one place.
            </p>
          </Col>
          {isLoading && (
            <div className="spinner-box">
              <Spinner animation="grow" className="loading-spinner" />
            </div>
          )}
          {error && (
            <Alert variant="warning" className="m-auto w-50">
              Something Went Wrong.... Please Try Again
            </Alert>
          )}
          {popularMovies &&
            popularMovies
              .slice(10)
              .map((movie, index) => (
                <Movie
                  type="movie"
                  id={movie.id}
                  key={index}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
        </Row>
      </div>
      <div className="homePage mt-5">
        <Row>
          <Col md={6}>
            <h1 className="h2 home-heading">
              Trending Top <br />
              Movies
              <br /> To Watch Now
            </h1>
            <p className=" home-paragraph">
            Makes it easy to find and enjoy the entertainment
              <br /> you love in one place.
            </p>
          </Col>

          {topRatedMovies &&
            topRatedMovies
              .slice(10)
              .map((movie, index) => (
                <Movie
                  type="movie"
                  id={movie.id}
                  key={index}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
        </Row>
      </div>
      <div className="homePage mt-5">
        <Row>
          <Col md={6}>
            <h1 className="h2 home-heading">
              Trending Upcoming <br />
              Movies
              <br /> To Watch Now
            </h1>
            <p className=" home-paragraph">
            Makes it easy to find and enjoy the entertainment
              <br /> you love in one place.
            </p>
          </Col>

          {upcomingMovies &&
            upcomingMovies
              .slice(10)
              .map((movie, index) => (
                <Movie
                  type="movie"
                  id={movie.id}
                  key={index}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
        </Row>
      </div>
    </motion.div>
  );
};

export default Movies;
