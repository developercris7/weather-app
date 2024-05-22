import React, { useContext } from "react";
import "../styles/cityinfo.css";
import { DataContext } from "../contextAPI/Context";
import { IoMdClose } from "react-icons/io";
import { MdEditLocationAlt } from "react-icons/md";

const CityInfo = ({ city }) => {
  const {
    setFormDisplay,
    weatherInfo,
    setWeatherInfo,
    setEditFormData,
    handleStoreCities,
  } = useContext(DataContext);

  const handleEdit = () => {
    setEditFormData(city);
    setFormDisplay("edit");
  };

  const handleDelete = () => {
    const updatedLocation = weatherInfo.filter((info) => info.id !== city.id);
    setWeatherInfo(updatedLocation);
    handleStoreCities(updatedLocation);
  };

  return (
    <div className="city-info-container">
      <div className="city-option-icons">
        <button className="edit-btn" onClick={handleEdit}>
          <MdEditLocationAlt />
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          <IoMdClose />
        </button>
      </div>

      <div className="info-wrapper">
        <div className="weather-info">
          <span className="celcius-text">{Math.floor(city.temp)} °C </span>
          <span className="desc-text">{city.desc}</span>
          <div className="add-info-wrapper">
            <div className="add-info">
              <span>Humidity</span>
              <span> {city.humidity} %</span>
            </div>

            <div className="add-info">
              <span>Wind </span>
              <span>{city.windspeed} m/s</span>
            </div>
          </div>
          <div className="sun-info">
            <div className="rise-time">
              <img
                src="https://cdn-icons-png.flaticon.com/128/9231/9231550.png"
                alt="sunrise"
                width={25}
              />
              <span>{city.sunrise} AM</span>
            </div>
            <div className="rise-time">
              <img
                src="https://cdn-icons-png.flaticon.com/128/9231/9231546.png "
                alt="sunset"
                width={25}
              />
              <span>{city.sunset} PM</span>
            </div>
          </div>
        </div>

        <div className="city-info">
          <img src={city.img} alt="Climate" width={75} />
          <span className="city-name">
            {city.city}, {city.country}
          </span>
          <span>{city.nickname}</span>
        </div>
      </div>
    </div>
  );
};

export default CityInfo;
