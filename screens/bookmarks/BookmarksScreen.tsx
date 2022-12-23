import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REACT_APP_BACKEND_URL } from "react-native-dotenv";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { UserState, deleteBookmark } from "../../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AllGuidesState } from "../../reducers/allGuides";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function BookmarksScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const initialSearchInputPlaceholder: string = "🔍  Dans mes favoris";
  const [searchInputPlaceholder, setSearchInputPlaceholder] = useState<string>(
    initialSearchInputPlaceholder
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const guides = useSelector(
    (state: { allGuides: AllGuidesState }) => state.allGuides.value
  );

  // Supprimer un favori //

  const handleRemoveBookmark = (bookmark) => {
    fetch(`${REACT_APP_BACKEND_URL}/bookmarks/delete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        id: bookmark,
      }),
    }).then((response) => response.json());
    dispatch(deleteBookmark(bookmark));
  };

  // Affichage de la liste des favoris //

  let bookmarks: JSX.Element[] | JSX.Element = [];
  let bookmarksHeader: JSX.Element[] | JSX.Element = [];
  let backImg = {};

  // // Ecran si pas de favoris //
  //
  if (user.bookmarks.length === 0) {
    bookmarks = (
      <Text style={styles.offersText}>Vous n'avez pas encore de favoris !</Text>
    );
    backImg = require("../../assets/booksback.png");
  } else {
    // // Affichage des favoris
    //
    backImg = require("../../assets/emptyback.png");
    bookmarksHeader = (
      <View style={styles.listsTitle}>
        <Text style={styles.listsText}>Vos favoris</Text>
      </View>
    );
    bookmarks = user.bookmarks
      .map((bookmarksData, i) => {
        // // Récupération des données du reducer guides avec ID du bookmark //
        let name = "";
        let date = "";
        for (let item of guides) {
          if (item._id === bookmarksData) {
            name = item.title;
            date = item.date.slice(0, 4);
          }
        }
        return (
          <View style={styles.card} key={i}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Article", {
                  _id: bookmarksData,
                  ref: "5",
                })
              }
            >
              <Text style={styles.textButton}>{name}</Text>
              <Text style={styles.textDate}>Mis à jour en {date}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleRemoveBookmark(bookmarksData)}
            >
              <FontAwesome name="trash" size={30} color="#002654"></FontAwesome>
            </TouchableOpacity>
          </View>
        );
      })
      .reverse();
  }

  // Affichage du nombre de favoris //

  const bookmarksIndex = (bookmarks) => {
    let index = 0;
    if (bookmarks) {
      index = bookmarks;
    }
    return index;
  };

  // Return du screen //

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.backgroundView}
      source={backImg}
    >
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
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
                {bookmarksIndex(user.bookmarks.length)}
              </Text>
              <MaterialCommunityIcon
                name="star"
                color="rgb(241, 161, 0)"
                size={30}
                style={styles.icon}
              ></MaterialCommunityIcon>
            </View>
          </View>
          {bookmarksHeader}
          <KeyboardAwareScrollView>{bookmarks}</KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
      height: "100%",
      width: "100%",
    },
    offersText: {
      fontWeight: "600",
      marginTop: adaptToWidth(294),
      fontSize: normalizeText(20),
    },
    header: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
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
      marginLeft: adaptToWidth(50),
      backgroundColor: "white",
    },
    icon: {
      marginRight: adaptToWidth(45),
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
      marginRight: adaptToWidth(5.8),
    },
    button: {
      marginVertical: adaptToWidth(5),
      width: adaptToWidth(300),
      alignItems: "center",
      paddingTop: adaptToWidth(8),
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      marginRight: adaptToWidth(20),
    },
    textButton: {
      color: "black",
      height: adaptToWidth(24),
      fontWeight: "600",
      fontSize: normalizeText(15),
    },
    textDate: {
      color: "#002654",
      fontSize: normalizeText(13),
      paddingBottom: adaptToWidth(5),
    },
    lists: {
      marginTop: adaptToWidth(5),
      marginBottom: adaptToWidth(20),
      alignSelf: "flex-start",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
    },
    listsTitle: {
      width: adaptToWidth(330),
      paddingBottom: adaptToWidth(5),
      marginVertical: adaptToWidth(20),
      borderBottomWidth: 2,
      borderBottomColor: "#002654",
    },
    listsText: {
      marginTop: adaptToWidth(5),
      alignSelf: "flex-start",
      fontSize: normalizeText(18),
    },
  });
};
