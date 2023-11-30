import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./UserContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/customStyles.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { login } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset specific error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email cannot be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password cannot be empty";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const response = await axios.post(
          "http://localhost:3089/api/users/login",
          formData
        );
        login({ username: response.data.username, token: response.data.token }); // Update based on your actual response structure
        navigate("/");
      } catch (error) {
        setLoginMessage("Invalid email or password");
      }
    }
  };

  return (
    <div className="login-background">
      {" "}
      {/* Same background class as Register for consistency */}
      <Container maxWidth="sm" className="login-container">
        {" "}
        {/* Same container class as Register */}
        <Typography
          variant="h4"
          component="h1"
          className="login-heading"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          {loginMessage && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {loginMessage}
            </Typography>
          )}
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Not a member?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Login;
