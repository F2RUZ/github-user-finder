import React from "react";
import { Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <HomePage />
      </Container>
    </>
  );
}

export default App;
