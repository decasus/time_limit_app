import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useData } from "../context/dataContext";
import images from "../constants/images";
import { getTimeLeft, minutesTime, stringTime } from "../utils/functions";
import FadeInView from "./FadeInView";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppLine = ({data, navigation}) => {
    const {settings} = useData();

    const limit = settings[data.name];
    const timeLeft = getTimeLeft(minutesTime(data.time), settings[data.name]);
    const usagePercent = 100 - (timeLeft/limit * 100);

    const barBackgroundColor = usagePercent < 40 ? "rgba(151,210,139,0.7)" : usagePercent < 80 ? "rgba(252,215,121,0.7)" : !usagePercent ? "lightgrey" : "rgba(255,81,81,0.7)";

    return (
      limit !== 0 && !isNaN(limit) &&
      <FadeInView>
      <TouchableOpacity style={styles.line} onPress={() => navigation.navigate('App', {name: data.name})}>
        <View style={styles.app}>
          <View style={styles.appName}>
            <View style={{overflow: "hidden"}}><Image style={styles.appIcon} source={images[data.name]} /></View>
            <Text style={styles.appNameText}>{data.name}</Text>
          </View>
          <View style={styles.appTime}>
            <Ionicons name="lock-closed" color="#A2ABBC" size={14} />
            <Text style={styles.appTimeText}>{stringTime(limit*60)}</Text>
          </View>
        </View>
        <View style={styles.bar}>
          <View style={[styles.barLine, {maxWidth: usagePercent + "%", backgroundColor: barBackgroundColor}]}>
          </View>
        </View>
        <View style={styles.limit}>
            <View>
              <Text style={styles.limitText}>Сегодня</Text>
              <Text style={styles.limitTime}>{stringTime(data.time)}</Text>
            </View>
            <View>
              <Text style={styles.leftText}>Осталось</Text>
              <Text style={styles.leftTime}>{stringTime(timeLeft*60)}</Text>
            </View>
        </View>
      </TouchableOpacity>
      </FadeInView>
    );
};

const styles = StyleSheet.create({
  app: {
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    gap: 5,
    justifyContent: "space-between",
    verticalAlign: "middle"
  },
  appName: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  appIcon: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  appNameText: {
    fontSize: 20,
    fontFamily: 'golos-text_demibold',
    color: "white"
  },
  appTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  appTimeText: {
    fontSize: 18,
    color: "#A2ABBC",
    fontFamily: 'golos-text_demibold',
  },
  bar: {
    height: 15,
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    marginBottom: 5,
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  barLine: {
    height: 15,
    borderRadius: 5,
    position: "absolute",
    width: "100%",
    zIndex: -1,
  },
  limit: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  limitText: {
    fontSize: 16,
    color: "#A2ABBC",
    fontFamily: 'golos-text_regular'
  },
  leftText: {
    fontSize: 16,
    color: "#A2ABBC",
    fontFamily: 'golos-text_regular',
    textAlign: 'right'
  },
  limitTime: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'golos-text_demibold',
    color: "white"
  },
  leftTime: {
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'golos-text_demibold',
    color: "white"
  },
  line: {
    padding: 25,
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "rgb(36,42,47)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
});

export default AppLine;
