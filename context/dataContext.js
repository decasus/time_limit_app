import {createContext, useState, useContext, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import BackgroundTimer from 'react-native-background-timer';
import { getCurrentStatsData, hasPermissionToUseData } from "../utils/bridgeFunctions";
import { initialSettings } from "../constants/constants";

const DataContext = createContext();

const getSavedSettings = async () =>  JSON.parse(await AsyncStorage.getItem('Settings'));
const saveSettings = (settings) => AsyncStorage.setItem('Settings', JSON.stringify(settings));

export const DataProvider = ({children}) => {

  const [usageStats, setUsageStats] = useState();
  const [settings, setSettings] = useState(initialSettings);
  const [hasPermission, setHasPermission] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const checkLimits = async () => {
    const statsData = await getCurrentStatsData();
    statsData.sort((a,b) => b.time - a.time);
    const currentSettings = await getSavedSettings();
    const statsWithLimits = statsData.map(obj => {
      const limit = currentSettings[obj.name] * 60;
      return { ...obj, limit };
    });
    setUsageStats(statsWithLimits);
    statsWithLimits.forEach(item => {
      if(item.limit > 0 && item.time >= item.limit) {
        PushNotification.localNotification({ channelId: "general", title: `Лимит для приложения ${item.name} исчерпан`, message: `Вы можете установить новый лимит в приложении`, });
        updateSettings(item.name, 0)
      }
    })
  }

  const updatePermissionStatus = async () => {
    const result = await hasPermissionToUseData();
    setHasPermission(result);
  }

  const updateSettings = (name, value) => {
    getSavedSettings().then(values => {
       setSettings({...values, [name]: value});
     });
  }

  useEffect(() => {
    if(settings && settings !== initialSettings) {
      saveSettings(settings);
      getSavedSettings().then(values => console.log("Updated from storage: " + JSON.stringify(values)))
      checkLimits(); // ?????
    }
  }, [settings]);

  //TODO НЕПРАВИЛЬНОЕ ОТОБРАЖЕНИЕ ВРЕМЕНИ

  useEffect(() => {
    if(hasPermission) {
      getSavedSettings().then(values => {
        if(values) setSettings(values)
        else saveSettings(initialSettings)
      })
      checkLimits();
      const interval = BackgroundTimer.setInterval(async () => checkLimits(), 30000);
      return () => BackgroundTimer.clearInterval(interval);
    }
  }, [hasPermission]);

  useEffect(() => {
    updatePermissionStatus().then(() => setIsLoading(false));
  }, []);

  return <DataContext.Provider value={{isLoading, hasPermission, usageStats, settings, updateSettings, updatePermissionStatus}}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext);
