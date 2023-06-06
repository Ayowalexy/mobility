import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IText } from "../../components/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../utils/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "../../components/context/authContext";
import { Button } from "../../components/Button";
import { data } from "../../components/types";

export const ChooseAccountType = ({ navigation }) => {
  const { account_type, setAccount } = useAuth();

  return (
    <SafeAreaView>
      <View style={{ padding: 20, height: Dimensions.get("window").height }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            color={colors.black}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.form}>
          <IText type="lg" extrastyles={styles.header}>
            First things first...
          </IText>
          <IText type="sm" extrastyles={styles.sText}>
            Choose your account type
          </IText>

          <View style={{ marginTop: 40 }}>
            {data.map((data, idx) => (
              <TouchableOpacity
                onPress={() => setAccount(data.name)}
                key={idx}
                style={[
                  styles.box,
                  account_type === data.name && styles.active,
                ]}
              >
                <FontAwesome5
                  name={data.icon}
                  color={colors.primary}
                  size={25}
                />
                <IText type="lg" extrastyles={styles.type}>
                  {data.name}
                </IText>
                <IText
                  type="sm"
                  extrastyles={[styles.type, { paddingTop: 20 }]}
                >
                  {data.text}
                </IText>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            extrastyles={styles.btn}
            onPress={() =>
              navigation.navigate(
                `${account_type === "Driver" ? "Driver Sign up" : "Sign Up"}`
              )
            }
          >
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  header: {
    fontSize: 30,
    fontFamily: "PoppinsSemiBold",
  },
  sText: {
    fontFamily: "PoppinsExtraLight",
    fontSize: 12,
  },
  box: {
    width: "100%",
    height: 160,
    borderColor: colors.placeholder,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    backgroundColor: colors.white,
  },
  type: {
    paddingTop: 5,
  },
  active: {
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderColor: colors.primary
  },
  btn: {
    marginTop: 30,
  },
});
