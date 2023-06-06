import React, { useEffect } from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { colors } from "../../utils/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";

export const SendReceive = ({ navigation }) => {
  const route = useRoute();
  useEffect(() => {
    const onBackPress = () => {
      if (route.name === "Home") {
        BackHandler.exitApp();
        console.log("Home");
        return false;
      } else {
        console.log("Not Home");
        return false;
      }
    };
    console.log(navigation.getId());

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [route.name]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IText type="lg" extrastyles={styles.header}>
          Send money
        </IText>

        {[
          {
            name: "To other banks",
            text: "Send money to other bank accounts",
            screen: "Send to other banks",
          },
          {
            name: "Intra-Transfers",
            text: "Send to other users of LAAR",
            screen: "Send to intra banks",
          },
          {
            name: "Redeem Points",
            text: "Convert your accrued points into fuel",
            screen: "Redeem points",
          },
        ].map((element, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.btn}
            onPress={() => navigation.navigate(element.screen)}
          >
            <View style={styles.icon}>
              <FontAwesome name="send" color={colors.icon} size={25} />
            </View>
            <View style={{ width: "70%" }}>
              <IText type="lg" extrastyles={styles.header_text}>
                {element.name}
              </IText>
              <IText type="sm" extrastyles={styles.sub_text}>
                {element.text}
              </IText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={colors.black}
              size={25}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.icon_bg,
  },
  header_text: {
    fontSize: 16,
    color: colors.icon,
    fontFamily: "PoppinsSemiBold",
  },
  btn: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 80,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    borderColor: colors.black,
    // borderWidth: 0.2,
    elevation: 5,
  },
  sub_text: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "PoppinsExtraLight",
  },
});
