// ---------------------------------------
// координаты по-умолчанию (напр., Москва)
// ---------------------------------------
export const defaultCoords = {
  address: 'Россия, Москва',
  lat: 55.75399400,
  lon: 37.62209300,
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

// -------------------------------------
// текущая дата в формате (DD.MM.YYYYг.)
// -------------------------------------
export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const formatedDay = day < 10 ? "0" + day : day;
  const month = date.getMonth() + 1;
  const formatedMonth = month < 10 ? "0" + month : month;
  const year = date.getFullYear();

  return `${formatedDay}.${formatedMonth}.${year}г.`;
};
