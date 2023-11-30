import React from "react";
import { useUserContext } from "./UserContext";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const { user } = useUserContext();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      {user && (
        <Typography variant="body1">Welcome, {user.username}</Typography>
      )}
    </Container>
  );
};

export default Home;
