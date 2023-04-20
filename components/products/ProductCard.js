import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart";
import { updateStock } from "../../features/products";

export default function ProductCard({ title, price, imageUrl, stock, id }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityBtn = (action) => {
    if (
      (quantity === stock && action === "plus") ||
      (quantity === 1 && action === "minus")
    ) {
      return;
    }
    if (action === "plus") {
      setQuantity((prevValue) => prevValue + 1);
      return;
    }
    setQuantity((prevValue) => prevValue - 1);
  };

  const handleAddToCart = () => {
    quantity > 1 && setQuantity(1);
    dispatch(addItem([id, quantity]));
    dispatch(updateStock([id, quantity]));
  };

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          flex: 1,
        }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text
          style={
            stock
              ? { ...styles.productPrice }
              : { ...styles.productPrice, color: Colors.gray }
          }
        >
          ${price}
        </Text>

        <View style={{ ...styles.productActionsContainer, gap: 5 }}>
          <TouchableOpacity
            onPress={() => handleQuantityBtn("minus")}
            disabled={!stock}
          >
            <AntDesign
              name="minuscircle"
              size={24}
              color={stock ? Colors.green : Colors.gray}
            />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityBtn("plus")}
            disabled={!stock}
          >
            <AntDesign
              name="pluscircle"
              size={24}
              color={stock ? Colors.green : Colors.gray}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productActionsContainer}>
          <TouchableOpacity
            style={
              stock
                ? { ...styles.addToCartBtn }
                : { ...styles.addToCartBtn, backgroundColor: Colors.gray }
            }
            onPress={() => handleAddToCart()}
            disabled={!stock}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>AGREGAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          stock
            ? { ...styles.stockContainer }
            : { ...styles.stockContainer, backgroundColor: Colors.gray }
        }
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {stock ? `Stock: ${stock}` : "Stock Agotado"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 220,
    height: 300,
    marginRight: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  productTitle: {
    fontSize: 13,
    textAlign: "center",
    textTransform: "capitalize",
  },
  productPrice: {
    fontSize: 12,
    color: Colors.green,
    textAlign: "center",
  },
  productActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 15,
    marginTop: 10,
  },

  addToCartBtn: {
    padding: 8,
    backgroundColor: Colors.green,
    borderRadius: 5,
  },
  stockContainer: {
    padding: 10,
    backgroundColor: "#87a8a9",
  },
});
