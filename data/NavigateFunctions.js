import { useNavigation } from "@react-navigation/native";
const navigation = useNavigation();

export const HomeScreenNavigate = () => {
  navigation.navigate("Home");
};

export const KargoScreenNavigate = () => {
  navigation.navigate("KargoTakip");
};

export const SepetScreenNavigate = () => {
  navigation.navigate("Sepet");
};

export const InscpectScreenNavigate = () => {
  navigation.navigate("InspectProduct");
};
