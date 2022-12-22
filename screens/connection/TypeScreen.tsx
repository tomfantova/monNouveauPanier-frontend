import * as React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { REACT_APP_BACKEND_URL } from "react-native-dotenv";

import { Heading, VStack, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ListItem, ListItemProps, lightColors } from "@rneui/themed";

//import Rating from "react-native-ratings";
import { Rating } from "react-native-ratings";
import signUpProcess, {
  addUserInfos,
  addUserPreference,
  addUserType,
  UserState,
  reset,
} from "../../reducers/signUpProcess";
import { connectUser } from '../../reducers/user'

// Start ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem
// Start Rating from "react-native-ratings" https://github.com/Monte9/react-native-ratings

// End ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem

export default function TypeScreen({ navigation }) {

  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);

  const dispatch = useDispatch();
  const signUpProcess = useSelector((state: any) => state.signUpProcess.value);

  const [dietetique, setDietetique] = useState(0);
  const [bilan, setbilan] = useState(0);
  const [ethique, setEthique] = useState(0);
  const [local, setLocal] = useState(0);
  const [agriculture, setAgriculture] = useState(0);

  const [goFetch, setGoFetch] = useState(false)

  useEffect(() => {

    if (goFetch) {
        fetch(`${REACT_APP_BACKEND_URL}/users/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpProcess),
          })
            .then((response) => response.json())
            .then((userData) => {
                console.log(userData.newUser)
              setGoFetch(false)
              dispatch(connectUser(userData.newUser))
              dispatch(reset())
              navigation.navigate('TabNavigator')
            });
    }

  }, [goFetch])

  const types = {
    dietetique: dietetique,
    bilan: bilan,
    ethique: ethique,
    local: local,
    agriculture: agriculture,
  }

  console.log("types", types);

  console.log("signUpProcess:", signUpProcess);

  const handleSubmit = () => {
    dispatch(addUserType(types));
    setGoFetch(true)
  };


  return (
    <KeyboardAwareScrollView>
      <View style={styles.backgroundView}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.globalViewContainer}>
            <View style={styles.listpreference}>
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
                  Dites-nous ce qui
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
                  vous tient à coeur !
                </Heading>
              </VStack>

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>DIETETIQUE</ListItem.Title>
              <ListItem.Subtitle>
                Maîtriser sa consommation calorique
              </ListItem.Subtitle>
            </ListItem.Content>
            <Rating
              fractions={0}
              imageSize={20}
              minValue={0}
              // onFinishRating={() => console.log("onFinishRating()")}
              onFinishRating={setDietetique}
            //   onStartRating={() => console.log("onStartRating()")}
              ratingBackgroundColor="#FFF"
              ratingColor="#FF0"
              ratingCount={5}
              ratingImage="star"
              ratingTextColor="#222"
              // showRating
              startingValue={1}
              style={{}}
              type="star"
            />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>BILAN CO2</ListItem.Title>
              <ListItem.Subtitle>Protéger la planète</ListItem.Subtitle>
            </ListItem.Content>
            <Rating
              fractions={0}
              imageSize={20}
              minValue={0}
              onFinishRating={setbilan}
            //   onStartRating={() => console.log("onStartRating()")}
              ratingBackgroundColor="#FFF"
              ratingColor="#FF0"
              ratingCount={5}
              ratingImage="star"
              ratingTextColor="#222"
              //        showRating
              startingValue={1}
              style={{}}
              type="star"
            />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>ETHIQUE ANIMALE</ListItem.Title>
              <ListItem.Subtitle>
                Eviter la souffrance animale
              </ListItem.Subtitle>
            </ListItem.Content>
            <Rating
              fractions={0}
              imageSize={20}
              minValue={0}
              onFinishRating={setEthique}
            //   onStartRating={() => console.log("onStartRating()")}
              ratingBackgroundColor="#FFF"
              ratingColor="#FF0"
              ratingCount={5}
              ratingImage="star"
              ratingTextColor="#222"
              //          showRating
              startingValue={1}
              style={{}}
              type="star"
            />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>PRODUITS LOCAUX</ListItem.Title>
              <ListItem.Subtitle>
                Soutenir l’économie locale
              </ListItem.Subtitle>
            </ListItem.Content>
            <Rating
              fractions={0}
              imageSize={20}
              minValue={0}
              onFinishRating={setLocal}
            //   onStartRating={() => console.log("onStartRating()")}
              ratingBackgroundColor="#FFF"
              ratingColor="#FF0"
              ratingCount={5}
              ratingImage="star"
              ratingTextColor="#222"
              //          showRating
              startingValue={1}
              style={{}}
              type="star"
            />
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>AGRICULTURE RAISONNEE</ListItem.Title>
              <ListItem.Subtitle>
                Limiter usage de pesticides
              </ListItem.Subtitle>
            </ListItem.Content>
            <Rating
              fractions={0}
              imageSize={20}
              minValue={0}
              onFinishRating={setAgriculture}
            //   onStartRating={() => console.log("onStartRating()")}
              ratingBackgroundColor="#FFF"
              ratingColor="#FF0"
              ratingCount={5}
              ratingImage="star"
              ratingTextColor="#222"
              //          showRating
              startingValue={1}
              style={{}}
              type="star"
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
    listpreference: {
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