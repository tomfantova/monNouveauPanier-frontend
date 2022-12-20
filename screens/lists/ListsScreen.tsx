import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { emptyLists } from "../../reducers/user";
import {
  addExecutedList,
  removeExecutedList,
} from "../../reducers/executedList";
import { addCurrentList, UserState } from "../../reducers/currentList";
import { modifyFalse } from "../../reducers/modifyList";

export default function ListsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const [newListName, setNewListName] = useState("");
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const executedList = useSelector(
    (state: { executedList: UserState }) => state.executedList.value
  );
  const modifyList = useSelector(
    (state: { modifyList: UserState }) => state.modifyList.value
  );

  // A enlever : supprimer toutes les listes des reducers pour test //

  // dispatch(emptyLists());
  // dispatch(removeExecutedList());

  // Ajouter une nouvelle liste au reducer currentList //

  const handleNewList = () => {
    if (newListName) {
      const date = new Date();
      const listData = {
        id: Date.now(),
        name: newListName,
        date: date.toLocaleDateString("fr"),
        active: true,
        categories: [
          {
            name: "Fruits et légumes",
            image: "legumes.png",
            items: [],
          },
          {
            name: "Viandes",
            image: "viandes.jpg",
            items: [],
          },
          {
            name: "Poissons",
            image: "poissons.png",
            items: [],
          },
          {
            name: "Epicerie",
            image: "epicerie.jpeg",
            items: [],
          },
          {
            name: "Desserts",
            image: "desserts.png",
            items: [],
          },
        ],
      };
      dispatch(addCurrentList(listData));
      navigation.navigate("Sections");
      setNewListName("");
    }
  };

  // Afficher les listes en cours et archivées depuis le reducer user//

  let actives: JSX.Element[] | JSX.Element = [];
  if (!user.lists.length || user.lists.every((e) => !e.active)) {
    actives = (
      <View>
        <Text style={styles.noList}>Vous n'avez pas encore de listes</Text>
      </View>
    );
  } else {
    actives = user.lists
      .filter((e) => e.active)
      .map((listsData, i) => {
        return (
          <View key={i} style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => handleStart(listsData)}
            >
              <Text style={styles.textButton}>{listsData.name}</Text>
              <Text style={styles.textDate}>Créée le {listsData.date}</Text>
            </TouchableOpacity>
          </View>
        );
      })
      .reverse();
  }

  let inactives: JSX.Element[] | JSX.Element = [];
  if (!user.lists.length || user.lists.every((e) => e.active)) {
    inactives = (
      <View>
        <Text style={styles.noList}>Vous n'avez pas archivé de listes</Text>
      </View>
    );
  } else {
    inactives = user.lists
      .filter((e) => !e.active)
      .map((listsData, i) => {
        return (
          <View key={i} style={styles.card}>
            <TouchableOpacity
              onPress={() => handleConsult(listsData)}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>{listsData.name}</Text>
              <Text style={styles.textDate}>Archivée le {listsData.date}</Text>
            </TouchableOpacity>
          </View>
        );
      })
      .reverse();
  }

  // Lancer l'exécution d'une liste //

  const handleStart = (list) => {
    if (executedList === null || executedList.id !== list.id || modifyList) {
      dispatch(removeExecutedList());
      dispatch(addExecutedList(list));
      dispatch(modifyFalse());
    }
    navigation.navigate("Executed");
  };

  // Affichage d'une liste archivée

  const handleConsult = (list) => {
    if (executedList === null || executedList.id !== list.id) {
      dispatch(removeExecutedList());
      dispatch(addExecutedList(list));
    }
    navigation.navigate("Archive");
  };

  // Return du screen //

  return (
    <View style={styles.backgroundView}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <Text style={styles.regularText}>
            Créez, modifiez ou réutilisez vos listes
          </Text>
          <View style={styles.addList}>
            <TextInput
              style={styles.input}
              placeholder="Nommez votre liste et Go !"
              placeholderTextColor="#999999"
              onChangeText={(value) => setNewListName(value)}
              value={newListName}
            />
            <TouchableOpacity onPress={() => handleNewList()}>
              <FontAwesome name="arrow-right" size={30} color="#002654" />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.listsTitle}>
              <Text style={styles.listsText}>Listes en cours</Text>
            </View>
            <View style={styles.lists}>{actives}</View>
            <View style={styles.listsTitle}>
              <Text style={styles.listsText}>Listes archivées</Text>
            </View>
            <View style={styles.lists}>{inactives}</View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

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
      backgroundColor: "#f1f5f8",
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
      paddingHorizontal: adaptToWidth(20),
      paddingVertical: adaptToWidth(20),
    },
    addList: {
      marginVertical: adaptToWidth(20),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      backgroundColor: "#ffffff",
      fontSize: normalizeText(16),
      padding: adaptToWidth(20),
      marginRight: adaptToWidth(20),
      textAlign: "left",
      borderColor: "black",
      borderWidth: adaptToWidth(0.5),
      borderRadius: adaptToWidth(8),
    },
    listsTitle: {
      width: adaptToWidth(330),
      paddingBottom: adaptToWidth(5),
      borderBottomWidth: 2,
      borderBottomColor: "#002654",
    },
    listsText: {
      marginTop: adaptToWidth(5),
      alignSelf: "flex-start",
      fontSize: normalizeText(18),
    },
    lists: {
      marginTop: adaptToWidth(5),
      marginBottom: adaptToWidth(20),
      alignSelf: "flex-start",
    },
    card: {
      width: adaptToWidth(330),
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: adaptToWidth(300),
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
    textDate: {
      color: "#002654",
      fontSize: normalizeText(13),
      paddingBottom: adaptToWidth(5),
    },
    regularText: {
      fontSize: normalizeText(18),
    },
    noList: {
      marginVertical: adaptToWidth(20),
      fontSize: normalizeText(16),
    },
  });
};
