import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import Main from "./screens/Main";
import Store from "./store";
import { Provider } from "react-redux";
import Colors from "./constants/Colors";

export default function App() {
  return (
    <Provider store={Store}>
      <StatusBar style="light" backgroundColor={Colors.greenDark} />
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <Main />
      </ScrollView>
    </Provider>
  );
}
