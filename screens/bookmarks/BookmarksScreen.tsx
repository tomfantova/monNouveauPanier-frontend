import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { UserState } from "../../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function BookmarksScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const initialSearchInputPlaceholder: string = "🔍  Dans mes favoris";
  const [searchInputPlaceholder, setSearchInputPlaceholder] = useState<string>(
    initialSearchInputPlaceholder
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const user = useSelector((state: { user: UserState }) => state.user.value);

  // A enlever et migrer dans l'écran des produits : ajouter un favori //

  // // Produit en dur pour tests, à remplacer par le fetch de la collection produits //

  const product = {
    title: "Huile d'olive",
    date: "20/12/2022",
    id: "12345",
  };

  // Affichage de la liste des favoris //

  let bookmarks: JSX.Element[] | JSX.Element = [];

  // // Ecran si pas de favoris //
  //
  if (!user.bookmarks.products.length) {
    bookmarks = (
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBack}
        source={require("../../assets/booksback.png")}
      >
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <Text style={styles.offersText}>
              Vous n'avez pas encore de favoris !
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    // // Affichage des favoris
    //
  }

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
            <Text style={styles.cartText}>
              {user.bookmarks.products.length}
            </Text>
            <MaterialCommunityIcon
              name="star"
              color="#002654"
              size={30}
            ></MaterialCommunityIcon>
          </View>
        </View>
        {bookmarks}
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
      width: "60%",
      textAlign: "left",
      padding: adaptToWidth(14),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
      margin: adaptToWidth(10),
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
