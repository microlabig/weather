// -------------------------------------
// текущая дата в формате (DD.MM.YYYYг.)
// -------------------------------------
export const getCurrentDate = (dateStr = new Date()) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const formatedDay = day < 10 ? "0" + day : day;
  const month = date.getMonth() + 1;
  const formatedMonth = month < 10 ? "0" + month : month;
  const year = date.getFullYear();
  
  return `${formatedDay}.${formatedMonth}.${year}г.`;
};

// -----------------------------
// получение текущего дня недели
// -----------------------------
export const getDayOfWeek = (timeStampStr) => { // входной параметр - дата в формате timestamp
  const dayList = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const timeStamp = new Date(timeStampStr);
  const day = timeStamp.getDay();
  
  return dayList.filter((_, idx) => idx === day)[0];
};

// -------------------------------
// получение времени из таймстампа
// -------------------------------
export const getTime = (timeStampStr, gmt = 0) => {
  const timeStamp = new Date(timeStampStr);
  const hours = timeStamp.getHours() + gmt;
  const formatedHours = hours < 10 ? "0" + hours : hours;
  const minutes = timeStamp.getMinutes();
  const formatedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${formatedHours}:${formatedMinutes}`;
}