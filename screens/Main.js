import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import Products from "../components/products";
import Cart from "../components/cart";
import Colors from "../constants/Colors";
import useScreenDimensions from "../hooks/Dimensions";

export default function Main() {
  const Width = useScreenDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMPRA CON GRABILITY</Text>
      <View
        style={{
          ...styles.shoppingSection,
          width: Width < 1100 ? "100%" : "80%",
          paddingHorizontal: Width < 1100 ? 10 : 0,
          flexDirection: Width < 1100 ? "column" : "row",
        }}
      >
        <Products />
        <Cart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    overflow: "scroll",
  },
  title: {
    width: "100%",
    paddingVertical: 20,
    marginBottom: 50,
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: Colors.greenDark,
  },
  shoppingSection: {
    gap: 10,
    justifyContent: "space-evenly",
  },
});
