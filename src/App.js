import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbars from "./components/navbar/Navbars";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/footer/Footer";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const { getUserData } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, [getUserData]);

  return (
    <>
      <Navbars />
      <Container fluid="md">
        <AnimatedRoutes />
      </Container>
      <Footer />
    </>
  );
}

export default App;
