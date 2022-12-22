import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function OffersScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const initialSearchInputPlaceholder: string = "🔍  Rechercher une offre";
  const [searchInputPlaceholder, setSearchInputPlaceholder] = useState<string>(
    initialSearchInputPlaceholder
  );
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchInputPlaceholder}
            placeholderTextColor="grey"
            onFocus={() => setSearchInputPlaceholder("")}
            onBlur={() =>
              setSearchInputPlaceholder(initialSearchInputPlaceholder)
            }
            onChangeText={(e: string) => setSearchInput(e)}
            value={searchInput}
          />
          <View style={styles.cart}>
            <Text style={styles.cartText}>0</Text>
            <FontAwesome
              name="shopping-basket"
              color="#002654"
              size={22}
              style={styles.icon}
            ></FontAwesome>
          </View>
        </View>
        <ImageBackground
          resizeMode="cover"
          style={styles.imageBack}
          source={require("../../assets/offersback.png")}
        >
          <SafeAreaView style={styles.safeAreaViewContainer}>
            <View style={styles.globalViewContainer}>
              <Text style={styles.offersText}>
                Il n'y a pas d'offres pour le moment !
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
}

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeight = (size: number) => {
    return (height * size) / 844;
  };

  const adaptToWidth = (size: number) => {
    return (width * size) / 390;
  };

  const normalizeText = (size: number) => {
    return (width * size) / 390 / fontScale;
  };

  return StyleSheet.create({
    backgroundView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    safeAreaViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    globalViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: adaptToWidth(20),
      paddingVertical: adaptToWidth(20),
    },
    icon: {
      marginRight: adaptToWidth(26),
      marginLeft: adaptToWidth(2.5),
    },
    imageBack: { flex: 1, justifyContent: "center" },
    offersText: {
      fontWeight: "600",
      fontSize: normalizeText(20),
    },
    header: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      height: adaptToHeight(60),
    },
    searchInput: {
      fontSize: normalizeText(15),
      width: "70%",
      textAlign: "left",
      padding: adaptToWidth(14),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
      margin: adaptToWidth(10),
      marginLeft: adaptToWidth(30),
      backgroundColor: "white",
    },
    cart: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "30%",
      height: adaptToHeight(60),
    },
    cartText: {
      fontSize: normalizeText(20),
      marginRight: adaptToWidth(7),
    },
  });
};
