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
import { useDispatch } from "react-redux";
import { addCurrentList } from "../../reducers/currentList";

export default function ListsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const [newListName, setNewListName] = useState("");

  // Ajouter une nouvelle liste au reducer //

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
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <Text>Créez, modifiez ou réutilisez vos listes</Text>
            <View style={styles.addList}>
              <TextInput
                style={styles.input}
                placeholder="Nommez votre liste et Go !"
                onChangeText={(value) => setNewListName(value)}
                value={newListName}
              />
              <TouchableOpacity onPress={() => handleNewList()}>
                <FontAwesome name="arrow-right" size={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.listsText}>Listes en cours</Text>
            <View style={styles.lists}>
              <Text>Listes en cours ici</Text>
            </View>
            <Text style={styles.listsText}>Listes archivées</Text>
            <View style={styles.lists}>
              <Text>Listes archivées ici</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}

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
      height: "100%",
      width: "100%",
      paddingHorizontal: adaptToWidth(20),
      paddingVertical: adaptToWidth(20),
    },
    addList: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      backgroundColor: "#ffffff",
      padding: adaptToWidth(20),
      marginRight: adaptToWidth(20),
      marginTop: adaptToWidth(20),
      borderRadius: adaptToWidth(10),
    },
    listsText: {
      marginTop: adaptToWidth(50),
      alignSelf: "flex-start",
    },
    lists: {
      marginTop: adaptToWidth(5),
      paddingTop: adaptToWidth(20),
      borderTopWidth: 2,
      borderTopColor: "black",
      alignSelf: "flex-start",
    },
  });
};
