import {
  Button,
  StyleSheet,
  Linking, PermissionsAndroid, NativeModules, ScrollView, View, Text, TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useData } from "../context/dataContext";
import FadeInView from "../components/FadeInView";

const {StatsModule} = NativeModules;

const PermissionScreen = ({navigation, route}) => {

  const { isLoading, hasPermission, updatePermissionStatus } = useData();

  useEffect(() => {
     if(hasPermission) navigation.replace("Root");
  }, [hasPermission]);

  const checkPermission = () => {
    updatePermissionStatus();
    if(hasPermission) navigation.replace("Root");
  }

  return (
    !hasPermission && !isLoading &&
    <FadeInView style={{marginHorizontal: 30, flex: 1, justifyContent: "space-between"}}>
      <View>
        <View style={styles.header}><Text style={styles.headerText}>Здравствуйте</Text></View>
        <View style={{ paddingTop: 20 }}><Text style={styles.text}>Для начала работы Вам необходимо предоставить доступ к данным об использовании приложений, а также к отправке уведомлений. Это можно сделать в настройках системы. </Text></View>
        <View style={{ paddingTop: 20 }}><Text style={styles.text}>По завершению вернитесь в приложение и нажмите «Продолжить».</Text></View>

      </View>
      <View style={{marginBottom: 30}}>
        <TouchableOpacity style={[styles.buttonLong, {backgroundColor: "#3a5d8a"}]} onPress={() => openUsageAccessSettings()}>
          <Text style={styles.buttonLongLabel}>Перейти в настройки</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonLong]} onPress={checkPermission}>
          <Text style={styles.buttonLongLabel}>Продолжить</Text>
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

function openUsageAccessSettings() {
  Linking.sendIntent('android.settings.USAGE_ACCESS_SETTINGS');
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
  },
  headerText: {
    fontSize: 32,
    color: "#000",
    fontFamily: 'golos-text_bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'golos-text_regular',
    color: '#727272'
  },
  buttonLong: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#242A2F",
    alignSelf: "center",
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 15
  },
  buttonLongLabel: {
    fontSize: 18,
    fontFamily: "golos-text_bold",
    color: "white",
    textAlign: "center",
  },
});

export default PermissionScreen;



