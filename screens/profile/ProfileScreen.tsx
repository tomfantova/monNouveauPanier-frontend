import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  HStack,
  VStack,
  Avatar,
  useColorModeValue,
  Button,
  IconButton,
  Circle,
  Heading,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import FloatingLabelInput from "../../components/FloatingLabelInput";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ListItem, ListItemProps, lightColors } from "@rneui/themed";

//import Rating from "react-native-ratings";
import { Rating } from "react-native-ratings";

//to display Star Rating NUMBER in console.log
const ratingCompleted = (rating: number) => {
  console.log("Rating is: " + rating);
};

const FormComponent = () => {
  const [name, setName] = React.useState("Milcent Joé");
  const [email, setEmail] = React.useState("joe@mnp.com");
  const [pwd, setPwd] = React.useState("****");
  const [conso, setConso] = React.useState("ECOLOGIE");

  const labelStyle = {
    labelColor: "#9CA3AF",
    labelBGColor: useColorModeValue("#fff", "#1F2937"),
  };
  return (
    <VStack space={{ base: 6, md: 8 }}>
      <VStack mt={{ base: 5, md: 5 }} space={6}>
        <FloatingLabelInput
          value={name}
          onChangeText={setName}
          isRequired
          label="Nom & Prénom"
          {...labelStyle}
        />

    <FloatingLabelInput
      isRequired
      label="Email"
      {...labelStyle}
      value={email}
      onChangeText={setEmail}
    />
    <FloatingLabelInput
      isRequired
      label="Mot de passe"
      {...labelStyle}
      value={pwd}
      onChangeText={setPwd}
    />
    <FloatingLabelInput
      value={conso}
      onChangeText={setConso}
      isRequired
      label="Profil consommation"
      {...labelStyle}
    />
  </VStack>
  <HStack
    alignItems="center"
    flexDirection={{ base: "column", md: "row" }}
    justifyContent="space-between"
  ></HStack>
</VStack>
  );
};

// Start ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem
// Start Rating from "react-native-ratings" https://github.com/Monte9/react-native-ratings

type ListComponentProps = ListItemProps;

const ListPreference: React.FunctionComponent<ListComponentProps> = () => {
  return (
    <View style={styles.listpreference}>
      <VStack space={1} alignItems="center">
        <View style={styles.header}>
          <Heading
            mt="0"
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Vos préférences
          </Heading>
        </View>
      </VStack>

  <ListItem style={styles.space} bottomDivider>
    <ListItem.Content>
      <ListItem.Title>DIETETIQUE</ListItem.Title>
    </ListItem.Content>
    <Rating
      fractions={0}
      imageSize={20}
      minValue={0}
      // onFinishRating={() => console.log("onFinishRating()")}
      onFinishRating={ratingCompleted}
      onStartRating={() => console.log("onStartRating()")}
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
    </ListItem.Content>
    <Rating
      fractions={0}
      imageSize={20}
      minValue={0}
      onFinishRating={ratingCompleted}
      onStartRating={() => console.log("onStartRating()")}
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
    </ListItem.Content>
    <Rating
      fractions={0}
      imageSize={20}
      minValue={0}
      onFinishRating={ratingCompleted}
      onStartRating={() => console.log("onStartRating()")}
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
    </ListItem.Content>
    <Rating
      fractions={0}
      imageSize={20}
      minValue={0}
      onFinishRating={ratingCompleted}
      onStartRating={() => console.log("onStartRating()")}
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
    </ListItem.Content>
    <Rating
      fractions={0}
      imageSize={20}
      minValue={0}
      onFinishRating={ratingCompleted}
      onStartRating={() => console.log("onStartRating()")}
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
</View>
  );
};

// End ListItem from React Native Elements https://reactnativeelements.com/docs/components/listitem

export default function EditAccount() {
  return (
    //    <DashboardLayout title="Edit Details">
    <KeyboardAwareScrollView bounces={false}>
      <VStack
        px={{ base: 4, md: 8, lg: 32 }}
        py={{ base: 5, md: 8 }}
        _light={{ bg: "white" }}
        _dark={{ bg: "coolGray.800" }}
        rounded={{ md: "sm" }}
        space={{ base: 6, md: 8 }}
        flex={1}
      >
        <HStack
          mb={{ base: 0, md: -3 }}
          alignItems="center"
          justifyContent={{ md: "space-between", base: "space-around" }}
        >
          <Avatar source={require("../../assets/jandoe.png")} w="24" h="24">
            <Circle
              position="absolute"
              left={10}
              bottom={-8}
              _light={{ bg: "coolGray.50" }}
              _dark={{ bg: "coolGray.700", borderColor: "coolGray.700" }}
              alignItems="center"
              justifyContent="center"
              height={5}
              width={5}
            >
              <IconButton
                onPress={() => {}}
                ml={{ base: 1.5, md: 0 }}
                variant="unstyled"
                _icon={{
                  color: "coolGray.400",
                  size: { base: 3, md: 4 },
                  as: MaterialIcons,
                  name: "photo-camera",
                }}
              />
            </Circle>
          </Avatar>
        </HStack>
        <FormComponent />

    <ListPreference />

    <Button
      size="lg"
      mt={{ base: "auto", md: "auto" }}
      colorScheme="yellow"
      variant="solid"
    >
      MODIFIER2
    </Button>
  </VStack>
</KeyboardAwareScrollView>
//    </DashboardLayout>
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
  });
};
// Start ListItem from React Native Elements https://reactnative.dev/docs/switch.html#props
// https://reactnativeelements.com/docs/components/listitem
const styles = StyleSheet.create({
  listpreference: {
    marginTop: -30,
    //    borderTopWidth: 1,
    borderColor: lightColors.greyOutline,
    minWidth: "100%",
    backgroundColor: lightColors.background,
  },

  header: {
    position: "absolute",
    alignItems: "center",
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

  space: {
    marginTop: 35,
  },
});
// End ListItem from React Native Elements https://reactnative.dev/docs/switch.html#props
// https://reactnativeelements.com/docs/components/listitem