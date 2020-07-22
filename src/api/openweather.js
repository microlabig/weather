import axios from "axios";

const { weather_api } = require("~/data/consts.json");
// const response = {...require('~V/data/weather.json'), status: 200};
const parts = ["current", "minutely", "hourly", "daily"];

// -------------------------------------
// запрос даных о погоде на текущий день
// -------------------------------------
export const fetchWeatherDataOnCurrentDay = async ({ lat, lon }) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weather_api}&lang=ru`;
  const response = await axios.get(url);
  if (response && (response.status === 200 || response.cod === 200)) {
    // return await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(response);
    //     }, 100);
    // });
    return response;
  }
  throw new Error("Ошибка загрузки данных");
};

// ---------------------------------------
// запрос даных о погоде на несколько дней
// ---------------------------------------
export const fetchWeatherDataOnManyDays = async ({ lat, lon }) => {
  const excludedParts = `${parts[2]}`;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${excludedParts}&appid=${weather_api}&lang=ru`;
  const response = await axios.get(url);
  if (response && (response.status === 200 || response.cod === 200)) {
    // return await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(response);
    //     }, 100);
    // });
    return response;
  }
  throw new Error("Ошибка загрузки данных");
};
