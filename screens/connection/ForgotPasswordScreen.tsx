import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Connexion = ({ navigation }) => {
  return (
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
          Mot de passe oublié ?
        </Heading>
        <Heading
          mt="5"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Veuillez saisir l’adresse e-mail associée à votre compte. Cliquez le
          lien qui vous est adressé et choisissez un nouveau mot de passe.
        </Heading>

    <VStack space={3} mt="12">
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input />
      </FormControl>
      <Button mt="2" colorScheme="yellow">
        REINITIALISER MOT DE PASSE
      </Button>
      <View>
        <Image source={require("../../assets/connection/forgotPassword.jpg")} />
      </View>
    </VStack>
  </Box>
</Center>
  );
};

export default function ConnexionScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <Connexion navigation={navigation} />
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