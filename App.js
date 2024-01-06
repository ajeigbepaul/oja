import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from 'react-native-modals';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigation />
        <StatusBar style="auto" />
        <ModalPortal />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
