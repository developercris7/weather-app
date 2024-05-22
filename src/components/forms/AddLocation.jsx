import React, { useContext, useState } from "react";
import "../../styles/forms.css";
import { DataContext } from "../../contextAPI/Context";
import { IoMdClose } from "react-icons/io";

const AddLocation = () => {
  const {
    images,
    setFormDisplay,
    fetchData,
    weatherInfo,
    setWeatherInfo,
    convertUnixTimestampToTimeString,
    handleStoreCities,
  } = useContext(DataContext);

  const [locationFormData, setLocationFormData] = useState({
    city: "",
    country: "",
    nickname: "",
  });

  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationFormData({ ...locationFormData, [name]: value });
  };

  const validateForm = () => {
    let error = {};
    const { city, country } = locationFormData;

    if (city === "") {
      error.city = "Please provide the city name to proceed.";
    }

    if (country === "") {
      error.country = "Please provide the country name to proceed.";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { city, country, nickname } = locationFormData;
      fetchData(city, country).then((data) => {
        if (data.cod === "404") {
          setFormError({ city: "Invalid City name !" });
        } else {
          const id =
            weatherInfo.length === 0
              ? 1
              : weatherInfo[weatherInfo.length - 1].id + 1;

          const weather = data.weather[0].main;

          const weatherImg = images.find((image) =>
            image.main.includes(weather)
          );

          const newLocation = {
            id,
            city: data.name,
            country: data.sys.country,
            nickname: nickname,
            humidity: data.main.humidity,
            windspeed: data.wind.speed,
            img: weatherImg.img,
            temp: data.main.temp,
            desc: weather,
            sunrise: convertUnixTimestampToTimeString(data.sys.sunrise),
            sunset: convertUnixTimestampToTimeString(data.sys.sunset),
          };
          setWeatherInfo([...weatherInfo, newLocation]);
          handleStoreCities([...weatherInfo, newLocation]);
          setLocationFormData({ city: "", country: "", nickname: "" });
        }
      });
    }
  };

  return (
    <div className="location-form-container">
      <form onSubmit={handleAddLocation}>
        <IoMdClose
          className="form-close-btn"
          onClick={() => setFormDisplay("")}
        />
        <div className="form-title">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9931/9931671.png"
            alt="location-icon"
            width={40}
          />
          <h2>Add location!</h2>
        </div>

        <p className="form-info-text">
          Please Enter the names of city and country, you want to see the
          weather information.
        </p>
        <div className="line-break"></div>
        <div className="input-fields">
          <div className="input-group">
            <label htmlFor="city" className="label">
              City
              <span className="star-text">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="input"
              placeholder="Enter the city here..."
              autoComplete="off"
              onChange={handleChange}
              value={locationFormData.city}
            />
            {formError.city && (
              <span className="err-text">{formError.city}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="country" className="label">
              Country
              <span className="star-text">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="input"
              placeholder="Enter the country here..."
              autoComplete="off"
              onChange={handleChange}
              value={locationFormData.country}
            />
            {formError.country && (
              <span className="err-text">{formError.country}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="nickname" className="label">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="input"
              placeholder="Enter your password here..."
              autoComplete="off"
              onChange={handleChange}
              value={locationFormData.nickname}
            />
            {formError.nickname && (
              <span className="err-text">{formError.nickname}</span>
            )}
          </div>
        </div>

        <button className="add-btn" type="submit">
          Add Location
        </button>
      </form>
    </div>
  );
};

export default AddLocation;
