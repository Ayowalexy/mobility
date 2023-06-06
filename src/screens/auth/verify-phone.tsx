import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import OTPTextInput from "react-native-otp-textinput";
import { useAuth } from "../../components/context/authContext";
import { Modal } from "react-native";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { verifyOtp, verifyPhone } from "../../redux/reducers/auth/thunkAction";
import { Preloader } from "../../components/customs/modal";

export const VerifyPhoneOtp = ({ navigation }) => {
  const [code, setCode] = useState("");
  const { email, phone } = useAuth();
  const dispatch = useAppThunkDispatch();
  const { loading } = useAppSelector(({ authReducer }) => authReducer);

  const handleVerify = async (otp: string) => {
 
    const data = { phone, otp };
    await dispatch(verifyPhone(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigation.navigate("Login");
      }
    });
  };

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
          {loading === "pending" && <Preloader />}

          <View style={styles.form}>
            <IText type="sm" extrastyles={{ textAlign: "center" }}>
              Pls enter the <IText type="lg">5-digit code </IText> sent to your
              phone number {phone}
            </IText>
            <View style={styles.otp}>
              <OTPTextInput
                inputCount={5}
                handleTextChange={(e: string) => {
                  if (e.length ===5) handleVerify(e);
                }}
              />

              <IText
                type="sm"
                extrastyles={{ textAlign: "center", marginTop: 30 }}
              >
                Resend code in{" "}
                <IText type="lg" extrastyles={{ color: colors.primary }}>
                  55{" "}
                </IText>
                s
              </IText>
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
  otp: {
    marginTop: 50,
  },
});
