import React from "react";
import { useState } from "react";
import { REACT_APP_BACKEND_URL } from "react-native-dotenv";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentList } from "../../reducers/currentList";
import {
  changeArticleStatus,
  removeExecutedList,
  UserState,
} from "../../reducers/executedList";
import { changeListStatus } from "../../reducers/user";
import { modifyTrue } from "../../reducers/modifyList";

export default function ExecutedScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const [modalArticlesVisible, setmodalArticlesVisible] = useState(false);
  const [catOpened, setCatOpened] = useState("");
  const dispatch = useDispatch();
  const executedList = useSelector(
    (state: { executedList: UserState }) => state.executedList.value
  );

  // Afficher les articles d'un rayon dont ouverture et fermeture modale //

  // // Modale //

  const handleOpenmodalArticles = (category, items) => {
    setCatOpened(category);
    setmodalArticlesVisible(true);
  };

  const handleCloseModalArticles = () => {
    setCatOpened("");
    setmodalArticlesVisible(false);
  };

  const addCart = (category, article) => {
    dispatch(
      changeArticleStatus({ categoryName: category, articleName: article })
    );
  };

  // // Récupération de l'index du rayon pour map sur articles //

  const index = executedList.categories.map((e) => e.name).indexOf(catOpened);

  let displayArticles = null;

  if (index > -1) {
    displayArticles = executedList.categories[index].items.map(
      (articlesData: any, i: number) => {
        //
        // Changement de l'icone si l'article est mis dans le caddie //
        //
        let iconName = "";
        if (articlesData.active) {
          iconName = "cart-arrow-down";
        } else {
          iconName = "check";
        }
        //
        // Changement du style si l'article est mis dans le caddie //
        //
        let inputStyle = "white";
        let textStyle = {};
        if (!articlesData.active) {
          inputStyle = "#c8c8c8";
          textStyle = { textDecorationLine: "line-through" };
        }
        return (
          <View key={i}>
            <View style={styles.articlesCard}>
              <TouchableOpacity activeOpacity={0.8}>
                <FontAwesome name="info-circle" size={25} color="#002654" />
              </TouchableOpacity>
              <View
                style={[styles.articlesInput, { backgroundColor: inputStyle }]}
              >
                <Text style={[styles.nameText, textStyle]}>
                  {articlesData.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => addCart(catOpened, articlesData.name)}
              >
                <FontAwesome name={iconName} size={30} color="#002654" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    );
  }

  // Afficher les rayons de la liste en cours d'exécution //

  let viewSections = [];
  if (executedList) {
    viewSections = executedList.categories.map(
      (categoryData: any, i: number) => {
        //
        // // Gestion des images (require ne prend que les Strings en dur) //

        const legume = require("../../assets/lists/legumes.png");
        const viande = require("../../assets/lists/viandes.jpg");
        const poisson = require("../../assets/lists/poissons.png");
        const epicerie = require("../../assets/lists/epicerie.jpeg");
        const dessert = require("../../assets/lists/desserts.png");
        const rayon = require("../../assets/lists/rayon.png");
        let image = {};
        switch (categoryData.image) {
          case "legumes.png":
            image = legume;
            break;
          case "viandes.jpg":
            image = viande;
            break;
          case "poissons.png":
            image = poisson;
            break;
          case "epicerie.jpeg":
            image = epicerie;
            break;
          case "desserts.png":
            image = dessert;
            break;
          default:
            image = rayon;
        }
        //
        // // Return du map //
        return (
          <View key={i} style={styles.sectionContainer}>
            <View style={styles.head}>
              <Text style={styles.categoryText}>{categoryData.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleOpenmodalArticles(categoryData.name, categoryData.items);
              }}
            >
              <Image
                source={image}
                defaultSource={image}
                style={styles.picture}
              />
            </TouchableOpacity>
          </View>
        );
      }
    );
  }

  // Retour arrière //

  let listName = "";
  if (executedList) {
    listName = executedList.name;
  }

  const handleQuit = () => {
    navigation.navigate("ListsView");
  };

  // Renvoyer la liste en modification dans SectionsScreen //

  const handleModify = () => {
    dispatch(addCurrentList(executedList));
    dispatch(modifyTrue());
    navigation.navigate("Sections");
  };

  // Archiver la liste //

  const handleArchive = () => {
    const date = new Date();
    const archiveDate = date.toLocaleDateString("fr");
    fetch(`${REACT_APP_BACKEND_URL}/lists/archive`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId: executedList.id,
        date: archiveDate,
      }),
    }).then((response) => response.json());
    dispatch(changeListStatus({ id: executedList.id, date: archiveDate }));
    navigation.navigate("ListsView");
  };

  // Return du screen //

  return (
    <View style={styles.backgroundView}>
      <Modal visible={modalArticlesVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.openedCat}>{catOpened}</Text>
            <KeyboardAwareScrollView>{displayArticles}</KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => handleCloseModalArticles()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handleQuit()}>
              <FontAwesome name="chevron-left" color="#002654" size={30} />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}>{listName}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Voici votre liste !</Text>
          <KeyboardAwareScrollView contentContainerStyle={styles.sections}>
            {viewSections}
          </KeyboardAwareScrollView>
          <TouchableOpacity
            onPress={() => handleModify()}
            style={styles.archiveButton}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Modifier cette liste</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleArchive()}
            style={styles.archiveButton}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Terminé ? Archiver la liste</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Style du screen //

