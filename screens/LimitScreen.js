import { FlatList, Text, View, StyleSheet } from "react-native";
import { useData } from "../context/dataContext";
import LimitLine from "../components/LimitLine";
import FadeInView from "../components/FadeInView";
import Ionicons from "react-native-vector-icons/Ionicons";

const LimitScreen = ({ navigation, route }) => {

  //const { usageStats } = useData();

const usageStats = [{"app": "com.vkontakte.android", "limit": 0, "name": "VK", "time": 600}, {"app": "com.google.android.youtube", "limit": 600, "name": "YouTube", "time": 1380}, {"app": "org.telegram.messenger", "limit": 600, "name": "Telegram", "time": 4200}, {"app": "com.instagram.android", "limit": 0, "name": "Instagram", "time": 4500}, {"app": "com.whatsapp", "limit": 0, "name": "WhatsApp", "time": 500}, {"app": "com.zhiliaoapp.musically", "limit": 0, "name": "TikTok", "time": 0},
  {"app": "com.viber.voip", "limit": 0, "name": "Viber", "time": 200}, {"app": "ru.rutube.app", "limit": 0, "name": "Rutube", "time": 0}].sort((a,b) => a.time > b.time ? -1 : 1)
console.log(usageStats)
  return (
    <FlatList
      columnWrapperStyle={styles.limitContainer}
      numColumns={2}
      ListEmptyComponent={
        <FadeInView style={{justifyContent: "center", alignItems: "center", marginTop: "40%"}}>
          <Ionicons name="layers" color="#a6a6a6" size={46} />
          <Text style={{fontSize: 24, fontFamily: "golos-text_medium", color: "#a6a6a6", marginTop: 10}}>
            Нет приложений
          </Text>
          <Text style={{fontFamily: "golos-text_regular", color: "#a6a6a6", marginTop: 20, textAlign: "center"}}>
            У вас не установлены приложения, {"\n"}на которые можно поставить ограничения
          </Text>
        </FadeInView>
    }
      ListHeaderComponent={
      <FadeInView>
        <View>
          <View style={styles.header}><Text style={styles.headerText}>Лимиты</Text></View>
          <View style={{ padding: 20, marginHorizontal: 10, marginBottom: 10 }}><Text style={styles.text}>Нажмите на приоложение, чтобы
            установить лимит использования на сегодня</Text></View>
        </View>
      </FadeInView>
      }
      data={usageStats}
      renderItem={({ item }) => <LimitLine key={item.app} data={item} navigation={navigation} />}>
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
  limitContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LimitScreen;



