import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
const MovieDetails = () => {
  let { type, id } = useParams();
  const [details, setDetails] = useState({});
  let data;

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=c90d4947c47491246c4f4016cd12c273&language=en-US`
      );
      setDetails(data);
    };
    fetchData();
  }, [type, id]);

  switch (type) {
    case "movie":
      data = {
        img: `https://image.tmdb.org/t/p/w500/${details.poster_path}`,
        title: details.original_title,
        tagline: details.tagline,
        genres: details.genres,
        vote_average: details.vote_average,
        popularity: details.popularity,
        vote_count: details.vote_count,
        release_date: details.release_date,
        overview: details.overview,
      };
      break;
    case "tv":
      data = {
        img: `https://image.tmdb.org/t/p/w500/${details.poster_path}`,
        title: details.name,
        tagline: details.tagline,
        genres: details.genres,
        vote_average: details.vote_average,
        popularity: details.popularity,
        vote_count: details.vote_count,
        release_date: details.first_air_date,
        overview: details.overview,
      };
      break;
    case "person":
      data = {
        img: `https://image.tmdb.org/t/p/w500/${details.profile_path}`,
        name: details.name,
        known_for_department: "Acting",
        birthday: details.birthday,
        place_of_birth: details.place_of_birth,
        popularity: details.popularity,
        biography: details.biography,
      };
      break;
    default:
      break;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {type === "person" ? (
        <>
          <div className="details">
            <Row className="mt-5 ">
              <Col md={4}>
                <div className="img mb-3">
                  {data.img && <img src={data.img} alt={data.title} />}
                </div>
              </Col>
              <Col md={8}>
                <div className="info">
                  <h2>{data.name}</h2>
                  <ul className="list1">
                    <li className="list-item">{data.known_for_department}</li>
                  </ul>
                  <ul className="list2">
                    <li>
                      <span>birthday: </span>
                      {data.birthday}
                    </li>
                    <li>
                      <span>place of birth: </span>
                      {data.place_of_birth}
                    </li>

                    <li>
                      <span>Popularity: </span>
                      {data.popularity}
                    </li>
                  </ul>
                  <p className="mb-3">{data.biography}</p>
                </div>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className="details">
          <Row className="mt-5">
            <Col md={4}>
              <div className="img">
                {data.img && <img src={data.img} alt={data.title} />}
              </div>
            </Col>
            <Col md={8}>
              <div className="info">
                <h2>{data.title}</h2>
                <p>{data.tagline}</p>
                <ul className="list1">
                  {data.genres &&
                    data.genres.map((item, index) => (
                      <li key={index} className="list-item">
                        {item.name}
                      </li>
                    ))}
                </ul>
                <ul className="list2">
                  <li>
                    <span>Vote: </span>
                    {data.vote_average}
                  </li>
                  <li>
                    <span>Popularity: </span>
                    {data.popularity}
                  </li>
                  <li>
                    <span>vote count: </span>
                    {data.vote_count}
                  </li>
                  <li>
                    <span>release date: </span>
                    {data.release_date}
                  </li>
                </ul>
                <p>{data.overview}</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </motion.div>
  );
};

export default MovieDetails;
