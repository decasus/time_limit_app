import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AppLine from "../components/AppLine";
import { useData } from "../context/dataContext";
import { useEffect, useState } from "react";

const HomeScreen = ({ navigation, route }) => {

  const { usageStats } = useData();

  const [activeStats, setActiveStats] = useState([]);

  useEffect(() => {
    //console.log(usageStats)
    setActiveStats((usageStats || []).filter(item => item.limit > 0))
  }, [usageStats]);

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <View style={styles.header}><Text style={styles.headerText}>Здравствуйте</Text></View>
          <View style={{ padding: 20, marginHorizontal: 10 }}><Text style={styles.text}>Здесь Вы можете настроить лимиты, посмотреть статистику, а также увидеть активные ограничения</Text></View>
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#7ebe45"}]} onPress={() => navigation.navigate("Stats")}>
              <Text style={styles.buttonLabel}>Статистика приложений</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#F18766"}]} onPress={() => navigation.navigate("Limit")}>
              <Text style={styles.buttonLabel}>Установить лимиты</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      data={activeStats}
      renderItem={({ item }) => <AppLine key={item.app} data={item} navigation={navigation} />}>
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
    fontFamily: "Montserrat-ExtraBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#727272",
  },
  buttons: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  button: {
    width: "49%",
    paddingVertical: 20,
    backgroundColor: "#242A2F",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonLabel: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "white",
    textAlign: "left",
  },
});

export default HomeScreen;



