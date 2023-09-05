import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AppLine from "../components/AppLine";
import { useData } from "../context/dataContext";
import { useEffect, useState } from "react";
import FadeInView from "../components/FadeInView";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation, route }) => {

  const { usageStats } = useData();

  const [activeStats, setActiveStats] = useState([]);

  console.log(activeStats)

  useEffect(() => {
    //console.log(usageStats)
    setActiveStats((usageStats || []).filter(item => item.limit > 0))
  }, [usageStats]);

  return (
    <FlatList
      ListEmptyComponent={
      <FadeInView style={{justifyContent: "center", alignItems: "center", marginTop: "40%"}}>
        <Ionicons name="lock-open" color="#a6a6a6" size={46} />
        <Text style={{fontSize: 24, fontFamily: "golos-text_medium", color: "#a6a6a6", marginTop: 10}}>
          Нет лимитов
        </Text>
        <Text style={{fontFamily: "golos-text_regular", color: "#a6a6a6", marginTop: 20, textAlign: "center"}}>
          Чтобы добавить новое ограничение, {"\n"}нажмите кнопку +
        </Text>
      </FadeInView>
    }
      ListHeaderComponent={
        <FadeInView>
          <View style={styles.header}><Text style={styles.headerText}>Здравствуйте</Text></View>
          <View style={{ padding: 20, marginHorizontal: 10 }}><Text style={styles.text}>Здесь Вы можете увидеть активные ограничения</Text></View>
          {/*          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#7ebe45"}]} onPress={() => navigation.navigate("Stats")}>
              <Text style={styles.buttonLabel}>Статистика приложений</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#F18766"}]} onPress={() => navigation.navigate("Limit")}>
              <Text style={styles.buttonLabel}>Установить лимиты</Text>
            </TouchableOpacity>
          </View>*/}
        </FadeInView>
      }
      data={[{"app": "com.google.android.youtube", "limit": 1800, "name": "YouTube", "time": 1480}, {"app": "org.telegram.messenger", "limit": 600, "name": "Telegram", "time": 4200}]}
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
    fontFamily: "golos-text_bold",
  },
  text: {
    fontSize: 16,
    fontFamily: "golos-text_regular",
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
    fontFamily: "golos-text_bold",
    color: "white",
    textAlign: "left",
  },
});

export default HomeScreen;



