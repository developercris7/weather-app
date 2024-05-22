import React, { useContext, useState } from "react";
import "../../styles/forms.css";
import { DataContext } from "../../contextAPI/Context";
import { IoMdClose } from "react-icons/io";

const EditForm = () => {
  const {
    images,
    setFormDisplay,
    fetchData,
    weatherInfo,
    setWeatherInfo,
    convertUnixTimestampToTimeString,
    editFormData,
    setEditFormData,
    handleStoreCities,
  } = useContext(DataContext);

  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const validateForm = () => {
    let error = {};
    const { city, country } = editFormData;

    if (city === "") {
      error.city = "Please provide the city name to proceed.";
    }

    if (country === "") {
      error.country = "Please provide the country name to proceed.";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  };

  const handleEditLocation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { id, city, country, nickname } = editFormData;

      fetchData(city, country).then((data) => {
        if (data.cod === "404") {
          setFormError({ city: "Invalid City name !" });
        } else {
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

          setEditFormData({ city: "", country: "", nickname: "" });
          const updatedWeatherInfo = weatherInfo.map((info) =>
            info.id === id ? newLocation : info
          );

          setWeatherInfo(updatedWeatherInfo);
          handleStoreCities(updatedWeatherInfo);
          setFormDisplay("");
        }
      });
    }
  };

  return (
    <div className="location-form-container">
      <form onSubmit={handleEditLocation}>
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
          <h2>Edit location!</h2>
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
              value={editFormData.city}
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
              value={editFormData.country}
            />
            {formError.country && (
              <span className="err-text">{formError.country}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="nickname" className="label">
              Nickname (optional)
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="input"
              placeholder="Enter your password here..."
              autoComplete="off"
              onChange={handleChange}
              value={editFormData.nickname}
            />
            {formError.nickname && (
              <span className="err-text">{formError.nickname}</span>
            )}
          </div>
        </div>
        <button className="add-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditForm;
