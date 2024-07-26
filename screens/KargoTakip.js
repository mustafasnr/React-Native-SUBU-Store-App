import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Keyboard,
  Animated,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { siparisler } from "../data/Data";
import { SvgUri } from "react-native-svg";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const KargoInfo = ({ siparisNo, expandState }) => {
  const info = siparisler.find(item => item.buyNo == siparisNo);
  const animateHeight = useRef(new Animated.Value(0)).current;

  const setHeight = val => {
    Animated.timing(animateHeight, {
      toValue: val,
      duration: val !== 0 ? 750 : 0,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (expandState) {
      setHeight(1);
    } else {
      setHeight(0);
    }
  }, [expandState]);

  return (
    <Animated.View
      style={{
        height: animateHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 250],
        }),
        overflow: "hidden",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {info ? (
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            height: "100%",
            justifyContent: "space-around",
          }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>
              Alıcı:{" "}
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>{info.buyer}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>
              Sipariş Zamanı:{" "}
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>{info.date} </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>
              Tahmini Teslimat:{" "}
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>{info.eta}</Text>
          </View>
          <View style={{ width: "100%", flexDirection: "column" }}>
            <Text
              style={{
                color: "black",
                fontSize: 14,
                marginBottom: 5,
                fontWeight: "bold",
              }}>
              Adres:{" "}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 14,
                paddingHorizontal: 10,
                alignSelf: "center",
              }}>
              {info.addressLine}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>
              Şehir:{" "}
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>
              {info.city + " / " + info.state}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={{ fontSize: 26, color: "black" }}>Sipariş Bulunamadı</Text>
      )}
    </Animated.View>
  );
};

const KargoTakip = () => {
  const isScreenFocused = useIsFocused();
  const navigation = useNavigation();
  const [inputText, setText] = useState("");
  const [query, setQuery] = useState("");
  const [openBox, setOpen] = useState(false);

  useEffect(() => {
    if (!isScreenFocused) {
      setText("");
      setQuery("");
      setOpen(false);
    }
  }, [isScreenFocused]);

  return (
    <View style={styles.container}>
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
          Kargo Takibi
        </Text>
      </View>
      <View style={styles.box}>
        <View style={[styles.fixed, { borderBottomWidth: openBox ? 1 : 0 }]}>
          <View style={styles.inputContainer}>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                position: "absolute",
                opacity: inputText.length !== 0 ? 0 : 1,
              }}>
              Sipariş Numarasını Girin
            </Text>
            <TextInput
              keyboardType="numeric"
              textAlign="center"
              maxLength={10}
              style={styles.input}
              value={inputText}
              onChangeText={setText}
              onFocus={() => {}}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            />
          </View>

          <Pressable
            disabled={inputText.length !== 10 ? true : false}
            onPress={() => {
              Keyboard.dismiss();
              if (inputText.length === 10) {
                setQuery(inputText);
                setOpen(true);
              }
            }}
            style={{
              opacity: inputText.length !== 10 ? 0.65 : 1,
              width: 150,
              height: 50,
              borderRadius: 10,
              backgroundColor: "blue",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 20, color: "white" }}>Sorgula</Text>
          </Pressable>
        </View>
        <KargoInfo siparisNo={Number(query)} expandState={openBox} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    height: 60,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fixed: {
    paddingVertical: 15,
    width: "100%",
    flexDirection: "column",
    rowGap: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    borderRadius: 10,
    height: 60,
    borderWidth: 1,
    borderColor: "lightgray",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "black",
    fontSize: 14,
    height: "100%",
    width: "100%",
  },
});

export default KargoTakip;
