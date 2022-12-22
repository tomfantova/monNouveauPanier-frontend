import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { addUserInfos, reset, UserState } from "../../reducers/signUpProcess";

export default function InscriptionScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();
  const toast = useToast();

  const Inscription = ({ navigation }) => {
    const [userInfos, setUserInfos] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

const handleSubmit = () => {
  if (
    !userInfos.firstname ||
    !userInfos.lastname ||
    !userInfos.email ||
    !userInfos.password
  ) {
    toast.show({ description: "Veuillez remplir tous les champs." });
  } else {
    dispatch(addUserInfos(userInfos));

    navigation.navigate("Preference");
  }
};

return (
  <Center w="100%">
    <Box safeArea p="2" w="90%" maxW="290" py="0">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
        fontWeight="semibold"
      >
        Mon Nouveau Panier
      </Heading>
      <Heading
        mt="2"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        Créer manuellement votre compte via le formulaire ci-dessous ou
        directement depuis votre réseau social!
      </Heading>
      <VStack space={3} mt="2">
        <Text
          underline
          color="#EEA734"
          onPress={() => navigation.navigate("Connexion")}
        >
          Vous avez déjà un compte ?
        </Text>
        <FormControl>
          <FormControl.Label>Nom</FormControl.Label>
          <Input
            value={userInfos.firstname}
            onChangeText={(text) =>
              setUserInfos({ ...userInfos, firstname: text })
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Prénom</FormControl.Label>
          <Input
            value={userInfos.lastname}
            onChangeText={(text) =>
              setUserInfos({ ...userInfos, lastname: text })
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={userInfos.email}
            onChangeText={(text) =>
              setUserInfos({ ...userInfos, email: text })
            }
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Mot de passe</FormControl.Label>
          <Input
            type="password"
            value={userInfos.password}
            onChangeText={(text) =>
              setUserInfos({ ...userInfos, password: text })
            }
          />
        </FormControl>

        <Button mt="2" colorScheme="yellow" onPress={() => handleSubmit()}>
          S'INSCRIRE
        </Button>
      </VStack>
      <Heading
        mt="3"
        color="coolGray.600"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        En vous inscrivant, vous acceptez les conditions générales
        d'utilisation.
      </Heading>
    </Box>
  </Center>
);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <Inscription navigation={navigation} />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
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
      paddingHorizontal: normalize(20),
      paddingVertical: normalize(20),
    },
    title: {
      fontSize: adaptToHeight(40),
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
  fontSize: adaptToHeight(20),
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
},
  });
};