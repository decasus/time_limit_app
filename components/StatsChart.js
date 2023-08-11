import { Border, Circle, VictoryLabel, VictoryLegend, VictoryPie, VictoryTheme } from "victory-native";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg from "react-native-svg";
import colors from "../constants/colors";
import { stringTime } from "../utils/functions";
import { useEffect, useState } from "react";

const totalTime = (stats) => {
  const sum = stats.reduce((partialSum, a) => partialSum + a.time, 0);
  return stringTime(sum)
};

const {width, height} = Dimensions.get("screen");
const StatsChart = ({ stats }) => {

  const defaultGraphicData = stats.map(item => {
    return { name: item.name, x: item.name, y: 10, fill: colors[item.name] };
  });

  //const defaultGraphicData = [{ name: "init", x: "init", y: 100, fill: "transparent"}]

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
        const wantedGraphicData = stats.map(item => {
          return { name: item.name, x: item.name, y: item.time, fill: colors[item.name] };
        });
      setGraphicData(wantedGraphicData);
  }, [stats]);

  useEffect(() => {
    console.log("GRAPHIC DATA", graphicData)
  }, [graphicData]);


  return (
    <View style={[styles.container]}>
      <VictoryPie
        data={graphicData}
        //height={400}
        width={width}
        innerRadius={100}
        padAngle={1}
        cornerRadius={2}
        labels={() => [totalTime(stats), "всего"]}
        labelComponent={
          <VictoryLabel
            textAnchor="middle" verticalAnchor="middle"
            x={width/2} y={width/2}
            style={{ fontSize: 20, fontFamily: "golos-text_demibold", fill: "#353a41" }}
          />
        }
        style={{
          data: { fill: ({ datum }) => datum.fill },
        }}
        animate={{
          easing: 'exp',
          duration: 1000,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -20,
    borderRadius: 20,
    marginHorizontal: 30,
  },
});

export default StatsChart;
