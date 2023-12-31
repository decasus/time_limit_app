import { NavigationContainer } from "@react-navigation/native";
import AppScreen from "./screens/AppScreen";
import { DataProvider } from "./context/dataContext";
import PermissionScreen from "./screens/PermissionScreen";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { LogBox } from "react-native";
import TabNavigator from "./navigation/TabNavigator";

const RootStack = createStackNavigator();

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <RootStack.Group>
            <RootStack.Screen
              name="Permission"
              component={PermissionScreen}
            />
            {/*<RootStack.Screen*/}
            {/*  name="Home"*/}
            {/*  component={HomeScreen}*/}
            {/*/>*/}
            {/*<RootStack.Screen*/}
            {/*  name="Limit"*/}
            {/*  component={LimitScreen}*/}
            {/*/>*/}
            {/*<RootStack.Screen*/}
            {/*  name="Stats"*/}
            {/*  component={StatsScreen}*/}
            {/*/>*/}
            <RootStack.Screen name="Root" component={TabNavigator} />
          </RootStack.Group>
          <RootStack.Group
            screenOptions={({ route }) => {
              return {
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
                presentation: "transparentModal",
                gestureResponseDistance: 1000,
              };
            }}
          >
            <RootStack.Screen name="App"
                              component={AppScreen}
                              options={({ route }) => ({
                                title: route.params.name,
                              })}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
