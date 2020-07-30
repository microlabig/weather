import axios from "axios";

const { weather_api } = require("~/data/consts.json");
// const response = {...require('~V/data/weather.json'), status: 200};
const iconZoom = 4; // 2, 4, ...
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
    await fetchWeatherIcon('10d');
    return response;
  }
  throw new Error("Ошибка загрузки данных");
};

// ----------------------------------------------------
// Функция загрузки файла и преобразование его в base64
// ----------------------------------------------------
const uploadFile = (url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      // если файл соотвествует необходимым критериям (см. ф-ию changeFile)
      const reader = new FileReader(); // создадим экземпляр чтения файла
      const blob = new Blob([`${url}`]);
      console.log(blob); // TODO:
      reader.readAsDataURL(blob); // прочитать файл как URL (преобразовать в base64)
      
      // загрузка (преобразование) завершено
      reader.onload = () => {
        resolve(reader.result); // сохраняем в base64 url
      };
    } else {
      reject(new Error('Не удалось загрузить файл!'));
    }
  });
};

// --------------------
// запрос иконки погоды
// --------------------
export const fetchWeatherIcon = async (iconStr) => {
  const url = `http://openweathermap.org/img/wn/${iconStr}@${iconZoom}x.png`;
  const icon = await uploadFile(url);
  console.log(icon);
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
