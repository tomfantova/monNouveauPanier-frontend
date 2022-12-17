import React from "react";
import { useState } from "react";
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

export default function SectionsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catOpened, setCatOpened] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: { currentList: UserState }) => state.currentList.value
  );

  // Ajouter un rayon dont ouverture et fermeture modale //

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewCatName("");
  };

  const newCat = {
    name: newCatName,
    image: "../../assets/lists/rayon.png",
    items: [],
  };

  const handleAddCat = () => {
    dispatch(addCategory(newCat));
    handleCloseModal();
  };

  // Supprimer un rayon //

  const handleDelete = (catName) => {
    dispatch(removeCategory(catName));
  };

  // Modification des articles d'un rayon dont ouverture et fermeture modale //

  const handleOpenModal2 = (category) => {
    setCatOpened(category);
    setModal2Visible(true);
  };

  const handleCloseModal2 = () => {
    setModal2Visible(false);
  };

  const handleAddArticles = (category) => {
    console.log(category);
    for (let item of currentList.categories) {
      if (category === item.name) {
        dispatch(addArticles({ categoryName: category, items: newArticle }));
      }
      setNewArticle("");
      handleCloseModal2();
    }
  };

  const articlesList = (
    <View style={styles.articlesCard}>
      <View style={styles.articlesInput}>
        <TextInput
          placeholder="Nommez votre article"
          onChangeText={(value) => setNewArticle(value)}
          value={newArticle}
        />
      </View>
      <TouchableOpacity>
        <FontAwesome name="trash" size={25} />
      </TouchableOpacity>
    </View>
  );

  console.log(currentList.categories[2].items);

  // Afficher les rayons de la liste en cours de création //

  let viewSections = [];
  if (currentList) {
    viewSections = currentList.categories.map(
      (categoryData: any, i: number) => {
        return (
          <View key={i} style={styles.sectionContainer}>
            <View style={styles.head}>
              <Text>{categoryData.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(categoryData.name);
                }}
              >
                <FontAwesome name="minus-circle" size={20} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleOpenModal2(categoryData.name);
              }}
            >
              <Image
                source={require("../../assets/lists/rayon.png")}
                style={styles.picture}
              />
            </TouchableOpacity>
          </View>
        );
      }
    );
  }

  // Retour arrière et effacer la liste en cours de création //

  let listName = "";
  if (currentList) {
    listName = currentList.name;
  }

  const handleQuit = () => {
    navigation.navigate("TabNavigator", { screen: "Lists" });
    dispatch(removeCurrentList());
  };

  // Return du screen //

  return (
    <View style={styles.backgroundView}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => handleCloseModal()}
              activeOpacity={0.8}
            >
              <FontAwesome
                style={styles.xModal}
                name="close"
                size={20}
              ></FontAwesome>
            </TouchableOpacity>
            <TextInput
              placeholder="Nommez votre rayon"
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
      <Modal visible={modal2Visible} animationType="fade" transparent>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              onPress={() => handleCloseModal2()}
              activeOpacity={0.8}
            >
              <FontAwesome
                style={styles.xModal}
                name="close"
                size={20}
              ></FontAwesome>
            </TouchableOpacity>
            <Text style={styles.openedCat}>{catOpened}</Text>
            {articlesList}
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
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.header}>
            <FontAwesome
              name="chevron-left"
              size={30}
              onPress={() => handleQuit()}
            />
            <Text style={styles.title}>{listName}</Text>
          </View>
          <Text>Préparez votre liste par rayon</Text>
          <KeyboardAwareScrollView contentContainerStyle={styles.sections}>
            {viewSections}
            <View style={styles.add}>
              <FontAwesome
                name="plus-circle"
                size={90}
                onPress={() => {
                  handleOpenModal();
                }}
              ></FontAwesome>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Style du screen //

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeight = (size: number) => {
    return ((height * size) / 844) / fontScale
  }

  const adaptToWidth = (size: number) => {
    return ((width * size) / 390)
  }

  const normalizeText = (size: number) => {
    return ((width * size) / 390) / fontScale
  }

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
      width: adaptToWidth(290),
      marginLeft: adaptToWidth(50),
      fontSize: normalizeText(25),
    },
    sections: {
      margin: adaptToWidth(10),
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    sectionContainer: {
      margin: adaptToWidth(10),
    },
    picture: {
      width: adaptToWidth(150),
      height: adaptToWidth(150),
    },
    head: {
      paddingVertical: adaptToWidth(5),
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
    modalView: {
      backgroundColor: "white",
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
      height: adaptToWidth(660),
      width: adaptToWidth(380),
      backgroundColor: "white",
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
      borderRadius: adaptToWidth(10),
    },
    textButton: {
      color: "black",
      height: adaptToWidth(24),
      fontWeight: "600",
      fontSize: normalizeText(15),
    },
    xModal: {
      marginBottom: adaptToWidth(15),
    },
    openedCat: {
      marginBottom: adaptToWidth(20),
    },
    articlesCard: {
      width: adaptToWidth(330),
      flexDirection: "row",
      justifyContent: "space-around",
    },
    articlesInput: {
      height: adaptToWidth(30),
      width: adaptToWidth(280),
      borderWidth: adaptToWidth(1),
      borderRadius: adaptToWidth(5),
      borderColor: "black",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: adaptToWidth(10),
    },
  });
};
