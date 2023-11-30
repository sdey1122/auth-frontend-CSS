import React from "react";
import { useUserContext } from "./UserContext";
import { Container, Typography } from "@mui/material";
import "../styles/customStyles.css"; // Make sure to import the CSS

const Home = () => {
  const { user } = useUserContext();

  return (
    <div className="register-background homepage-background">
      {" "}
      {/* Use same background class */}
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="homepage-text">
          {" "}
          {/* Apply the new animation class */}
          <Typography variant="h4" gutterBottom>
            Home Page
          </Typography>
          {user && (
            <Typography variant="body1">Welcome, {user.username}</Typography>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;
