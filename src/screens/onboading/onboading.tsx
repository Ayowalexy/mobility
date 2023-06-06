import React from "react";
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IText } from "../../components/Text";
import { colors } from "../../utils/colors";
import { Image1 } from "../../utils/images";
import { Button } from "../../components/Button";

export const Onboading = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={Image1} style={styles.img} />
      <IText type="lg" extrastyles={styles.header}>
        Get paid in minutes
      </IText>
      <IText type="sm" extrastyles={styles.text}>
        With LAAR, you won't have to leave your change for any vendor. Setup
        your account in {"\n"}minutes and start receiving {"\n"}payment without
        breaking a sweat.
      </IText>

      <View style={styles.form}>
        <Button onPress={() => navigation.navigate("Choose Account type")}>
          Create account
        </Button>
        <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
          <IText type="lg">Login</IText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 90,
  },
  img: {
    width: "90%",
  },
  header: {
    fontSize: 25,
  },
  text: {
    fontSize: 13,
    textAlign: "center",
    padding: 30,
  },
  form: {
    width: "80%",
    marginTop: 30,
    alignItems: "center",
  },
  login: {
    paddingTop: 30,
  },
});
