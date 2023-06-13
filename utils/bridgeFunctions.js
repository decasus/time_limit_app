import { NativeModules } from "react-native";
import appList from "../constants/appList";

const {StatsModule} = NativeModules;

export const hasPermissionToUseData = async () => {
  const response = await StatsModule.hasPermissionToReadUsageStats();
  return response === "true";
}

export const getCurrentStatsData = async () => {
  const promises = appList.map(item =>
    new Promise((resolve) => {
      StatsModule.getUsageStats(item.app, data => {
        resolve({ ...item, "time": data })
      })
    }))
  const statsData = await Promise.all(promises);
  return statsData.filter(result => result.time !== "Error");
}

export const getStoredStatsData = async (interval) => await StatsModule.getStats(interval);
