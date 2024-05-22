import React, { useContext, useState } from "react";
import "../../styles/forms.css";
import { MdEmail } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataContext } from "../../contextAPI/Context";

const LoginForm = () => {
  const { navigate } = useContext(DataContext);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const validateForm = () => {
    let error = {};
    const { email, password } = loginFormData;

    if (email === "") {
      error.email = "Your email is required to login.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error.email = "Invalid email format.";
      }
    }

    if (password === "") {
      error.password = "A password is necessary for login.";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const handleStorage = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.length > 0) {
          const checkUserExist = users.find(
            (users) => users.email === loginFormData.email
          );
          if (!checkUserExist) {
            setFormError({
              ...formError,
              email: "User not exists! please create account.",
            });
          }

          if (
            checkUserExist &&
            checkUserExist.password !== loginFormData.password
          ) {
            setFormError({
              ...formError,
              email: "",
            });
            setFormError({
              ...formError,
              password: "Invalid password! try again.",
            });
          } else {
            return true;
          }
        } else {
          setFormError({
            ...formError,
            email: "User not exists! please create account.",
          });
        }
      };
      if (handleStorage()) {
        localStorage.setItem("token", loginFormData.email);
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="form-title">
        <h2>Welcome Back !</h2>
      </div>

      <p className="form-info-text">
        Your Personalized weather forecast is just a click away.
      </p>
      <div className="line-break"></div>

      <div className="input-fields">
        <div className="input-group">
          <label htmlFor="email" className="label">
            <MdEmail />
            Email
            <span className="star-text">*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="input"
            placeholder="Enter your email here..."
            autoComplete="off"
            onChange={handleChange}
          />
          {formError.email && (
            <span className="err-text">{formError.email}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password" className="label">
            <MdOutlineSecurity />
            Password
            <span className="star-text">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Enter your password here..."
            autoComplete="off"
            onChange={handleChange}
          />
          {formError.password && (
            <span className="err-text">{formError.password}</span>
          )}
        </div>
      </div>

      <button className="submit-btn" type="submit">
        Login
      </button>

      <p className="redirect-text">
        Don't have an account ? <Link to="/signup">Sign up</Link>{" "}
      </p>
    </form>
  );
};

export default LoginForm;
