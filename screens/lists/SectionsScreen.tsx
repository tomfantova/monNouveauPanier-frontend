import React from "react";
import { useState, useRef } from "react";
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
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentList,
  addCategory,
  removeCategory,
  addArticles,
  CurrentListState,
} from "../../reducers/currentList";
import user, { addList, deleteList, UserState } from "../../reducers/user";
import { modifyFalse } from "../../reducers/modifyList";
import { AllGuidesState } from "../../reducers/allGuides";

export default function SectionsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalArticlesVisible, setmodalArticlesVisible] = useState(false);
  const [modalGuideVisible, setmodalGuideVisible] = useState(false);
  const [modalQuitVisible, setModalQuitVisible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catOpened, setCatOpened] = useState("");
  const [guideOpened, setGuideOpened] = useState("");
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: { currentList: CurrentListState }) => state.currentList.value
  );
  const guides = useSelector(
    (state: { allGuides: AllGuidesState }) => state.allGuides.value
  );

  const user = useSelector((state: { user: UserState }) => state.user.value);

  // Ajouter un rayon dont ouverture et fermeture modale //

  const handleOpenModalCategory = () => {
    setModalCategoryVisible(true);
  };

  const handleCloseModalCategory = () => {
    setModalCategoryVisible(false);
    setNewCatName("");
  };

  let image: any = "";
  const removeAccents = newCatName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const vege = /legume/i;
  const fruit = /fruit/i;
  const meat = /viande/i;
  const fish = /poisson/i;
  const grocery = /epice/i;
  const desert = /dessert/i;

  if (vege.test(removeAccents)) {
    image = "legumes.png";
  } else if (fruit.test(removeAccents)) {
    image = "legumes.png";
  } else if (meat.test(removeAccents)) {
    image = "viandes.jpg";
  } else if (fish.test(removeAccents)) {
    image = "poissons.png";
  } else if (grocery.test(removeAccents)) {
    image = "epicerie.jpeg";
  } else if (desert.test(removeAccents)) {
    image = "desserts.png";
  } else {
    image = "rayon.png";
  }

  const newCat = {
    name: newCatName,
    image: image,
    items: [],
  };

  const handleAddCat = () => {
    if (newCatName) {
      dispatch(addCategory(newCat));
      handleCloseModalCategory();
    }
  };

  // Supprimer un rayon //

  const handleDelete = (catName) => {
    dispatch(removeCategory(catName));
  };

  // Modification des articles d'un rayon dont ouverture et fermeture modale //

  // Gestion de la modale //

  const handleOpenmodalArticles = (category, items) => {
    if (items.length) {
      setNumInputs(items.length);
      for (let item of items) {
        refInputs.current.push(item.name);
      }
      refInputs.current.shift();
    }
    setCatOpened(category);
    setmodalArticlesVisible(true);
  };

  const handleCloseModalArticles = () => {
    setmodalArticlesVisible(false);
    refInputs.current = [""];
    setNumInputs(1);
  };

  // Gestion des inputs articles //

  const [textValue, setTextValue] = useState("");
  const [numInputs, setNumInputs] = useState(1);
  const refInputs = useRef<string[]>([textValue]);
  const setInputValue = (index: number, value: string) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  };
  const addInput = () => {
    refInputs.current.push("");
    setNumInputs((value) => value + 1);
  };
  const removeInput = (i: number) => {
    refInputs.current.splice(i, 1)[0];
    setNumInputs((value) => value - 1);
  };

  const inputs: JSX.Element[] = [];
  for (let i = 0; i < numInputs; i++) {
    //
    // Regex pour voir si l'article correspond à un guide //
    //
    let articleToTest = refInputs.current[i];
    let iColor = "#c8c8c8";
    let guide = "";
    guides.map((guidesData, i) => {
      let regexString = guidesData.title;
      let regex = new RegExp(regexString, "gi");
      if (regex.test(articleToTest)) {
        iColor = "#002654";
        guide = guidesData;
      }
    });
    //
    // // Finalement, affichage des articles //
    //
    inputs.push(
      <View style={styles.articlesCard} key={i}>
        <View style={styles.info}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOpenGuide(guide)}
          >
            <FontAwesome name="info-circle" size={25} color={iColor} />
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={(value) => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="Article"
          placeholderTextColor="#999999"
          style={styles.articlesInput}
        />
        {/* Supprimer l'input */}
        <TouchableOpacity onPress={() => removeInput(i)}>
          <FontAwesome name="trash" size={25} color="#002654" />
        </TouchableOpacity>
      </View>
    );
  }

  // Ajout des articles au reducer //

  const handleAddArticles = (category) => {
    const filteredArticles = refInputs.current.filter((x) => x.length > 0);
    for (let item of currentList.categories) {
      if (category === item.name) {
        let articles = [];
        for (let article of filteredArticles) {
          articles.push({ name: article, active: true });
        }
        dispatch(addArticles({ categoryName: category, items: articles }));
      }
    }
    refInputs.current = [""];
    setNumInputs(1);
    handleCloseModalArticles();
  };

  // // Si existant, affichage avec le "i" du guide correspondant dans une modale //

  // // // Ouverture modale //

  let currentArticle = {
    title: "",
    date: "",
    tags: [""],
    images: { main: "" },
    resume: { subtitles: [""], paragraphs: [""] },
    main: { subtitles: [""], paragraphs: [""] },
  };
  if (guideOpened) {
    currentArticle = guides.filter((e) => e._id.toString() === guideOpened)[0];
  }

  const handleOpenGuide = (guide) => {
    if (guide) {
      setGuideOpened(guide._id);
      setmodalGuideVisible(true);
      setmodalArticlesVisible(false);
    }
  };

  // // // Contenu du résumé //

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
          <Text style={styles.titleText}>
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

  // // // Contenu du guide //

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

  // // // Gestion des images du guide (require ne prend que les Strings en dur) //

  let illustration = {};
  if (currentArticle) {
    const honey = require("../../assets/guides/news-honey.jpg");
    switch (currentArticle.images.main) {
      case "honey":
        illustration = honey;
        break;
    }
  }
  // / // Affichage des tags du guide //

  let tags = [];
  if (currentArticle) {
    tags = currentArticle.tags.map((tagsData, i) => {
      return (
        <View key={i} style={styles.tags}>
          <Text style={styles.textTags}>#{tagsData}</Text>
        </View>
      );
    });
  }

  // // // Fermeture modale //

  const handleCloseGuide = () => {
    setmodalArticlesVisible(true);
    setmodalGuideVisible(false);
  };

  // Afficher les rayons de la liste en cours de création //

  let viewSections = [];
  if (currentList) {
    viewSections = currentList.categories.map((categoryData, i) => {
      //
      // // Gestion des images (require ne prend que les Strings en dur)

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
      // // Return du map
      return (
        <View key={i} style={styles.sectionContainer}>
          <View style={styles.head}>
            <Text style={styles.categoryText}>{categoryData.name}</Text>
            <TouchableOpacity
              onPress={() => {
                handleDelete(categoryData.name);
              }}
            >
              <FontAwesome name="minus-circle" color="#002654" size={20} />
            </TouchableOpacity>
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
    });
  }

  // Retour arrière et effacer la liste en cours de création, dont modale //

  let listName = "";
  if (currentList) {
    listName = currentList.name;
  }

  const handleQuit = () => {
    navigation.navigate("ListsView");
    dispatch(removeCurrentList());
    dispatch(modifyFalse());
    setModalQuitVisible(false);
  };

  const handleWishQuit = () => {
    setModalQuitVisible(true);
  };

  // Valider la liste et envoi en BDD + envoi au reducer user + vider le reducer currentList //

  const handleSaveList = (currentList) => {
    fetch(`${REACT_APP_BACKEND_URL}/lists/delete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listId: currentList.id,
        token: user.token,
      }),
    }).then((response) => response.json());
    dispatch(deleteList(currentList.id));
    fetch(`${REACT_APP_BACKEND_URL}/lists/add`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        list: currentList,
      }),
    }).then((response) => response.json());
    dispatch(addList(currentList));
    navigation.navigate("ListsView");
    dispatch(removeCurrentList());
    setModalQuitVisible(false);
  };

  // Return du screen //

  return (
    <View style={styles.backgroundView}>
      <Modal visible={modalCategoryVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.addHeader}>
              <Text style={styles.addCatText}>Nouveau rayon</Text>
              <TouchableOpacity
                onPress={() => handleCloseModalCategory()}
                activeOpacity={0.8}
              >
                <FontAwesome
                  name="close"
                  color="#002654"
                  size={20}
                ></FontAwesome>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nommez votre rayon"
              placeholderTextColor="#999999"
              onChangeText={(value) => setNewCatName(value)}
              value={newCatName}
            />
            <TouchableOpacity
              onPress={() => handleAddCat()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={modalArticlesVisible} transparent>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Text style={styles.openedCat}>{catOpened}</Text>
            <KeyboardAwareScrollView>
              {inputs}
              <TouchableOpacity style={styles.addArticle} onPress={addInput}>
                <FontAwesome
                  style={styles.addArticleInput}
                  name="plus-circle"
                  color="#002654"
                  size={20}
                ></FontAwesome>
                <Text style={styles.addText}> Ajoutez un nouvel article</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
            <TouchableOpacity
              onPress={() => handleAddArticles(catOpened)}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={modalQuitVisible} animationType="fade" transparent>
        <View style={styles.centeredView3}>
          <View style={styles.modalView3}>
            <Text style={styles.warning}>Attention !</Text>
            <Text style={styles.advertisement}>
              En quittant vous perdrez toutes les données de votre liste.
            </Text>
            <TouchableOpacity
              onPress={() => setModalQuitVisible(false)}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Rester ici</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleQuit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Quitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={modalGuideVisible} transparent>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <ScrollView
              style={styles.categoryScrollViewContainer}
              contentContainerStyle={styles.categoryScrollViewContent}
            >
              <View style={styles.titleCard}>
                <Image
                  source={illustration}
                  defaultSource={illustration}
                  style={styles.guidePicture}
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
              <View style={styles.contentCard}>{currentArticleContent()}</View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => handleCloseGuide()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => handleWishQuit()}>
              <FontAwesome name="chevron-left" color="#002654" size={30} />
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}>{listName}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Préparez votre liste par rayon</Text>
          <KeyboardAwareScrollView contentContainerStyle={styles.sections}>
            {viewSections}
            <View style={styles.add}>
              <FontAwesome
                name="plus-circle"
                color="#002654"
                size={90}
                onPress={() => {
                  handleOpenModalCategory();
                }}
              ></FontAwesome>
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity
            onPress={() => handleSaveList(currentList)}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Valider la liste</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Style du screen //

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeight = (size: number) => {
    return (height * size) / 844 / fontScale;
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
    add: {
      alignItems: "center",
      justifyContent: "center",
      margin: adaptToWidth(10),
      width: adaptToWidth(150),
      height: adaptToWidth(180),
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      marginTop: adaptToWidth(20),
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "flex-start",
      fontSize: normalizeText(15),
      textAlign: "left",
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
      padding: adaptToWidth(10),
    },
    modalView: {
      height: adaptToWidth(180),
      width: adaptToWidth(250),
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
    centeredView2: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: adaptToWidth(55),
    },
    modalView2: {
      marginBottom: adaptToWidth(40),
      height: adaptToWidth(640),
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
    centeredView3: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: adaptToWidth(55),
    },
    modalView3: {
      height: adaptToWidth(250),
      width: adaptToWidth(350),
      backgroundColor: "#f1f5f8",
      borderRadius: adaptToWidth(20),
      padding: adaptToWidth(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: adaptToWidth(10),
        height: adaptToWidth(10),
      },
      opacity: 0.95,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: adaptToWidth(150),
      alignItems: "center",
      marginTop: adaptToWidth(10),
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
      width: adaptToWidth(330),
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: adaptToWidth(5),
    },
    articlesInput: {
      backgroundColor: "white",
      height: adaptToWidth(30),
      width: adaptToWidth(250),
      borderWidth: adaptToWidth(1),
      borderRadius: adaptToWidth(5),
      borderColor: "#002654",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: adaptToWidth(10),
      marginHorizontal: adaptToWidth(15),
      fontSize: normalizeText(15),
    },
    addArticle: {
      margin: adaptToWidth(20),
      alignItems: "center",
    },
    warning: {
      fontSize: normalizeText(25),
      marginBottom: adaptToWidth(20),
    },
    advertisement: {
      fontSize: normalizeText(16),
      textAlign: "center",
    },
    addText: {
      fontSize: normalizeText(15),
    },
    info: {
      width: adaptToWidth(30),
      alignItems: "flex-end",
    },
    contentText: {
      fontSize: normalizeText(15),
      marginBottom: adaptToWidth(10),
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
    regularText: {
      fontSize: normalizeText(15),
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
    categoryScrollViewContainer: {
      paddingTop: adaptToWidth(10),
    },
    categoryScrollViewContent: {
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: adaptToWidth(10),
    },
    titleCard: {
      flexDirection: "row",
      marginBottom: adaptToWidth(16),
      width: "100%",
      borderRadius: adaptToWidth(8),
      backgroundColor: "white",
      padding: adaptToWidth(15),
    },
    categoryGuideTitle: {
      fontWeight: "600",
      fontSize: normalizeText(25),
    },
    allTags: {
      flexDirection: "row",
    },
    contentCard: {
      marginTop: adaptToWidth(16),
      marginBottom: adaptToWidth(16),
      width: "100%",
      borderRadius: adaptToWidth(8),
      backgroundColor: "white",
      padding: adaptToWidth(12),
    },
    guidePicture: {
      borderRadius: adaptToWidth(10),
      width: adaptToWidth(100),
      height: adaptToWidth(100),
      marginRight: adaptToWidth(10),
    },
    addHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: adaptToWidth(220),
    },
    addCatText: {
      marginLeft: adaptToWidth(20),
      fontSize: normalizeText(18),
      fontWeight: "bold",
    },
  });
};
