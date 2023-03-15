import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "react-bootstrap";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className="main">{children}</Container>
      <Footer />
    </div>
  );
};
