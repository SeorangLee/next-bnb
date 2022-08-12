// month

export const monthList = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
]
//day
export const dayList = Array.from(Array(31), (_, i) => String(i +1));

//years from 1900 to 2020
export const yearList = Array.from(Array(121), (_,i) => String(2022 - i));