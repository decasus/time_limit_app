import appList from "../constants/appList";

export function minutesTime(milliseconds) {
  return Math.floor(milliseconds / 60);
}

export function stringTime(milliseconds) {
  let minutes = Math.floor(milliseconds / 60);
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  if (hours === 0) return remainingMinutes + " мин";
  if (hours > 0 && remainingMinutes === 0) return hours + " ч";
  return hours + " ч " + remainingMinutes + " мин";
}

export function getTimeLeft(timePassed, limit) {
  if(timePassed > limit) return "0"
  else return limit-timePassed
}

export function getNameByApp(app) {
  const appObj = appList.find(item => item.app === app);
  return appObj ? appObj.name : null;
}
