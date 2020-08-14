import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";

// -------------------
// инициализация Ymaps
// -------------------
export default () => {
  const { ymaps_api } = require("~/data/consts.json");

  const YMapsSettings = {
    apiKey: ymaps_api,
    lang: "ru_RU",
    coordorder: "latlong",
    version: "2.1"
  };

  Vue.use(YmapPlugin, YMapsSettings);
};

// ---------------------------------------
// координаты по-умолчанию (напр., Москва)
// ---------------------------------------
export const defaultCoordinates = {
  address: "Россия, Москва",
  lat: 55.753994,
  lon: 37.622093
};

// -------------------------------------------
// функция поиска текущей позиции пользователя
// -------------------------------------------
export const getBrowserLocation = () => {
  return new Promise(async (resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Геолокация не доступна."));
    }
    if (navigator.geolocation.getCurrentPosition) { // если у пользователя присутствует ф-ия определения местоположения
      // найдем текущую геопозицию
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve(pos);
        },
        err => {
          reject(err);
        }
      );
    } else { // иначе определим местоположение по Ymaps
      const { ymaps } = window;
      ymaps.ready(async () => {
        try {
          const result = await ymaps.geolocation.get();
          const coords = result.geoObjects.get(0).geometry.getCoordinates();
          const geoObj = {
            coords: { latitude: coords[0], longitude: coords[1] }
          };
          resolve(geoObj); // вернем обйект с координатами
        } catch (error) {
          reject(error);
        }
      });
    }
  });
};

// ------------------------------------------------------
// функция обратного геокодирования (координаты -> адрес)
// ------------------------------------------------------
export const geocodeBack = coordsList => {
  return new Promise((resolve, reject) => {
    const { ymaps } = window;
    ymaps.ready(async () => {
      try {
        const result = await ymaps.geocode(coordsList);
        const firstGeoObject = result.geoObjects.get(0); // возьмем первый результат
        resolve(firstGeoObject.getAddressLine()); // вернем адрес
      } catch (error) {
        reject(error);
      }
    });
  });
};
