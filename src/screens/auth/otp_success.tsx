import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Button";
import { Success } from "../../utils/images";
import Ionicons from "@expo/vector-icons/Ionicons";

export const OTPSuccess = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={colors.black}
              size={30}
            />
          </TouchableOpacity>

          <View style={styles.form}>
            <Image source={Success} style={styles.img} />

            <IText type="lg" extrastyles={styles.header}>
              Successful
            </IText>
            <IText type="sm" extrastyles={styles.text}>
              Your email was verified successfully, kindly proceed to login
              to your dashboard.
            </IText>

            <View style={styles.input}>
              <Button onPress={() => navigation.navigate("Login")}>
                Continue to Login
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "100%",
    height: Dimensions.get("window").height,
  },
  header: {
    fontSize: 30,
    fontFamily: "PoppinsSemiBold",
  },
  form: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },

  input: {
    marginTop: 30,
    width: "100%",
  },
  login: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "70%",
    marginTop: 30,
  },
  text: {
    fontSize: 13,
    textAlign: "center",
    padding: 30,
  },
});
