import React, { useRef, useEffect, useState } from "react";
import { IText } from "../components/Text";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  BackHandler
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/dashboard/dashboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { Settings } from "../screens/settings/settings";
import { SendReceive } from "../screens/send-receive/send-receive";
import AntDesign from "@expo/vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {

  console.log(state)
  // useEffect(() => {
  //   const onBackPress = () => {
  //     console.log('BACK', route)
  //     if (route.name === "Home") {
  //       // BackHandler.exitApp();
  //       // navigation.navigate('Tabs', {
  //       //   screen: "Home"
  //       // })
  //       console.log("Home");
  //       return false;
  //     } else {
  //       console.log("Not Home");
  //       return false;
  //     }    };
  //   console.log(navigation.getId())
  
  //   const subscription = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     onBackPress
  //   );
  //   return () => subscription.remove();
    
  // }, [])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <>
              {route.name === "Send Receive" ? (
                <Animated.View style={[styles.add]}>
                  <TouchableOpacity
                  
                    accessibilityRole="button"
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    key={index}
                    onLongPress={onLongPress}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={50}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Ionicons
                    name={
                      route.name === "Home"
                        ? "home"
                        : route.name === "Settings"
                        ? "md-settings"
                        : null
                    }
                    color={colors.primary}
                    size={25}
                  />
                  <IText type="sm" extrastyles={styles.text}>
                    {label}
                  </IText>
                </TouchableOpacity>
              )}
            </>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <MyTabBar {...props} />}
  >
    <Tab.Screen name="Home" component={Dashboard} />
    <Tab.Screen name="Send Receive" component={SendReceive} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -10,
  },
  text: {
    fontSize: 12,
  },
  add: {
    marginBottom: 40,
    zIndex: 10000000,
  },
});
