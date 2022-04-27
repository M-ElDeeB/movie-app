import React, { useState, useEffect } from "react";
import { Col, Row, InputGroup, FormControl, Alert } from "react-bootstrap";
import axios from "axios";
import Movie from "../components/movie/Movie";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("movie");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=c90d4947c47491246c4f4016cd12c273&query=${searchTerm}`
        );
        setData(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div className="search">
      <Row>
        <Col md={12}>
          <div className="content text-center w-100 mt-5">
            <h4>
              Makes it easy to find and enjoy the entertainment <br /> you love
              in one place
            </h4>
            <form className="w-75 m-auto my-5 search-form">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter a Movie Title..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text id="basic-addon1">
                  <i className=" p-2 fa-solid fa-magnifying-glass searchIcon"></i>
                </InputGroup.Text>
              </InputGroup>
            </form>
          </div>
        </Col>
        {error && (
          <Alert variant="warning" className="m-auto w-50">
            Something Went Wrong.... Please Try Again
          </Alert>
        )}
        {data &&
          data.map((movie, index) => (
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
  );
};

export default Search;
