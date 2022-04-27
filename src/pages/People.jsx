import React from "react";
import useFetchData from "../hooks/useFetchData";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Movie from "../components/movie/Movie";
import { motion } from "framer-motion";

const People = () => {
  const {
    error,
    isLoading,
    result: popularPeople,
  } = useFetchData(
    "https://api.themoviedb.org/3/person/popular?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US"
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
              Popular <br />
              People
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
          {popularPeople &&
            popularPeople.map((movie, index) => (
              <Movie
                type="person"
                id={movie.id}
                key={index}
                poster_path={movie.profile_path}
                title={movie.name}
              />
            ))}
        </Row>
      </div>
    </motion.div>
  );
};

export default People;
