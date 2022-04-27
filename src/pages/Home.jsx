import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Alert, Col, Pagination, Row } from "react-bootstrap";
import Movie from "../components/movie/Movie";
import { Spinner } from "react-bootstrap";
const Home = () => {
  const [movieData, setData] = useState(null);
  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (page = 1) => {
    try {
      setIsLoading(true);
      setActive(page);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=c90d4947c47491246c4f4016cd12c273&page=${page}`
      );
      setData(data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let items = [];
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => fetchData(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const paginationBasic = (
    <Pagination>
      {items}
      <Pagination.Ellipsis />
    </Pagination>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="homePage mt-5">
        <Row>
          <Col md={12}>
            <div className="text-center mb-5">
              <h1 className="h1 welcome-heading">
                Trending Movies To Watch Now
              </h1>
              <p className="welcome-paragraph fs-5">
                Makes it easy to find and enjoy the entertainment
                <br /> you love in one place
              </p>
            </div>
          </Col>
          {isLoading && (
            <div className="spinner-box">
              <Spinner animation="grow" className="loading-spinner" />
            </div>
          )}
          {movieData &&
            movieData.map((movie, index) => (
              <Movie
                type="movie"
                id={movie.id}
                key={index}
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
              />
            ))}

          {error && (
            <Alert variant="warning" className="m-auto w-50">
              Something Went Wrong.... Please Try Again
            </Alert>
          )}
          {movieData && (
            <Col xs={12} sm={6}   md={12} className="text-center px-3">
              <div className="d-flex justify-content-center mt-5">
                {paginationBasic}
              </div>
            </Col>
          )}
        </Row>
      </div>
    </motion.div>
  );
};

export default Home;
