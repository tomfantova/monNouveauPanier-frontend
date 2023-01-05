import * as React from "react";
import { useState } from "react";
import { REACT_APP_BACKEND_URL } from "react-native-dotenv";
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
  HStack,
  Center,
  useToast,
} from "native-base";
import { useDispatch } from "react-redux";
import { connectUser } from "../../reducers/user";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ConnexionScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const toast = useToast();
  const dispatch = useDispatch();
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
  });

  const handleConnect = () => {
    fetch(`${REACT_APP_BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfos),
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);
        if (userData.result === true) {
          dispatch(connectUser(userData.user));
          navigation.navigate("TabNavigator");
        } else {
          toast.show({
            description:
              "Veuillez remplir tous les champs ou vérifier vos identifiants",
          });
        }
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <Center w="100%">
              <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                  size="lg"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Mon Nouveau Panier
                </Heading>
                <Heading
                  mt="12"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  color="coolGray.600"
                  fontWeight="medium"
                  size="xs"
                >
                  Entrez votre Email et votre mot de passe.
                </Heading>

                <VStack space={3} mt="12">
                  <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      autoCapitalize="none"
                      value={userInfos.email}
                      onChangeText={(text) =>
                        setUserInfos({ ...userInfos, email: text })
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Mot de Passe</FormControl.Label>
                    <Input
                      autoCapitalize="none"
                      type="password"
                      value={userInfos.password}
                      onChangeText={(text) =>
                        setUserInfos({ ...userInfos, password: text })
                      }
                    />
                  </FormControl>
                  <Text
                    underline
                    color="#EEA734"
                    onPress={() => navigation.navigate("Profile")}
                  >
                    Mot de passe oublié ?
                  </Text>
                  <Button
                    mt="2"
                    colorScheme="yellow"
                    onPress={() => handleConnect()}
                  >
                    CONNEXION
                  </Button>
                  <HStack mt="6" justifyContent="center">
                    <Text
                      fontSize="sm"
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      Pas encore de compte ?{" "}
                    </Text>
                    <Text
                      marginBottom="50"
                      underline
                      color="#EEA734"
                      onPress={() => navigation.navigate("Inscription")}
                    >
                      Créer un compte
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Center>
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
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      paddingHorizontal: normalize(20),
      paddingVertical: normalize(20),
    },
    button: {
      backgroundColor: "#EEA734",
      height: adaptToHeight(48),
      width: adaptToHeight(335),
      justifyContent: "center",
      textAlign: "center",
    },
  });
};
