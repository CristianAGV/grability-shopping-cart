import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../features/cart";
import useScreenDimensions from "../../hooks/Dimensions";

export default function Cart() {
  const Width = useScreenDimensions();
  const dispatch = useDispatch();
  let content;
  const { products, total } = useSelector((store) => store.cart);
  if (!products.length) {
    content = (
      <Text style={styles.emptyCartText}>
        Ooops! No hay productos en el carrito.
      </Text>
    );
  }

  if (products.length) {
    content = products.map((product) => (
      <CartItem
        key={product.id}
        title={product.nombre}
        price={product.unidad_precio}
        imageUrl={product.imagen}
        stock={product.stock}
        id={product.id}
        quantity={product.cantidad}
      />
    ));
  }
  useEffect(() => {
    dispatch(getTotal());
  }, [products]);
  return (
    <View
      style={{
        ...styles.container,
        height: Width < 768 ? "auto" : 500,
        minWidth: Width < 768 ? "100%" : 400,
      }}
    >
      <Text style={styles.title}>CARRITO</Text>

      <View style={styles.cartItemsContainer}>{content}</View>

      <Text style={styles.totalText}>Total: ${total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "grey",
    paddingBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.green,
    elevation: 5,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  title: {
    paddingVertical: 8,
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: Colors.green,
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: "center",
    margin: "auto",
  },
  cartItemsContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  totalText: {
    color: Colors.green,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
