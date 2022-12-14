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
import { addCurrentList, UserState } from "../../reducers/currentList";

export default function ListsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const [newListName, setNewListName] = useState("");
  const user = useSelector((state: { user: UserState }) => state.user.value);

  // A enlever : supprimer toutes les listes pour test //

  const handleEmptyLists = () => {
    dispatch(emptyLists());
  };

  // Ajouter une nouvelle liste au reducer currentList //

  const handleNewList = () => {
    const date = new Date();
    const listData = {
      name: newListName,
      date: date.toLocaleDateString("fr"),
      active: true,
      categories: [
        {
          name: "Fruits et légumes",
          image: "../assets/lists/rayon.png",
          items: [],
        },
        { name: "Viandes", image: "../assets/lists/rayon.png", items: [] },
        { name: "Poissons", image: "../assets/lists/rayon.png", items: [] },
        { name: "Epicerie", image: "../assets/lists/rayon.png", items: [] },
        { name: "Desserts", image: "../assets/lists/rayon.png", items: [] },
      ],
    };
    dispatch(addCurrentList(listData));
    navigation.navigate("Sections");
    setNewListName("");
  };

  // Afficher les listes en cours et archivées depuis le reducer user//

  const actives = user.lists.map((listsData, i) => {
    if (listsData.active)
      return (
        <View key={i} style={styles.card}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>
              {listsData.name} le {listsData.date}
            </Text>
          </TouchableOpacity>
        </View>
      );
  });

  const inactives = user.lists.map((listsData, i) => {
    if (!listsData.active)
      return (
        <View key={i} style={styles.card}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>
              {listsData.name} le {listsData.date}
            </Text>
          </TouchableOpacity>
        </View>
      );
  });

  // Listes archivées //

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
      height: "100%",
      width: "100%",
      paddingHorizontal: normalize(20),
      paddingVertical: normalize(20),
    },
    addList: {
      marginVertical: normalize(20),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      backgroundColor: "#ffffff",
      padding: normalize(20),
      marginRight: normalize(20),
      borderRadius: normalize(10),
    },
    listsTitle: {
      width: normalize(330),
      paddingBottom: normalize(5),
      borderBottomWidth: 2,
      borderBottomColor: "#002654",
    },
    listsText: {
      marginTop: normalize(50),
      alignSelf: "flex-start",
      fontSize: normalize(18),
    },
    lists: {
      marginTop: normalize(5),
      paddingTop: normalize(20),
      alignSelf: "flex-start",
    },
    card: {
      width: normalize(330),
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: normalize(300),
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
    regularText: {
      fontSize: normalize(18),
    },
  });
};
