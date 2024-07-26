import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import { logoUri } from "../data/Data";
import { SvgUri } from "react-native-svg";
const Header = ({
  HomeScreenNavigate,
  KargoScreenNavigate,
  SepetScreenNavigate,
}) => {
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const [expandState, setExpandState] = useState(false);
  const animateHeight = val => {
    // Animasyonu başlat
    Animated.timing(heightAnimation, {
      toValue: val, // Bitiş yüksekliği
      duration: 375, // Süre (ms)
      useNativeDriver: false, // Yüksekliği animasyonla değiştirmek için false kullanılır
    }).start();
  };
  const toggleMenu = () => {
    setExpandState(!expandState);
  };
  useEffect(() => {
    if (expandState) {
      animateHeight(1);
    } else {
      animateHeight(0);
    }
  }, [expandState]);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.navbarContainer}>
        <Pressable
          style={styles.logoContainer}
          onPress={() => {
            HomeScreenNavigate();
            setExpandState(false);
          }}>
          <Image
            width={"100%"}
            height={"100%"}
            resizeMode="contain"
            source={{ uri: logoUri }}
          />
        </Pressable>
        <SvgUri
          onPress={toggleMenu}
          width={50}
          height={50}
          uri={
            "https://www.reshot.com/preview-assets/icons/D6U5PY3TJK/menu-D6U5PY3TJK.svg"
          }
        />
      </View>

      <Animated.View
        style={[
          styles.openingMenuContainer,
          {
            height: heightAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ]}>
        <Pressable
          style={styles.menuItem}
          onPress={() => {
            KargoScreenNavigate();
            setExpandState(false);
          }}>
          <SvgUri
            width={25}
            height={25}
            uri={
              "https://www.reshot.com/preview-assets/icons/Y65D9VX7LT/truck-Y65D9VX7LT.svg"
            }
          />
          <Text style={styles.menuText}>Kargo Takibi</Text>
          <View style={styles.line}></View>
        </Pressable>
        <Pressable
          style={styles.menuItem}
          onPress={() => {
            SepetScreenNavigate();
            setExpandState(false);
          }}>
          <SvgUri
            width={25}
            height={25}
            uri={
              "https://www.reshot.com/preview-assets/icons/CW9PFXK5HU/trolley-CW9PFXK5HU.svg"
            }
          />
          <Text style={styles.menuText}>Sepetim</Text>
          <View style={styles.line}></View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logoContainer: {
    width: 80,
    height: 80,
  },
  navbarContainer: {
    height: 80,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  openingMenuContainer: {
    width: "100%",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
  },
  menuItem: {
    alignSelf: "flex-start",
    width: "100%",
    overflow: "hidden",
    height: 40,
    columnGap: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuText: {
    color: "black",
    fontSize: 18,
  },
  line: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: "darkgray",
  },
});
export default Header;
