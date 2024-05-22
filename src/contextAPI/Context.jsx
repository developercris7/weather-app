import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  let token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const images = [
    {
      main: ["Rain", "Drizzle", "Thunderstorm"],
      img: "https://cdn-icons-png.flaticon.com/128/3026/3026395.png",
    },
    {
      main: ["Clouds", "Mist", "Fog", "Haze"],
      img: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
    },
    {
      main: ["Clear", "Sunny"],
      img: "https://cdn-icons-png.flaticon.com/128/869/869869.png",
    },
  ];
  const [formDisplay, setFormDisplay] = useState("");

  const [weatherInfo, setWeatherInfo] = useState([]);

  const [editFormData, setEditFormData] = useState({
    city: "",
    country: "",
    nickname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // Functions
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchData = async (city, country) => {
    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=7e73fb13f44394468ea27e95c17178c9`;
    const weatherInfo = await fetch(weather);
    const data = await weatherInfo.json();
    return data;
  };

  function convertUnixTimestampToTimeString(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); 
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
    return `${formattedHours}:${formattedMinutes} `;
  }

  const handleRefresh = async () => {
    setIsLoading(true);
    const refreshedData = await Promise.all(
      weatherInfo.map(async (info) => {
        const cityWeatherData = await fetchData(info.city, info.country);
        const weather = cityWeatherData.weather[0].main;
        const weatherImg = images.find((image) => image.main.includes(weather));

        const newLocation = {
          id: info.id,
          city: cityWeatherData.name,
          country: cityWeatherData.sys.country,
          nickname: info.nickname,
          humidity: cityWeatherData.main.humidity,
          windspeed: cityWeatherData.wind.speed,
          img: weatherImg.img,
          temp: cityWeatherData.main.temp,
          desc: weather,
          sunrise: convertUnixTimestampToTimeString(
            cityWeatherData.sys.sunrise
          ),
          sunset: convertUnixTimestampToTimeString(cityWeatherData.sys.sunset),
        };
        return newLocation;
      })
    );
    setWeatherInfo(refreshedData);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    handleStoreCities(refreshedData);
  };

  const handleStoreCities = (cities) => {
    const cityInfos = JSON.parse(localStorage.getItem("cities"));
    const updatedCityInfos = cityInfos.map((info) =>
      info.email === token ? { ...info, cities: cities } : info
    );
    localStorage.setItem("cities", JSON.stringify(updatedCityInfos));
  };

  return (
    <DataContext.Provider
      value={{
        navigate,
        showProfileInfo,
        setShowProfileInfo,
        token,
        user,
        setUser,
        searchInput,
        setSearchInput,
        handleLogout,
        handleRefresh,
        formDisplay,
        setFormDisplay,
        images,
        fetchData,
        convertUnixTimestampToTimeString,
        weatherInfo,
        setWeatherInfo,
        editFormData,
        setEditFormData,
        handleStoreCities,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
