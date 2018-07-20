/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Alert,
  Platform,
  FlatList,
  Button,
  StyleSheet,
  Text,
  View,
  Slider,
  Switch,
  AsyncStorage,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { createStackNavigator } from "react-navigation";

//Local includes
import HomeScreen from "./Home.js";
import HelpScreen from "./Help.js";

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Help: { screen: HelpScreen }
    // Onboarding: { screen: OnboardingScreen },
    // Connection: { screen: ConnectionScreen }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default App;
