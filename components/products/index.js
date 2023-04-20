import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import useScreenDimensions from "../../hooks/Dimensions";

const renderProducts = ({ item }) => {
  return (
    <ProductCard
      title={item.nombre}
      price={item.unidad_precio}
      imageUrl={item.imagen}
      stock={item.stock}
      id={item.id}
    />
  );
};
export default function Products() {
  const Width = useScreenDimensions();
  const { products } = useSelector((store) => store.products);

  return (
    <View>
      <FlatList
        key={Width < 1100 ? "_" : "#"}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={renderProducts}
        style={styles.list}
        numColumns={Width < 1100 ? 1 : 2}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        horizontal={Width < 1100}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingBottom: 40,
  },
});
