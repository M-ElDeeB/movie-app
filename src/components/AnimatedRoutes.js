import React from "react";
import Home from ".././pages/Home";
import Login from ".././pages/Login";
import Register from ".././pages/Register";
import MovieDetails from ".././pages/MovieDetails";
import TvShow from ".././pages/TvShow";
import Movies from ".././pages/Movies";
import People from ".././pages/People";
import NotFound from ".././pages/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import Search from "../pages/Search";


const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} ket={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="details"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          >
            <Route path=":type/:id" element={<MovieDetails />} />
          </Route>
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="tvshow"
            element={
              <ProtectedRoute>
                <TvShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login  />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
