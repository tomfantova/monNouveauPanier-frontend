import * as React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Heading, VStack, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Image,
  ListItem,
  ListItemProps,
  Switch,
  lightColors,
} from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { addUserPreference } from "../../reducers/signUpProcess";

// Start ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem

// End ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem

export default function PreferenceScreen({ navigation }) {
  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);
  const dispatch = useDispatch();

  const [preferenceInfos, setPreferenceInfos] = useState({
    type: 0,
  });

  const [nutrition, setNutrition] = useState(false);
  const [ecologie, setEcologie] = useState(false);
  const [terroir, setTerroir] = useState(false);

  const ecologieSwitch = () => {
    setEcologie((previousState) => !previousState);
    setNutrition(false);
    setTerroir(false);
    setPreferenceInfos({type: 1})
  };

  const nutritionSwitch = () => {
    setNutrition((previousState) => !previousState);
    setEcologie(false);
    setTerroir(false);
    setPreferenceInfos({type: 2})
  };

  const terroirSwitch = () => {
    setTerroir((previousState) => !previousState);
    setNutrition(false);
    setEcologie(false);
    setPreferenceInfos({type: 3})
  };

  const handleSubmit = () => {
    dispatch(addUserPreference(preferenceInfos));

navigation.navigate("Type");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <View style={styles.listpreferenceprofil}>
              <VStack space={1} alignItems="center">
                <Heading
                  mt="0"
                  size="lg"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Quel consommateur
                </Heading>
                <Heading
                  marginBottom="1"
                  size="lg"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  êtes-vous ?
                </Heading>
                <Image
                  style={styles.image}
                  source={require("../../assets/connection/imagePreferenceProfil.png")}
                />
              </VStack>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>ECOLOGIE</ListItem.Title>
                  <ListItem.Subtitle>Changer pour l'environnement</ListItem.Subtitle>
                </ListItem.Content>
                <Switch
                  trackColor={{ false: "#767577", true: "#EEA734" }}
                  value={ecologie}
                  onValueChange={ecologieSwitch}
                />
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>NUTRITION</ListItem.Title>
                  <ListItem.Subtitle>Améliorer son alimentation</ListItem.Subtitle>
                </ListItem.Content>
                <Switch
                  trackColor={{ false: "#767577", true: "#EEA734" }}
                  //        thumbColor={switch1 ? "#f5dd4b" : "#f4f3f4"} list item from React Native Elements https://reactnative.dev/docs/switch.html#props
                  //          ios_backgroundColor="#3e3e3e"
                  value={nutrition}
                  onValueChange={nutritionSwitch}
                />
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>TERROIR</ListItem.Title>
                  <ListItem.Subtitle>Valoriser le patrimoine local</ListItem.Subtitle>
                </ListItem.Content>
                <Switch
                  trackColor={{ false: "#767577", true: "#EEA734" }}
                  value={terroir}
                  onValueChange={terroirSwitch}
                />
              </ListItem>
              <Button
                mt="5"
                marginBottom="25"
                colorScheme="yellow"
                onPress={() => handleSubmit()}
              >
                VALIDER
              </Button>
            </View>
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
    // start button style from Native Base
    button: {
      backgroundColor: "#EEA734",
      height: adaptToHeight(48),
      width: adaptToHeight(335),
      justifyContent: "center",
      textAlign: "center",
    },
    // end button style from Native Base
    listpreferenceprofil: {
      marginTop: 20,
      //    borderTopWidth: 1,
      borderColor: lightColors.greyOutline,
      minWidth: "100%",
      backgroundColor: lightColors.background,
    },
    image: {
      width: 175 * 0.8,
      height: 200 * 0.8,
      resizeMode: "stretch",
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
  });
};