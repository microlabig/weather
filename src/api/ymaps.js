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
    address: 'Россия, Москва',
    lat: 55.75399400,
    lon: 37.62209300,
};

// -------------------------------------------
// функция поиска текущей позиции пользователя
// -------------------------------------------
export const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Геолокация не доступна."));
        }
        // найдем текущую геопозицию
        navigator.geolocation.getCurrentPosition(
            pos => {
                resolve(pos);
            },
            err => {
                reject(err);
            }
        );
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
