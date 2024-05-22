import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import CityInfo from "../components/CityInfo";
import AddLocation from "../components/forms/AddLocation";
import EditForm from "../components/forms/EditForm";
import { DataContext } from "../contextAPI/Context";
import ClipLoader from "react-spinners/ClipLoader";
import { FaLocationDot } from "react-icons/fa6";

const Home = () => {
  const {
    navigate,
    token,
    setUser,
    searchInput,
    formDisplay,
    weatherInfo,
    setWeatherInfo,
    isLoading,
    setFormDisplay
  } = useContext(DataContext);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (token) {
        const users = await JSON.parse(localStorage.getItem("users"));
        const userInfo = users.find((user) => user.email === token);
        const cities = JSON.parse(localStorage.getItem("cities"));
        const citiesInfo = cities.find((city) => city.email === token);
        setUser(userInfo);
        setWeatherInfo(citiesInfo.cities);
      } else {
        navigate("/signup");
      }
    };
    handleAuthentication();
  }, [token, navigate, setUser, setWeatherInfo]);

  const filteredWeatherInfo = weatherInfo.filter((info) =>
    info.city.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Options />
      {isLoading ? (
        <div className="message-container">
          <ClipLoader
            color={"white"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="city-wrapper">
          {weatherInfo.length > 0 ? (
            filteredWeatherInfo.length > 0 ? (
              filteredWeatherInfo.map((info) => (
                <CityInfo city={info} key={info.id} />
              ))
            ) : (
              <div className="message-container">
                <img
src="https://cdn-icons-png.flaticon.com/128/14025/14025695.png"
                  alt="location"
                />
                <h3>No Locations Available</h3>
                <p>
                  It looks no location found based on your search. To see the
                  weather forecast, please add a location.
                </p>
                <button
                  className="location-btn"
                  onClick={() => setFormDisplay("add")}
                >
                  <FaLocationDot />
                  <p>Add Location</p>
                </button>
              </div>
            )
          ) : (
            <div className="message-container">
              <img
              src="https://cdn-icons-png.flaticon.com/128/14025/14025695.png"
                alt="location"
              />
              <h3>No Locations Available</h3>
              <p>
                It looks like you haven't added any locations yet. To see the
                weather forecast, please add a location.
              </p>
              <button
                className="location-btn"
                onClick={() => setFormDisplay("add")}
              >
                <FaLocationDot />
                <p>Add Location</p>
              </button>
            </div>
          )}
        </div>
      )}

      {formDisplay && formDisplay === "add" ? (
        <AddLocation />
      ) : formDisplay === "edit" ? (
        <EditForm />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
