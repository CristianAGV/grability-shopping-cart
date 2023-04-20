import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeItem } from "../../features/cart";
import { updateStock } from "../../features/products";

export default function CartItem({ title, price, imageUrl, id, quantity }) {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(id));
    dispatch(updateStock([id, quantity, "refill"]));
  };
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 5,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>{title}</Text>
        <Text style={styles.productPrice}>${price}</Text>
      </View>
      <Text>x {quantity}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem()}>
        <FontAwesome name="trash-o" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productPrice: {
    fontSize: 12,
    color: Colors.green,
  },
});
