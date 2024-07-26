import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import ProductComponent from "../components/ProductComponent";
import Header from "../components/Header";
import { products } from "../data/Data";
import {
  KargoScreenNavigate,
  HomeScreenNavigate,
  SepetScreenNavigate,
} from "../data/NavigateFunctions";
import { useNavigation } from "@react-navigation/native";

const SelectCategoryButtons = ({ activeCategory, functions }) => {
  return (
    <View style={styles.buttonsContainer}>
      <View
        style={{
          position: "absolute",
          bottom: -15,
          left: 0,
          right: 0,
          borderBottomWidth: 0.75,
          borderColor: "#aaa",
          elevation: 5,
        }}></View>
      <Pressable
        style={
          activeCategory === 0 ? styles.buttonActive : styles.buttonPassive
        }
        onPress={functions[0]}>
        <Text
          style={
            activeCategory === 0
              ? styles.buttonActiveText
              : styles.buttonPassiveText
          }>
          Hepsi
        </Text>
      </Pressable>
      <Pressable
        style={
          activeCategory === 1 ? styles.buttonActive : styles.buttonPassive
        }
        onPress={functions[1]}>
        <Text
          style={
            activeCategory === 1
              ? styles.buttonActiveText
              : styles.buttonPassiveText
          }>
          Giyim
        </Text>
      </Pressable>
      <Pressable
        style={
          activeCategory === 2 ? styles.buttonActive : styles.buttonPassive
        }
        onPress={functions[2]}>
        <Text
          style={
            activeCategory === 2
              ? styles.buttonActiveText
              : styles.buttonPassiveText
          }>
          Ofis ve Dekorasyon
        </Text>
      </Pressable>
    </View>
  );
};
const CategoryTitle = ({ title, showTitle }) => {
  return showTitle ? (
    <View
      style={{
        width: "95%",
        overflow: "hidden",
        alignSelf: "center",
        rowGap: 2.5,
        borderRadius: 5,
      }}>
      <Text style={{ paddingLeft: 5, fontSize: 24, color: "black" }}>
        {title}
      </Text>
      <View
        style={{
          width: "100%",
          height: 2.5,
          borderRadius: 1,
          backgroundColor: "black",
        }}></View>
    </View>
  ) : (
    <></>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <Header
        HomeScreenNavigate={HomeScreenNavigate}
        KargoScreenNavigate={KargoScreenNavigate}
        SepetScreenNavigate={SepetScreenNavigate}
      />
      <SelectCategoryButtons
        activeCategory={category}
        functions={[
          () => {
            setCategory(0);
          },
          () => {
            setCategory(1);
          },
          () => {
            setCategory(2);
          },
        ]}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 10,
            width: "100%",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}>
          <CategoryTitle
            title={"Giyim"}
            showTitle={category === 1 || category === 0}
          />
          {products.map((item, index) => {
            if (item.category.toLowerCase() === "giyim") {
              return (
                <ProductComponent
                  productId={item.id}
                  showItem={category === 1 || category === 0}
                  key={"giyim_" + index.toString()}
                />
              );
            }
          })}
          <CategoryTitle
            title={"Ofis ve Dekorasyon"}
            showTitle={category === 2 || category === 0}
          />
          {products.map((item, index) => {
            if (item.category.toLowerCase() === "ofis ve dekorasyon") {
              return (
                <ProductComponent
                  productId={item.id}
                  showItem={category === 2 || category === 0}
                  key={"giyim_" + index.toString()}
                />
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 5,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    height: 30,
  },
  buttonPassiveText: {
    color: "blue",
    fontSize: 12,
  },
  buttonActiveText: {
    color: "white",
    fontSize: 12,
  },
  buttonPassive: {
    paddingHorizontal: 20,
    height: "100%",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    paddingHorizontal: 20,
    height: "100%",
    borderWidth: 1,
    backgroundColor: "blue",
    borderColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
