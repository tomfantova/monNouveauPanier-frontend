import React from "react";
import { useState, useRef } from "react";
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
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCurrentList,
  addCategory,
  removeCategory,
  addArticles,
  UserState,
} from "../../reducers/currentList";
import { addList } from "../../reducers/user";

export default function SectionsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalArticlesVisible, setmodalArticlesVisible] = useState(false);
  const [modalQuitVisible, setModalQuitVisible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catOpened, setCatOpened] = useState("");
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: { currentList: UserState }) => state.currentList.value
  );

  // Ajouter un rayon dont ouverture et fermeture modale //

  const handleOpenModalCategory = () => {
    setModalCategoryVisible(true);
  };

  const handleCloseModalCategory = () => {
    setModalCategoryVisible(false);
    setNewCatName("");
  };

  const newCat = {
    name: newCatName,
    image: require("../../assets/lists/rayon.png"),
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
        refInputs.current.push(item);
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
    inputs.push(
      <View style={styles.articlesCard} key={i}>
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
        dispatch(
          addArticles({ categoryName: category, items: filteredArticles })
        );
      }
    }
    refInputs.current = [""];
    setNumInputs(1);
    handleCloseModalArticles();
  };

  // Afficher les rayons de la liste en cours de création //

  let viewSections = [];
  if (currentList) {
    viewSections = currentList.categories.map(
      (categoryData: any, i: number) => {
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
              <Image source={categoryData.image} style={styles.picture} />
            </TouchableOpacity>
          </View>
        );
      }
    );
  }

  // Retour arrière et effacer la liste en cours de création, dont modale //

  let listName = "";
  if (currentList) {
    listName = currentList.name;
  }

  const handleQuit = () => {
    navigation.navigate("TabNavigator", { screen: "Lists" });
    dispatch(removeCurrentList());
    setModalQuitVisible(false);
  };

  const handleWishQuit = () => {
    setModalQuitVisible(true);
  };

  // Valider la liste et envoi en BDD + envoi au reducer user + vider le reducer currentList //

  const handleSaveList = (currentList) => {
    fetch("http://10.2.1.246:3000/lists/add", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "testToken",
        list: currentList,
      }),
    }).then((response) => response.json());
    dispatch(addList(currentList));
    handleQuit();
  };

  // Return du screen //

  return (
    <View style={styles.backgroundView}>
      <Modal visible={modalCategoryVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.xModal}
              onPress={() => handleCloseModalCategory()}
              activeOpacity={0.8}
            >
              <FontAwesome name="close" color="#002654" size={20}></FontAwesome>
            </TouchableOpacity>
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
      <Modal visible={modalArticlesVisible} animationType="fade" transparent>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              onPress={() => handleCloseModalArticles()}
              activeOpacity={0.8}
            ></TouchableOpacity>
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
                <Text> Ajoutez un nouvel article</Text>
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

const makeStyles = (height, width, fontScale) => {
  const adaptToHeight = (size) => {
    return (height * size) / 844 / fontScale;
  };

  const normalize = (size) => {
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
      paddingHorizontal: normalize(5),
      paddingVertical: normalize(20),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: normalize(350),
      justifyContent: "flex-start",
      marginBottom: normalize(30),
    },
    title: {
      alignItems: "center",
      width: normalize(305),
    },
    titleText: {
      fontWeight: "bold",
      fontSize: normalize(17),
    },
    subtitle: {
      fontSize: normalize(18),
      fontWeight: "bold",
      marginBottom: normalize(10),
    },
    categoryText: {
      fontSize: normalize(15),
      fontWeight: "bold",
    },
    sections: {
      margin: normalize(10),
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    sectionContainer: {
      margin: normalize(7),
    },
    picture: {
      borderRadius: normalize(10),
      width: normalize(150),
      height: normalize(150),
    },
    head: {
      paddingBottom: normalize(5),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    add: {
      alignItems: "center",
      justifyContent: "center",
      margin: normalize(10),
      width: normalize(150),
      height: normalize(180),
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      fontSize: normalize(20),
      marginTop: normalize(20),
      flexDirection: "row",
      justifyContent: "flex-start",
      backgroundColor: "#ffffff",
      borderRadius: normalize(10),
    },
    modalView: {
      height: normalize(180),
      width: normalize(250),
      backgroundColor: "white",
      borderRadius: normalize(20),
      padding: normalize(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: normalize(10),
        height: normalize(10),
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    centeredView2: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: normalize(55),
    },
    modalView2: {
      height: normalize(730),
      width: normalize(380),
      backgroundColor: "white",
      borderRadius: normalize(20),
      padding: normalize(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: normalize(10),
        height: normalize(10),
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    centeredView3: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: normalize(55),
    },
    modalView3: {
      height: normalize(250),
      width: normalize(350),
      backgroundColor: "white",
      borderRadius: normalize(20),
      padding: normalize(20),
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: normalize(10),
        height: normalize(10),
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: normalize(150),
      alignItems: "center",
      marginTop: normalize(20),
      paddingTop: normalize(8),
      backgroundColor: "#F1A100",
      borderRadius: normalize(10),
    },
    textButton: {
      color: "black",
      height: normalize(24),
      fontWeight: "600",
      fontSize: normalize(15),
    },
    xModal: {
      width: normalize(220),
      alignItems: "flex-end",
    },
    openedCat: {
      fontSize: normalize(17),
      fontWeight: "bold",
      marginBottom: normalize(20),
    },
    addArticleInput: {
      marginBottom: normalize(10),
    },

    articlesCard: {
      width: normalize(330),
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: normalize(5),
    },
    articlesInput: {
      height: normalize(30),
      width: normalize(280),
      borderWidth: normalize(1),
      borderRadius: normalize(5),
      borderColor: "#002654",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: normalize(10),
    },
    addArticle: {
      margin: normalize(20),
      alignItems: "center",
    },
    warning: {
      fontSize: normalize(30),
      marginBottom: normalize(20),
    },
    advertisement: {
      fontSize: normalize(16),
      textAlign: "center",
    },
  });
};
