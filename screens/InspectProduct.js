import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Carousel from "pinar";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cart";
import { products } from "../data/Data";

const SizeButton = ({ isActive, setFunction, setSize, buttonText }) => {
  return (
    <Pressable
      onPress={() => {
        setFunction(setSize);
      }}
      style={isActive ? styles.buttonActive : styles.buttonPassive}>
      <Text style={isActive ? styles.activeText : styles.passiveText}>
        {buttonText}
      </Text>
    </Pressable>
  );
};
const ProductAddedModal = ({ isVisible, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Opaklık değeri için animasyon durumu

  useEffect(() => {
    if (isVisible) {
      // Modal gösterildiğinde animasyonla açılış
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 125, // 0.5 saniye sürede açılacak
        easing: Easing.linear, // Animasyon stilini belirleme
        useNativeDriver: true,
      }).start();
      // 3 saniye sonra kapanacak
      setTimeout(() => {
        onClose();
      }, 1250);
    } else {
      // Modal kapanışı
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 125, // 0.5 saniye sürede kapanacak
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 2,
        alignSelf: "center",
        top: "25%",
      }}>
      <Animated.View
        style={[
          styles.modalView,
          {
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          },
        ]}>
        <Text style={styles.modalText}>Ürün Eklendi!</Text>
      </Animated.View>
    </View>
  );
};

const CarouselComponent = ({ images }) => {
  const [imageUris, setUris] = useState(images);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setUris([]);
    } else {
      setUris(images);
    }
  }, [isFocused]);
  return isFocused ? (
    <View style={{ width: "100%", height: "100%" }}>
      <Carousel
        automaticallyAdjustContentInsets={false}
        style={{ width: "100%", height: "100%" }}
        bounces={false}
        autoplay={true}
        autoplayInterval={1500}
        loop={true}
        horizontal={true}
        showsControls={true}
        dotStyle={styles.dotStyle}
        controlsTextStyle={{ fontSize: 60, color: "white" }}
        activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}>
        {imageUris.map(element => {
          return (
            <Image
              key={element}
              width={"100%"}
              height={"100%"}
              source={{ uri: element }}
              resizeMode="cover"
            />
          );
        })}
      </Carousel>
    </View>
  ) : (
    <></>
  );
};

const InspectProduct = ({ route }) => {
  const dispatch = useDispatch();
  const isScreenFocused = useIsFocused();
  const navigation = useNavigation();
  const { productId: id } = route.params;
  const product = products.find((item => item.id === id));
  const scrollViewRef = useRef(null);

  const productSizes = product.sizes;
  const [active, setActive] = useState(productSizes.length === 1 ? 0 : -1);
  const [amount, setAmount] = useState(1);
  const images =
    product.sliderImgUris.length != 0
      ? [product.mainImgUri, ...product.sliderImgUris]
      : [product.mainImgUri];
  const carouselHeightAnimate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isScreenFocused) {
      setActive(null);
      setAmount(1);
      Animated.timing(carouselHeightAnimate, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else {
      setActive(productSizes.length === 1 ? 0 : -1);
      setAmount(1);
      Animated.timing(carouselHeightAnimate, {
        toValue: 325,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isScreenFocused]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    setModalVisible(true); // Butona basıldığında modalı göster
  };

  const closeModal = () => {
    setModalVisible(false); // Modal kapatma işlevi
  };
  return (
    <View style={styles.container}>
      <ProductAddedModal isVisible={modalVisible} onClose={closeModal} />
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
          Ürün Detayları
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{ width: "100%", flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            paddingTop: 15,
            alignItems: "center",
            flexDirection: "column",
          }}>
          <Animated.View
            style={{
              width: "95%",
              height: carouselHeightAnimate,
              borderRadius: 10,
              overflow: "hidden",
            }}>
            <CarouselComponent images={images} />
          </Animated.View>
          <View style={styles.titleContainer}>
            <Text style={{ color: "black", fontSize: 24, textAlign: "center" }}>
              {product.title}
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              justifyContent: "space-between",
              rowGap: 15,
              paddingVertical: 5,
              marginBottom: 10,
              flexDirection: "column",
              alignItems: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 20 }}>
              {"Fiyat: " + product.price + " ₺"}
            </Text>
            <Text style={{ color: "black", fontSize: 16 }}>
              {product.description}
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              justifyContent: "space-between",
              rowGap: 5,
              paddingVertical: 5,
              marginBottom: 10,
              flexDirection: "column",
              alignItems: "flex-start",
            }}>
            <Text style={{ color: "black", fontSize: 24 }}>Beden</Text>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "black",
              }}></View>

            {product.sizes.length !== 1 && active < 0 ? (
              <Text style={{ color: "red", fontSize: 16 }}>
                Lütfen Beden Seçiniz!
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            {productSizes.map((item, index) => {
              if (productSizes.length !== 1) {
                return (
                  <SizeButton
                    key={"btn_" + index.toString()}
                    setSize={index}
                    setFunction={setActive}
                    isActive={active === index}
                    buttonText={productSizes[index]}
                  />
                );
              } else {
                return (
                  <SizeButton
                    key={"btn_" + index.toString()}
                    setSize={index}
                    setFunction={setActive}
                    isActive={active === index}
                    buttonText={productSizes[index]}
                  />
                );
              }
            })}
          </View>
        </View>
      </ScrollView>

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
        <View
          style={{
            width: 150,
            height: "80%",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setAmount(amount !== 1 ? amount - 1 : 1);
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}>
              -
            </Text>
          </Pressable>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: "lightgray",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text style={{ color: "black", fontSize: 20 }}>{amount}</Text>
          </View>

          <Pressable
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setAmount(amount + 1);
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}>
              +
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            if (active >= 0) {
              handleAddToCart();
              dispatch(
                addProduct({
                  id: product.id,
                  amount: amount,
                  size: productSizes[active],
                }),
              );
            }
          }}
          style={{
            backgroundColor: "blue",
            height: "80%",
            width: 150,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "white", fontSize: 16 }}>Sepete Ekle</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
    height: 70,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    minHeight: 60,
  },
  buttonsContainer: {
    width: "90%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 10,
  },
  buttonPassive: {
    height: 40,
    minWidth: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonActive: {
    height: 40,
    minWidth: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  activeText: {
    color: "white",
    fontSize: 20,
  },
  passiveText: {
    color: "blue",
    fontSize: 20,
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  dotStyle: {
    width: 25,
    borderRadius: 5,
    height: 5,
    backgroundColor: "silver",
    marginRight: 5,
  },
});

export default InspectProduct;
