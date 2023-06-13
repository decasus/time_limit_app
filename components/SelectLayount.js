import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const SelectLayout = ({ values, selectedValue, setSelectedValue }) => (
  <View style={{ marginBottom: 20, marginTop: 10 }}>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            setSelectedValue(value);
          }}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}>
            {value + " мин"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#E1F0F4",
    alignSelf: "flex-start",
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#242A2F",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#424242"
  },
  selectedLabel: {
    color: "white",
  },
})

export default SelectLayout;
