import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const Welcome = () => {
  return (
    <div>
      <Jumbotron>
        <h2>Welcome to Areddit.</h2>
        <p>A social media app built using modren JavaScript</p>
        <p>
          <Button variant="primary" as={Link} to="/signup">
            Sign Up
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Welcome;
