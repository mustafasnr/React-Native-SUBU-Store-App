import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { products } from "../data/Data";
import { ScrollView } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../store/cart";

const Urun = ({ id, amount, size }) => {
  const dispatch = useDispatch();
  const urunTemplate = products.find(item => item.id === id) || null;
  return (
    <View style={styles.container}>
      <View style={styles.urun}>
        <View style={styles.imageContainer}>
          <Image
            width={"100%"}
            height={"100%"}
            source={{ uri: urunTemplate.mainImgUri }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: "black",
              fontSize: 18,
            }}>
            {urunTemplate.title}
          </Text>
          <Text style={{ color: "black", fontSize: 16 }}>
            {"Beden: " + size}
          </Text>
          <View
            style={{
              width: "95%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Text style={{ color: "black", fontSize: 16 }}>
              {"₺" + (urunTemplate.price * amount).toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 10,
          width: 120,
          height: 50,
          borderRadius: 15,
          borderWidth: 0.5,
          zIndex: 2,
          backgroundColor: "#eee",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}>
        <Pressable
          onPress={() => {
            const product = {
              id: urunTemplate.id,
              size: size,
            };
            dispatch(removeProduct(product));
          }}
          style={{
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "black", fontSize: 20 }}>-</Text>
        </Pressable>
        <View
          style={{
            width: 29,
            height: 29,
            borderRadius: 7.5,
            borderWidth: 0.5,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "black", fontSize: 18 }}>{amount}</Text>
        </View>
        <Pressable
          onPress={() => {
            const product = {
              id: urunTemplate.id,
              size: size,
              amount: 1,
            };
            dispatch(addProduct(product));
          }}
          style={{
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "black", fontSize: 20 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Sepet = () => {
  const navigation = useNavigation();
  const { cart } = useSelector(state => state.cartReduce);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <View style={styles.header}>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 0.25,
            borderColor: "#aaa",
            elevation: 1,
          }}></View>
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: 50,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}>
          <SvgUri
            width={40}
            height={40}
            uri={"https://www.svgrepo.com/show/494008/back.svg"}
          />
        </Pressable>
        <Text style={{ color: "black", fontSize: 24, alignSelf: "center" }}>
          Sepet
        </Text>
      </View>
      {cart.length > 0 ? (
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}>
          <View style={{ width: "100%", rowGap: 15, paddingVertical: 15 }}>
            {cart.map((item, index) => {
              return (
                <Urun
                  key={"sepet_" + index.toString()}
                  id={item.id}
                  amount={item.amount}
                  size={item.size}
                />
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "black", fontSize: 20 }}>Sepetiniz Boş</Text>
        </View>
      )}

      <View style={styles.footer}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth: 0.25,
            borderColor: "#aaa",
            elevation: 1,
          }}></View>
        <Pressable
          onPress={() => {
            return;
          }}
          style={{
            backgroundColor: "blue",
            height: 40,
            width: 200,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "white", fontSize: 16 }}>Ödemeye Geç</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 125,
    alignSelf: "center",
  },
  urun: {
    width: "100%",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignSelf: "center",
    height: 100,
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 0.5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "red",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    height: 60,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    backgroundColor: "white",
    height: 60,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default Sepet;
