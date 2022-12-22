import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import { Heading, Button, Text } from "native-base";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserState } from "../../reducers/user";
import { useEffect } from "react";


export default function WelcomeScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);

  const user = useSelector((state: { user: UserState }) => state.user.value);

  useEffect(() => {

    if (user.token !== null && user.token !== '' && user.token !== undefined) {
        navigation.navigate('TabNavigator')
    }
    
  }, [])

  return (
    //    <KeyboardAwareScrollView>
    <View style={styles.backgroundView}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.backgroundImageView}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require("../../assets/connection/backgroundPanier2.png")}
          >
            <Heading style={styles.title}>Mon</Heading>
            <Heading style={styles.title}>Nouveau</Heading>
            <Heading style={styles.title}>Panier</Heading>
          </ImageBackground>
        </View>
        <View style={styles.globalViewContainer}>
          <View style={styles.connexion}>
            <Heading style={[styles.centerText, styles.space2]}>
              Bienvenue !
            </Heading>
            <Text style={[styles.description]}>
              Préparez vos courses tout en vous
            </Text>
            <Text style={[styles.description]}>informant sur vos produits</Text>
            <Text> </Text>
            <Button
              style={styles.buttonLarge}
              onPress={() => navigation.navigate("Inscription")}
            >
              <Text style={[styles.centerText, styles.whiteText]}>
                COMMENCEZ
              </Text>
              <Text style={[styles.centerText, styles.whiteText]}>
                VOTRE EXPERIENCE
              </Text>
            </Button>
            <Text style={[styles.centerText, styles.space]}>
              {" "}
              Déjà inscrit ?
            </Text>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate("Connexion")}
            >
              CONNECTEZ-VOUS
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
    //    </KeyboardAwareScrollView>
  );
}

const makeStyles = (height, width, fontScale) => {
  const adaptToHeight = (size) => {
    return (height * size) / 844;
  };

  const adaptToWidth = (size) => {
    return (width * size) / 844;
  };

  const normalizeText = (size) => {
    return (width * size) / 390 / fontScale;
  };

  return StyleSheet.create({
    backgroundView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
      backgroundColor: "white",
    },
    safeAreaViewContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      minWidth: "100%",
    },
    globalViewContainer: {
      alignItems: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: normalizeText(20),
      paddingVertical: normalizeText(20),
    },
    title: {
        paddingTop: adaptToHeight(10),
      fontSize: normalizeText(40),
      height: adaptToHeight(45),
      textAlign: "center",
    },

    backgroundImageView: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
    },

    backgroundImage: {
      height: adaptToHeight(700 * 0.7),
      width: adaptToHeight(623 * 0.7),
      padding: adaptToHeight(50),
    },
    connexion: {
      justifyContent: "center",
      paddingTop: adaptToHeight(0),
      paddingLeft: adaptToHeight(0),
      alignItems: "center",
      position: "absolute",
      bottom: adaptToHeight(60),
    },
    description: {
      fontWeight: "200",
      fontSize: normalizeText(20),
      lineHeight: 20,
      textAlign: "center",
    },
    buttonLarge: {
      backgroundColor: "#EEA734",
      height: adaptToHeight(80),
      width: adaptToHeight(335),
      justifyContent: "center",
      textAlign: "center",
    },
    button: {
      backgroundColor: "#EEA734",
      height: adaptToHeight(48),
      width: adaptToHeight(335),
      justifyContent: "center",
      textAlign: "center",
    },
    space: {
      marginVertical: adaptToHeight(5),
    },
    space2: {
      marginVertical: adaptToHeight(10),
    },
    space3: {
      marginVertical: adaptToHeight(20),
    },
    centerText: {
      textAlign: "center",
    },
    whiteText: {
      color: "white",
      fontSize: normalizeText(15),
    },
  });
};
