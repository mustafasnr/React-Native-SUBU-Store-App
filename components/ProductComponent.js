import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { products } from "../data/Data";
import { useNavigation } from "@react-navigation/native";
const ProductComponent = ({ productId, showItem }) => {
  const navigation = useNavigation();
  const product = products.find(item => item.id === productId);
  const pressHandler = () => {
    navigation.navigate("InspectProduct", { productId: productId });
  };
  return showItem ? (
    <Pressable
      style={styles.container}
      onPress={() => {
        pressHandler();
      }}>
      <View style={styles.imageContainer}>
        <Image
          width={"100%"}
          height={"100%"}
          source={{
            uri: product.mainImgUri,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
        }}>
        <View style={styles.productTitle}>
          <Text style={styles.titleText}>{product.title}</Text>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {product.price} {"₺"}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.inspectContainer}
        onPress={() => {
          pressHandler();
        }}>
        <Text style={styles.inspectText}>Ürünü İncele {">>"}</Text>
      </Pressable>
    </Pressable>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: "2.5%",
    marginVertical: 15,
    width: "45%",
    height: 350,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    height: 150,
  },
  productTitle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryContainer: {
    minHeight: 20,
    backgroundColor: "gray",
    borderRadius: 200,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 12,
  },
  descriptionContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 14,
    color: "black",
  },
  priceContainer: {
    alignSelf: "center",
  },
  priceText: {
    fontSize: 16,
    color: "black",
  },
  inspectContainer: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
    marginBottom: 7.5,
  },
  inspectText: {
    color: "blue",
    fontSize: 14,
  },
});

export default ProductComponent;
