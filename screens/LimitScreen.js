import { FlatList, Text, View, StyleSheet } from "react-native";
import { useData } from "../context/dataContext";
import LimitLine from "../components/LimitLine";
import { useEffect } from "react";

const LimitScreen = ({ navigation, route }) => {

  const { usageStats } = useData();

  return (
    <FlatList
      ListHeaderComponent={
      <View>
        <View>
          <View style={styles.header}><Text style={styles.headerText}>Лимиты</Text></View>
          <View style={{ padding: 20, marginHorizontal: 10 }}><Text style={styles.text}>Нажмите на приоложение, чтобы
            установить лимит использования на сегодня</Text></View>
        </View>
      </View>
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
    fontFamily: "Montserrat-ExtraBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#727272",
  },
});

export default LimitScreen;



