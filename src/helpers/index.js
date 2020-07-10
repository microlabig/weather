// текущая дата
export const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();         const formatedDay = day < 10 ? '0' + day : day;
    const month = date.getMonth() + 1;  const formatedMonth = month < 10 ? '0' + month : month; 
    const year = date.getFullYear();

    return `${formatedDay}.${formatedMonth}.${year}г.`;
}