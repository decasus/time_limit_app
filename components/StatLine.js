import { View, Text, Image, TouchableOpacity, StyleSheet, NativeModules } from "react-native";
import images from "../constants/images";
import { stringTime } from "../utils/functions";
import { useEffect } from "react";



const StatLine = ({data, navigation}) => {

  return (
    <View style={styles.line}>
      <View style={styles.app}>
        <View style={styles.appName}>
          <View style={{overflow: "hidden"}}><Image style={styles.appIcon} source={images[data.name]} /></View>
          <Text style={styles.appNameText}>{data.name}</Text>
        </View>
        <Text style={styles.appTime}>{stringTime(data.time)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    verticalAlign: "middle"
  },
  appName: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center"
  },
  appIcon: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  appNameText: {
    fontSize: 18,
    fontFamily: 'golos-text_bold',
    color: "#242A2F"
  },
  appTime: {
    fontSize: 18,
    color: "#737373",
    fontFamily: 'golos-text_medium'
  },
  line: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    flexDirection: "column",
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 0,
  },
});

export default StatLine;
