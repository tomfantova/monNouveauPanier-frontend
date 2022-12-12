import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentList, UserState } from "../reducers/user";

export default function SectionsScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const currentList = useSelector(
    (state: { user: UserState }) => state.user.value.currentList
  );

  console.log(currentList);

  // Retour arrière et effacer la liste en cours de création //

  const handleQuit = () => {
    dispatch(removeCurrentList());
    navigation.navigate("Lists");
  };

  return (
    <View style={styles.backgroundView}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.globalViewContainer}>
          <View style={styles.header}>
            <FontAwesome
              name="chevron-left"
              size={30}
              color="#000000"
              onPress={() => handleQuit()}
            />
            <Text style={styles.title}>
              {currentList.name} {currentList.date}
            </Text>
          </View>
          <Text>Préparez votre liste par rayon</Text>
          <KeyboardAwareScrollView>
            <Text>SectionsScreen</Text>
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
      justifyContent: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: normalize(20),
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
      width: normalize(290),
      marginLeft: normalize(50),
      fontSize: 25,
    },
  });
};
