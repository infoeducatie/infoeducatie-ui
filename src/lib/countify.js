"use strict";


export default function(number) {
  switch (number[number.length - 1]) {
    case "1":
      return number + "st";
    case "2":
      return number + "nd";
    case "3":
      return number + "rd";
    default:
      return number + "th";
  }
}