const makeStyles = (height, width, fontScale) => {
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
      paddingHorizontal: adaptToWidth(5),
      paddingVertical: adaptToWidth(20),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: adaptToWidth(350),
      justifyContent: "flex-start",
      marginBottom: adaptToWidth(30),
    },
    title: {
      alignItems: "center",
      width: adaptToWidth(305),
    },
    titleText: {
      fontWeight: "bold",
      fontSize: normalizeText(17),
    },
    subtitle: {
      fontSize: normalizeText(18),
      fontWeight: "bold",
      marginBottom: adaptToWidth(10),
    },
    categoryText: {
      fontSize: normalizeText(15),
      fontWeight: "bold",
    },
    sections: {
      margin: adaptToWidth(10),
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    sectionContainer: {
      margin: adaptToWidth(7),
    },
    picture: {
      borderRadius: adaptToWidth(10),
      width: adaptToWidth(150),
      height: adaptToWidth(150),
    },
    head: {
      paddingBottom: adaptToWidth(5),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: adaptToWidth(55),
    },
    modalView: {
      height: adaptToWidth(730),
      width: adaptToWidth(380),
      backgroundColor: "#f1f5f8",
      borderRadius: adaptToWidth(20),
      padding: adaptToWidth(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: adaptToWidth(10),
        height: adaptToWidth(10),
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: adaptToWidth(150),
      alignItems: "center",
      marginTop: adaptToWidth(20),
      paddingTop: adaptToWidth(8),
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    archiveButton: {
      width: adaptToWidth(220),
      alignItems: "center",
      marginTop: adaptToWidth(20),
      paddingTop: adaptToWidth(8),
      backgroundColor: "#F1A100",
      borderRadius: adaptToWidth(8),
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
    },
    textButton: {
      color: "black",
      height: adaptToWidth(24),
      fontWeight: "600",
      fontSize: normalizeText(15),
    },
    openedCat: {
      fontSize: normalizeText(17),
      fontWeight: "bold",
      marginBottom: adaptToWidth(20),
    },
    addArticleInput: {
      marginBottom: adaptToWidth(10),
    },

    articlesCard: {
      width: adaptToWidth(333),
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: adaptToWidth(5),
    },
    articlesInput: {
      height: adaptToWidth(30),
      width: adaptToWidth(250),
      borderWidth: adaptToWidth(1),
      borderRadius: adaptToWidth(5),
      borderColor: "#002654",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: adaptToWidth(10),
      marginHorizontal: adaptToWidth(15),
    },
    addArticle: {
      margin: adaptToWidth(20),
      alignItems: "center",
    },
    nameText: {
      fontSize: normalizeText(15),
    },
  });
};
