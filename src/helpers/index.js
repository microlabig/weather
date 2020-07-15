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

// -----------------------------
// получение текущего дня недели
// -----------------------------
export const getDayOfWeek = (timeStamp) => { // входной параметр - дата в формате timestamp
  const dayList = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const day = timeStamp.getDay();

  return dayList.filter((_, idx) => idx === day)[0];
};
