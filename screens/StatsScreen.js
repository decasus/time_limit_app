import { FlatList, Text, View, StyleSheet, ScrollView, NativeModules } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import StatLine from "../components/StatLine";
import { useEffect, useState } from "react";
import { getStoredStatsData } from "../utils/bridgeFunctions";
import { getNameByApp } from "../utils/functions";
import StatsChart from "../components/StatsChart";
import FadeInView from "../components/FadeInView";
import colors from "../constants/colors";
import appList from "../constants/appList";


const options = [
  { label: "Нед", value: 1 },
  { label: "1 м", value: 2 },
  { label: "3 м", value: 3 },
  { label: "6 м", value: 4 },
  { label: "Год", value: 5 },
];

//const fakeIntervalStats = [{"app": "com.vkontakte.android", "name": "VK", "time": 4032}, {"app": "com.whatsapp", "name": "WhatsApp", "time": 2304}, {"app": "com.google.android.youtube", "name": "YouTube", "time": 11610}, {"app": "com.viber.voip", "name": "Viber", "time": 1060}, {"app": "org.telegram.messenger", "name": "Telegram", "time": 10423}, {"app": "com.instagram.android", "name": "Instagram", "time": 1011}, {"app": "ru.rutube.app", "name": "Rutube", "time": 970}, {"app": "com.zhiliaoapp.musically", "name": "TikTok", "time": 34}]

const StatsScreen = ({ navigation, route }) => {


  const [intervalStats, setIntervalStats] = useState([]);
  const [interval, setInterval] = useState(1);

  useEffect(() => {
    // if(interval === 2) {
    //   setIntervalStats(fakeIntervalStats);
    // }
    // else
    getStoredStatsData(interval).then(result => {
      setIntervalStats(Object.entries(result).map(([app, time]) => {
        return { app, name: getNameByApp(app), time: parseInt(time / 1000) };
      }).sort((a, b) => b.time - a.time));
    });
  }, [interval]);

  // useEffect(() => {
  //   console.log("intervalStats", intervalStats)
  // }, [intervalStats]);

  return (
      <FlatList
        ListHeaderComponent={
          <ScrollView
            >
            <FadeInView>
              <View style={styles.header}><Text style={styles.headerText}>Статистика</Text></View>
              <View style={{ padding: 20, marginHorizontal: 10 }}><Text style={styles.text}>Здесь Вы можете увидеть
                статистику использования приложений</Text></View>
            </FadeInView>
            {intervalStats.length !== 0 && <>
            <FadeInView>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={value => setInterval(value)}
                buttonColor="#242A2F"
                textColor={"#727272"}
                fontSize={18}
                selectedTextStyle={{ fontFamily: "golos-text_bold" }}
                textStyle={{ fontFamily: "golos-text_medium" }}
                selectedTextContainerStyle={{}}
                style={{ marginHorizontal: 20 }}
                height={45}
                hasPadding
                borderColor={"#e8e8e8"}
                valuePadding={0}
                borderWidth={3}
              />
              </FadeInView>
              <FadeInView style={{ flex: 1 }}>
                  <StatsChart stats={intervalStats} />
              </FadeInView></>
            }
          </ScrollView>
        }
        ListFooterComponent={
          <View style={{ height: 20 }}></View>
        }
        data={intervalStats}
        renderItem={({ item }) => <StatLine key={item.app} data={item} navigation={navigation} clickable={false} />}>
      </FlatList>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 32,
    color: "#000",
    fontFamily: "golos-text_bold",
  },
  text: {
    fontSize: 16,
    fontFamily: "golos-text_regular",
    color: "#727272",
  },
});

export default StatsScreen;



