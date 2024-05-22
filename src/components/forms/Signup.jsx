import React, { useContext, useState } from "react";
import "../../styles/forms.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataContext } from "../../contextAPI/Context";

const Signup = () => {
  const { navigate } = useContext(DataContext);
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const validateForm = () => {
    let error = {};
    const { name, email, password } = signupFormData;

    if (name === "") {
      error.name = "Please provide your name to proceed.";
    }

    if (email === "") {
      error.email = "Your email is required to create an account.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error.email = "Invalid email format.";
      }
    }

    if (password === "") {
      error.password = "A password is necessary for account security.";
    } else {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        error.password = "Password should be strong. ex : P@ssw0rd";
      }
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const handleStorage = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let updatedUsers = [...users, signupFormData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("token", signupFormData.email);
        let citiesInfo = JSON.parse(localStorage.getItem("cities")) || [];
        const newUserCityInfo = [
          ...citiesInfo,
          { email: signupFormData.email, cities: [] },
        ];
        localStorage.setItem("cities", JSON.stringify(newUserCityInfo));
        return true;
      };

      if (handleStorage()) {
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <div className="form-title">
        <h2>Join With Us Today!</h2>
      </div>

      <p className="form-info-text">
        Create an account to get personalized weather updates.
      </p>
      <div className="line-break"></div>

      <div className="input-fields">
        <div className="input-group">
          <label htmlFor="name" className="label">
            <FaUser />
            Name
            <span className="star-text">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="Enter your name here..."
            autoComplete="off"
            onChange={handleChange}
          />
          {formError.name && <span className="err-text">{formError.name}</span>}
        </div>
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
        Sign up
      </button>

      <p className="redirect-text">
        Already have an account ? <Link to="/login">Login</Link>{" "}
      </p>
    </form>
  );
};

export default Signup;
