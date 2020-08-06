import axios from "axios";

const { weather_api } = require("~/data/consts.json");
// const response = {...require('~V/data/weather.json'), status: 200};
const ICON_ZOOM = 4; // 2, 4, ...
const DUMMY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
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

// ----------------------------------------------------
// Функция загрузки файла и преобразование его в base64
// ----------------------------------------------------
const encodeImage = (url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        const reader = new FileReader();
        // загрузка (преобразование) завершено
        reader.onloadend = function() {
          resolve(reader.result); // сохраняем в base64 url
        }
        reader.readAsDataURL(xhr.response); // прочитать файл как URL (преобразовать в base64)
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    } else {
      reject(new Error('Не удалось загрузить файл!'));
    }
  });
};

// --------------------
// запрос иконки погоды
// --------------------
export const fetchWeatherIcon = async (iconStr) => {
  const url = `http://openweathermap.org/img/wn/${iconStr}@${ICON_ZOOM}x.png`;
  let icon = null;
  try {
    icon = await encodeImage(url);
  } catch (error) {
    icon = DUMMY_IMAGE;
  }
  return icon;
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
