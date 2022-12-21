import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { REACT_APP_BACKEND_URL } from "react-native-dotenv";
import { useSelector, useDispatch } from "react-redux";
import { AllGuidesState } from "../../reducers/allGuides";
import { UserState, addBookmark, deleteBookmark } from "../../reducers/user";
import { useEffect, useState } from "react";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ArticleScreen({ navigation, route }) {
  const {
    height,
    width,
    fontScale,
  }: { height: number; width: number; fontScale: number } =
    useWindowDimensions();
  const styles: any = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const allGuides = useSelector(
    (state: { allGuides: AllGuidesState }) => state.allGuides.value
  );
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const currentArticle: any = allGuides.filter(
    (e) => e._id.toString() === route.params._id.toString()
  )[0];

  let categoryName: string = "Nos guides conso";
  let categoryLetter: string = "?";
  let categoryColor: object = { backgroundColor: "white" };

  switch (currentArticle.category) {
    case "generalities":
      categoryName = "Guides généraux";
      categoryLetter = "G";
      categoryColor = { backgroundColor: "#004FC9" };
      break;
    case "products":
      categoryName = "Fiches produits";
      categoryLetter = "P";
      categoryColor = { backgroundColor: "#00993F" };
      break;
    case "labels":
      categoryName = "Labels & Co";
      categoryLetter = "L";
      categoryColor = { backgroundColor: "#B69B02" };
      break;
    case "interviews":
      categoryName = "Entretiens";
      categoryLetter = "E";
      categoryColor = { backgroundColor: "#C9007A" };
      break;
  }

  const currentArticleTitle = () => {
    if (currentArticle.title.length > 10) {
      return "Notre guide conso";
    } else {
      return currentArticle.title;
    }
  };

  const currentArticleResume = () => {
    const resumeContent = [<Text>Résumé</Text>];
    currentArticle.resume.subtitles.forEach((e, i) => {
      resumeContent.push(
        <View key={i}>
          <Text>{currentArticle.resume.subtitles[i]}</Text>
          <Text>{currentArticle.resume.paragraphs[i]}</Text>
        </View>
      );
    });
    return resumeContent;
  };

  const currentArticleContent = () => {
    const articleContent = [<Text>Corps de l'article</Text>];

    currentArticle.main.subtitles.forEach((e, i) => {
      articleContent.push(
        <View key={i + currentArticle.resume.subtitles.length}>
          <Text>{currentArticle.main.subtitles[i]}</Text>
          <Text>{currentArticle.main.paragraphs[i]}</Text>
        </View>
      );
    });
    return articleContent;
  };

  // Ajouter un favori //

  // // Produit à enregistrer //

  const articleToBook = currentArticle._id;

  // // Changement de l'icone //

  let starIcon = "star-outline";
  if (user.bookmarks.includes(articleToBook)) {
    starIcon = "star";
  }

  // // Fonction update //

  const handleUpdateBookmark = (product) => {
    if (user.bookmarks.includes(articleToBook)) {
      fetch(`${REACT_APP_BACKEND_URL}/bookmarks/delete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "testToken",
          id: product,
        }),
      }).then((response) => response.json());
      dispatch(deleteBookmark(product));
    } else {
      fetch(`${REACT_APP_BACKEND_URL}/bookmarks/add`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "testToken",
          id: product,
        }),
      }).then((response) => response.json());
      dispatch(addBookmark(product));
    }
  };

  // Return du screen //

  return (
    <View style={styles.globalBackgroundView}>
      <SafeAreaView style={styles.globalSafeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryTitleContainer}>
              <TouchableOpacity
                style={styles.categoryBackIconContainer}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcon
                  name="chevron-left"
                  style={styles.categoryBackIcon}
                />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>
                Notre guide conso #{categoryLetter + route.params.ref}
              </Text>
              <TouchableOpacity
                style={styles.categoryBackIconContainer}
                onPress={() => handleUpdateBookmark(articleToBook)}
              >
                <MaterialCommunityIcon
                  name={starIcon}
                  style={styles.categoryBackIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.categoryScrollViewWrapper}>
              <ScrollView
                style={styles.categoryScrollViewContainer}
                contentContainerStyle={styles.categoryScrollViewContent}
              >
                <Text>{currentArticle.title}</Text>
                <Text>{currentArticle.images.main}</Text>
                <Text>{currentArticle.date}</Text>
                <Text>{currentArticle.tags}</Text>
                {currentArticleResume()}
                {currentArticleContent()}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    globalBackgroundView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
      backgroundColor: "#E5E5E5",
    },
    globalSafeAreaViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    globalViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
      paddingHorizontal: adaptToHeight(19.5),
      paddingBottom: adaptToHeight(20),
    },

    categoryContainer: {
      height: "100%",
      alignItems: "center",
    },
    categoryTitleContainer: {
      marginTop: adaptToHeight(6),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: width - adaptToWidth(30),
    },
    categoryBackIconContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: adaptToHeight(50),
      width: adaptToHeight(50),
    },
    categoryBackIcon: {
      fontSize: adaptToHeight(40), // Laisser adaptToHeight(), insensible au fontScale
    },
    categoryTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      textAlign: "center",
      marginTop: adaptToHeight(24),
      marginBottom: adaptToHeight(24),
      width: width - adaptToWidth(140),
    },
    categoryEmptyContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: adaptToHeight(50),
      width: adaptToHeight(50),
    },
    categoryScrollViewWrapper: {
      borderTopWidth: adaptToHeight(1),
      borderBottomWidth: adaptToHeight(1),
      borderColor: "grey",
      height: "88%",
      width: width - adaptToHeight(40),
    },
    categoryScrollViewContainer: {
      paddingTop: adaptToHeight(10),
    },
    categoryScrollViewContent: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: adaptToHeight(10),
    },
    categoryCard: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      height: adaptToHeight(80),
      width: width - adaptToHeight(80),
      marginBottom: adaptToHeight(10),
      backgroundColor: "#F2F2F2",
      borderRadius: adaptToHeight(6),
    },
    categoryCardMain: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderTopWidth: adaptToHeight(0.5),
      borderBottomWidth: adaptToHeight(0.5),
      borderLeftWidth: adaptToHeight(0.5),
      borderTopLeftRadius: adaptToHeight(6),
      borderBottomLeftRadius: adaptToHeight(6),
      borderColor: "grey",
      height: "100%",
      width: width - adaptToHeight(110),
      paddingLeft: adaptToHeight(10),
    },
    categoryCardImage: {
      borderRadius: adaptToHeight(6),
      borderWidth: adaptToHeight(0.5),
      borderColor: "grey",
      width: adaptToHeight(60),
      height: adaptToHeight(60),
      backgroundColor: "blue",
    },
    categoryCardTitle: {
      fontWeight: "600",
      fontSize: normalizeText(15),
      marginLeft: adaptToHeight(10),
      width: adaptToHeight(190),
    },
    categoryCardCategoryContainer: {
      height: "100%",
      width: adaptToHeight(30),
      justifyContent: "center",
      alignItems: "center",
      borderColor: "grey",
      borderWidth: adaptToHeight(0.5),
      borderBottomRightRadius: adaptToHeight(6),
      borderTopRightRadius: adaptToHeight(6),
    },
    categoryCardCategory: {
      fontWeight: "500",
      fontSize: normalizeText(15),
      color: "white",
    },
  });
};
