import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Provider, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import currentList from "./reducers/currentList";
import executedList from "./reducers/executedList";
import modifyList from "./reducers/modifyList";
import allGuides from "./reducers/allGuides";
import signUpProcess from './reducers/signUpProcess'

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const reducers = combineReducers({
  user,
  currentList,
  executedList,
  modifyList,
  allGuides,
  signUpProcess
});

const persistConfig = { key: "monnouveaupanier", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./screens/connection/WelcomeScreen";
import ConnexionScreen from "./screens/connection/ConnectionScreen";
import InscriptionScreen from "./screens/connection/InscriptionScreen";
import TypeScreen from "./screens/connection/TypeScreen";
import PreferenceScreen from "./screens/connection/PreferenceScreen";
import ForgotPasswordScreen from './screens/connection/ForgotPasswordScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import GuidesScreen from "./screens/guides/GuidesScreen";
import CategoryScreen from "./screens/guides/CategoryScreen";
import ArticleScreen from "./screens/guides/ArticleScreen";
import BookmarksScreen from "./screens/bookmarks/BookmarksScreen";
import OffersScreen from "./screens/offers/OffersScreen";
import ListsScreen from "./screens/lists/ListsScreen";
import SectionsScreen from "./screens/lists/SectionsScreen";
import ExecutedScreen from "./screens/lists/ExecutedScreen";
import ArchiveScreen from "./screens/lists/ArchiveScreen";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeBaseProvider } from "native-base";


export default function App() {

  const { height, width, fontScale } = useWindowDimensions();
  const styles = makeStyles(height, width, fontScale);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  const HeaderContent = (props: any) => {
    let handleHeaderTitle: any = "";

    if (props.children === "Guides") {
      handleHeaderTitle = () => {
        return (
          <View style={styles.headerItemContainer}>
            <Image
              style={styles.headerLogoImage}
              source={require("./assets/logo/logo-transparent.png")}
              defaultSource={require("./assets/logo/logo-transparent.png")}
            />
            <Text style={styles.headerLogoName}>Mon Nouveau Panier</Text>
          </View>
        );
      };
    } else {
      handleHeaderTitle = () => {
        return (
          <View style={styles.headerItemContainer}>
            <Text style={styles.headerTitleText}>{props.children}</Text>
          </View>
        );
      };
    }

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerItemContainer}>
          <TouchableOpacity style={styles.headerMenuButton}>
            <MaterialCommunityIcon name="handshake" color="#F1F1F1" size={30} />
          </TouchableOpacity>
        </View>
        {handleHeaderTitle()}
        <View style={styles.headerItemContainer}>
          <TouchableOpacity style={styles.headerProfileButton}>
            <Image
              style={styles.headerProfileImage}
              source={require("./assets/avatars/type1.png")}
              defaultSource={require("./assets/avatars/type1.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ListsStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ListsView" component={ListsScreen} />
        <Stack.Screen name="Sections" component={SectionsScreen} />
        <Stack.Screen name="Executed" component={ExecutedScreen} />
        <Stack.Screen name="Archive" component={ArchiveScreen} />
      </Stack.Navigator>
    );
  };

  const GuidesStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="GuidesHome" component={GuidesScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    )
  }



  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";
            let customSize: number = 0;

            if (route.name === "Guides") {
              iconName = "book-search"; // image-search note-search file-search database-search clipboard-text-search text-box-search tag-search book-search book-search-outline bookmark-box-multiple-outline
              customSize = size * 1.16;
            } else if (route.name === "Bookmarks") {
              iconName = "star"; // star star-outline star-half-full
              customSize = size * 1.2;
            } else if (route.name === "Offers") {
              iconName = "store"; // storefront-plus handshake cart-heart hand-heart-outline store-clock store-check store-marker store-plus basket-plus-outline
              customSize = size * 1.2;
            } else if (route.name === "Lists") {
              iconName = "playlist-edit";
              customSize = size * 1.4;
            }

            return (
              <MaterialCommunityIcon
                name={iconName}
                color={color}
                size={customSize}
              />
            );
          },
          tabBarActiveTintColor: "#F1A100",
          tabBarInactiveTintColor: "#AFAFAF",
          headerShown: true,
          headerTitle: (props: any) => <HeaderContent {...props} />,
          headerStyle: { backgroundColor: "#002654" },

        })}
      >
        <Tab.Screen
          name="Guides"
          component={GuidesStackNavigator}
          options={{ title: "Guides" }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{ title: "Favoris" }}
        />
        <Tab.Screen
          name="Offers"
          component={OffersScreen}
          options={{ title: "Offres" }}
        />
        <Tab.Screen
          name="Lists"
          component={ListsStackNavigator}
          options={{ title: "Listes" }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NativeBaseProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
            <Stack.Screen name="Connexion" component={ConnexionScreen} />
            <Stack.Screen name="Preference" component={PreferenceScreen} />
            <Stack.Screen name="Type" component={TypeScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

const makeStyles = (height: number, width: number, fontScale: number) => {
  const adaptToHeight = (size: number) => {
    return (height * size) / 844;
  };

  const adaptToWidth = (size: number) => {
    return (width * size) / 390;
  };

  const normalizeText = (size: number) => {
    return (width * size) / 390 / fontScale;
  };

  return StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    headerItemContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
      marginHorizontal: adaptToWidth(3.4),
    },
    headerMenuButton: {
      height: 38,
      width: 38,
      borderColor: "#AFAFAF",
      borderRadius: 8,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerLogoImage: {
      height: 32,
      width: 32,
      marginBottom: 2,
    },
    headerLogoName: {
      textAlign: "center",
      color: "#D6930C",
      fontSize: 9 / fontScale,
      fontWeight: "500",
    },
    headerTitleText: {
      fontSize: 16 / fontScale,
      fontWeight: "600",
      color: "white",
    },
    headerProfileButton: {
      height: 38,
      width: 38,
      borderColor: "#AFAFAF",
      backgroundColor: "#F1F1F1",
      borderRadius: 50,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerProfileImage: {
      height: "150%",
      width: "150%",
    },
  });
};
