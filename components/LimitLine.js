import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from "react-native";
import images from "../constants/images";
import { colorsAlpha } from "../constants/colors";
import { stringTime } from "../utils/functions";
import FadeInView from "./FadeInView";

const LimitLine = ({ data, navigation }) => {
  return (
    // <TouchableOpacity style={styles.line} onPress={() => navigation.navigate('App', {name: data.name})}>
    //   <View style={styles.app}>
    //     <View style={styles.appName}>
    //       <View style={{overflow: "hidden"}}><Image style={styles.appIcon} source={images[data.name]} /></View>
    //       <Text style={styles.appNameText}>{data.name}</Text>
    //     </View>
    //     <Text style={styles.appTime}>{stringTime(data.time)}</Text>
    //   </View>
    // </TouchableOpacity>

    <TouchableOpacity style={[styles.app, {backgroundColor: colorsAlpha[data.name]}]} onPress={() => navigation.navigate("App", { name: data.name })}>
      <FadeInView>
        <View style={styles.appName}>
          <View style={{ overflow: "hidden" }}><Image style={styles.appIcon} source={images[data.name]} /></View>
          <Text style={styles.appNameText}>{data.name}</Text>
        </View>
        <View>
          <Text style={styles.appTime}>{stringTime(data.time)}</Text>
        </View>
      </FadeInView>
    </TouchableOpacity>


  );
};

const styles = StyleSheet.create({
  /*  app: {
      flexDirection: "row",
      flex: 1,
      marginTop: 0,
      gap: 10,
      marginHorizontal: 0,
      marginVertical: 5,
      justifyContent: "space-between",
      verticalAlign: "middle",
      paddingHorizontal: 35,
      paddingVertical: 10,
    },*/
  app: {
    marginBottom: 10,
    flexDirection: "column",
    marginTop: 0,
    width: "43%",
    justifyContent: "space-between",
    verticalAlign: "middle",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,

  },
  appName: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    marginBottom: 10
  },
  appIcon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  appNameText: {
    fontSize: 16,
    fontFamily: "golos-text_bold",
    color: "#242A2F",
  },
  appTime: {
    fontSize: 16,
    color: "#505050",
    fontFamily: "golos-text_medium",
  },
});

export default LimitLine;
