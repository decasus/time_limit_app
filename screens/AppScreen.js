import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useData } from "../context/dataContext";
import SelectLayout from "../components/SelectLayount";

const AppScreen = ({ navigation, route }) => {
  const [limit, setLimit] = useState(10);

  const { updateSettings } = useData();

  const handleTextChange = (text) => {
    if (!text || isNaN(text) || text >= 1440 || text < 1) setLimit(10);
    else setLimit(text);
  };

  const handleLimit = () => {
    updateSettings(route.params.name, limit);
    navigation.navigate("Home");
  };

  const disableLimit = () => {
    updateSettings(route.params.name, 0);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "flex-start" }} />
      <View style={{ flex: 0, alignSelf: 'flex-start', backgroundColor: "white", paddingHorizontal: 30, paddingVertical: 30, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
        <View>
          <View style={styles.header}><Text style={styles.headerText}>Лимит для {route.params.name}</Text></View>
          <SelectLayout
            label="flexDirection"
            values={[10, 15, 30, 60]}
            selectedValue={limit}
            setSelectedValue={setLimit}>
          </SelectLayout>
          <View>
            <TextInput
              inputMode="numeric"
              style={styles.input}
              onChangeText={(text) => handleTextChange(text)}
              value={limit}
              placeholder="Или введите вручную"
              placeholderTextColor="lightgray"
            />
          </View>
        </View>
        <View style={{ marginTop: 30, flexWrap: "wrap", flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.buttonLong} onPress={handleLimit}>
            <Text style={styles.buttonLongLabel}>Установить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonLong, { backgroundColor: "#8a3a3a" }]} onPress={disableLimit}>
            <Text style={styles.buttonLongLabel}>Отключить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 22,
    color: "#000",
    fontFamily: "golos-text_bold",
  },
  text: {
    fontSize: 16,
    fontFamily: "golos-text_regular",
    color: "#727272",
  },
  input: {
    height: 60,
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#e1e1e1",
    fontFamily: "golos-text_medium",
    color: "#424242",
    fontSize: 18,
    padding: 20,
    borderRadius: 10,
  },
  buttonLong: {
    width: "48%",
    paddingVertical: 20,
    backgroundColor: "#242A2F",
    alignSelf: "center",

    borderRadius: 10,
    marginTop: 10,
  },
  buttonLongLabel: {
    fontSize: 18,
    fontFamily: "golos-text_bold",
    color: "white",
    textAlign: "center",
  },
});

export default AppScreen;
