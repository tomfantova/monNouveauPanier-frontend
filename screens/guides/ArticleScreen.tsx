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

  const [globalImages, setGlobalImages] = useState({
    balsalmicVinegar: require("../../assets/products/balsamic-vinegar.jpg"),
    beef: require("../../assets/products/beef.jpg"),
    biscuits: require("../../assets/products/biscuits.jpg"),
    bread: require("../../assets/products/bread.jpg"),
    butter: require("../../assets/products/butter.jpg"),
    cereals: require("../../assets/products/cereals.jpg"),
    charcuterie: require("../../assets/products/charcuterie.jpg"),
    chicken: require("../../assets/products/chicken.jpg"),
    eggs: require("../../assets/products/eggs.jpg"),
    exoticFruits: require("../../assets/products/exotic-fruits.jpg"),
    fish: require("../../assets/products/fish.jpg"),
    fromages: require("../../assets/products/fromages.jpg"),
    fruitJuices: require("../../assets/products/fruit-juices.jpg"),
    fruits: require("../../assets/products/fruits.jpg"),
    honey: require("../../assets/products/honey.jpg"),
    milk: require("../../assets/products/milk.jpg"),
    mustard: require("../../assets/products/mustard.jpg"),
    oliveOil: require("../../assets/products/olive-oil.jpg"),
    pasta: require("../../assets/products/pasta.jpg"),
    pastries: require("../../assets/products/pastries.jpg"),
    readyMeals: require("../../assets/products/ready-meals.jpg"),
    rice: require("../../assets/products/rice.jpg"),
    salt: require("../../assets/products/salt.jpg"),
    spices: require("../../assets/products/spices.jpg"),
    spirits: require("../../assets/products/spirits.jpg"),
    terrines: require("../../assets/products/terrines.jpg"),
    vegetables: require("../../assets/products/vegetables.jpg"),
    vegetalOils: require("../../assets/products/vegetal-oils.jpg"),
    viennoiseries: require("../../assets/products/viennoiseries.jpg"),
    vinegar: require("../../assets/products/vinegar.jpg"),
    wines: require("../../assets/products/wines.jpg"),
    yogourts: require("../../assets/products/yogourts.jpg"),
  });

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

  const currentArticleResume = () => {
    const resumeContent = [];
    currentArticle.resume.subtitles.forEach((e, i) => {
      let borderColor = {};
      if (e === "Garanties responsables") {
        borderColor = { borderColor: "rgba(0, 122, 1, 0.6)" };
      } else if (e === "Points d'attention") {
        borderColor = { borderColor: "#FFC300" };
      } else {
        borderColor = { borderColor: "rgba(199, 0, 57, 0.5)" };
      }
      resumeContent.push(
        <View style={[styles.resumeCard, borderColor]} key={i}>
          <Text style={styles.titleResume}>
            {currentArticle.resume.subtitles[i]}
          </Text>
          <Text style={styles.regularText}>
            {currentArticle.resume.paragraphs[i]}
          </Text>
        </View>
      );
    });
    return resumeContent;
  };

  const currentArticleContent = () => {
    const articleContent = [];

    currentArticle.main.subtitles.forEach((e, i) => {
      articleContent.push(
        <View key={i + currentArticle.resume.subtitles.length}>
          <Text style={styles.titleText}>
            {currentArticle.main.subtitles[i]}
          </Text>
          <Text style={styles.contentText}>
            {currentArticle.main.paragraphs[i]}
          </Text>
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
  let starColor = "black";
  if (!user.bookmarks.length) {
    if (user.bookmarks.includes(articleToBook)) {
      starIcon = "star";
      starColor = "rgb(241, 161, 0)";
    }
  }

  // // Fonction update //

  const handleUpdateBookmark = (product) => {
    if (!user.bookmarks.length) {
      if (user.bookmarks.includes(articleToBook)) {
        fetch(`${REACT_APP_BACKEND_URL}/bookmarks/delete`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: user.token,
            id: product,
          }),
        }).then((response) => response.json());
        dispatch(deleteBookmark(product));
      } else {
        fetch(`${REACT_APP_BACKEND_URL}/bookmarks/add`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: user.token,
            id: product,
          }),
        }).then((response) => response.json());
        dispatch(addBookmark(product));
      }
    }
  };

  // Gestion des images (require ne prend que les Strings en dur) //

  const honey = require("../../assets/guides/news-honey.jpg");
  let image = {};
  switch (currentArticle.images.main) {
    case "honey":
      image = honey;
      break;
  }

  // Affichage des tags //

  let tags = [];
  tags = currentArticle.tags.map((tagsData, i) => {
    return (
      <View key={i} style={styles.tags}>
        <Text style={styles.textTags}>#{tagsData}</Text>
      </View>
    );
  });

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
                  color={starColor}
                  style={styles.categoryBackIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.categoryScrollViewWrapper}>
              <ScrollView
                style={styles.categoryScrollViewContainer}
                contentContainerStyle={styles.categoryScrollViewContent}
              >
                <View style={styles.titleCard}>
                  <Image
                    source={image}
                    defaultSource={image}
                    style={styles.picture}
                  />
                  <View>
                    <Text style={styles.categoryGuideTitle}>
                      {currentArticle.title}
                    </Text>

                    <Text style={styles.regularText}>
                      Mis à jour en {currentArticle.date.slice(0, 4)}
                    </Text>
                    <View style={styles.allTags}>{tags}</View>
                  </View>
                </View>
                {currentArticleResume()}
                <View style={styles.contentCard}>
                  {currentArticleContent()}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeigth = (size: number) => {
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
      paddingHorizontal: adaptToWidth(19.5),
      paddingBottom: adaptToWidth(20),
    },

    categoryContainer: {
      height: "100%",
      alignItems: "center",
    },
    categoryTitleContainer: {
      marginTop: adaptToWidth(6),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: width - adaptToWidth(30),
    },
    categoryBackIconContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: adaptToWidth(50),
      width: adaptToWidth(50),
    },
    categoryBackIcon: {
      fontSize: adaptToWidth(40), // Laisser adaptToWidth(), insensible au fontScale
    },
    categoryTitle: {
      fontWeight: "600",
      fontSize: normalizeText(20),
      textAlign: "center",
      marginTop: adaptToWidth(24),
      marginBottom: adaptToWidth(24),
      width: width - adaptToWidth(140),
    },
    categoryEmptyContainer: {
      justifyContent: "center",
      alignItems: "center",
      height: adaptToWidth(50),
      width: adaptToWidth(50),
    },
    categoryScrollViewWrapper: {
      borderTopWidth: adaptToWidth(1),
      borderBottomWidth: adaptToWidth(1),
      borderColor: "grey",
      height: "88%",
      width: width - adaptToWidth(40),
    },
    categoryScrollViewContainer: {
      paddingTop: adaptToWidth(10),
    },
    categoryScrollViewContent: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: adaptToWidth(10),
    },
    categoryCard: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      height: adaptToWidth(80),
      width: width - adaptToWidth(80),
      marginBottom: adaptToWidth(10),
      backgroundColor: "#F2F2F2",
      borderRadius: adaptToWidth(6),
    },
    categoryCardMain: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderTopWidth: adaptToWidth(0.5),
      borderBottomWidth: adaptToWidth(0.5),
      borderLeftWidth: adaptToWidth(0.5),
      borderTopLeftRadius: adaptToWidth(6),
      borderBottomLeftRadius: adaptToWidth(6),
      borderColor: "grey",
      height: "100%",
      width: width - adaptToWidth(110),
      paddingLeft: adaptToWidth(10),
    },
    categoryCardImage: {
      borderRadius: adaptToWidth(6),
      borderWidth: adaptToWidth(0.5),
      borderColor: "grey",
      width: adaptToWidth(60),
      height: adaptToWidth(60),
      backgroundColor: "blue",
    },
    categoryCardTitle: {
      fontWeight: "600",
      fontSize: normalizeText(15),
      marginLeft: adaptToWidth(10),
      width: adaptToWidth(190),
    },
    categoryCardCategoryContainer: {
      height: "100%",
      width: adaptToWidth(30),
      justifyContent: "center",
      alignItems: "center",
      borderColor: "grey",
      borderWidth: adaptToWidth(0.5),
      borderBottomRightRadius: adaptToWidth(6),
      borderTopRightRadius: adaptToWidth(6),
    },
    categoryCardCategory: {
      fontWeight: "500",
      fontSize: normalizeText(15),
      color: "white",
    },
    picture: {
      borderRadius: adaptToWidth(10),
      width: adaptToWidth(100),
      height: adaptToWidth(100),
      marginRight: adaptToWidth(10),
    },
    categoryGuideTitle: {
      fontWeight: "600",
      fontSize: normalizeText(25),
    },
    regularText: {
      fontSize: normalizeText(15),
    },
    allTags: {
      flexDirection: "row",
    },
    tags: {
      flexDirection: "row",
      backgroundColor: "rgba(123, 182, 215, 0.5)",
      borderRadius: adaptToWidth(6),
      marginTop: adaptToWidth(15),
      marginRight: adaptToWidth(3),
      padding: adaptToWidth(3),
    },
    textTags: { fontSize: normalizeText(12) },
    titleCard: {
      flexDirection: "row",
      marginTop: adaptToWidth(16),
      marginBottom: adaptToWidth(16),
      width: "100%",
      borderRadius: adaptToWidth(8),
      backgroundColor: "white",
      padding: adaptToWidth(15),
    },
    resumeCard: {
      marginTop: adaptToWidth(4),
      marginBottom: adaptToWidth(4),
      width: "100%",
      borderRadius: adaptToWidth(8),
      backgroundColor: "white",
      padding: adaptToWidth(12),
      borderWidth: adaptToWidth(2),
    },
    titleResume: {
      fontWeight: "600",
      fontSize: normalizeText(16),
      marginBottom: adaptToWidth(8),
    },
    titleText: {
      fontWeight: "600",
      fontSize: normalizeText(16),
      marginBottom: adaptToWidth(20),
    },
    contentCard: {
      marginTop: adaptToWidth(16),
      marginBottom: adaptToWidth(16),
      width: "100%",
      borderRadius: adaptToWidth(8),
      backgroundColor: "white",
      padding: adaptToWidth(12),
    },
    contentText: {
      fontSize: normalizeText(15),
      marginBottom: adaptToWidth(20),
    },
  });
};
