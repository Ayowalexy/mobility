import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "../screens/dashboard/dashboard";

const StackNavigator = createStackNavigator();

export const AppStacks = () => (
  <StackNavigator.Group screenOptions={{headerShown: false}}>
    <StackNavigator.Screen name="Dashboard" component={Dashboard} />
  </StackNavigator.Group>
);
