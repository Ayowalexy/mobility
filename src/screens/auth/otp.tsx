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
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { verifyOtp } from "../../redux/reducers/auth/thunkAction";
import { Preloader } from "../../components/customs/modal";
import { useRoute, RouteProp } from "@react-navigation/native";
import CountDown from "react-native-countdown-component";
import Toast from "react-native-toast-message";
import { getResetPassordToken } from "../../redux/reducers/auth/thunkAction";

type ParamList = {
  "Verify OTP": {
    page: string;
    email: string
  };
};

export const VerifyOtp = ({ navigation }) => {
  const [code, setCode] = useState("");
  const route = useRoute<RouteProp<ParamList, "Verify OTP">>();
  const { email } = useAuth();
  const dispatch = useAppThunkDispatch();
  const [id, setId] = useState(1);
  const [canResend, setCanResend] = useState(false);
  const { loading } = useAppSelector(({ authReducer }) => authReducer);

  const handleVerify = async (otp: string) => {
    const data = { email: route?.params?.email || email, otp };
    await dispatch(verifyOtp(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (route?.params?.page === "Reset") {
          navigation.navigate("Set new password", { email: route.params.email});
        } else {
          navigation.navigate("OTP Success");
        }
      }
    });
  };

  const handleResend = async () => {
    await dispatch(getResetPassordToken({ email: route.params.email })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setCanResend(false);
        setId((prev) => prev + 1);
        Toast.show({
          type: "success",
          text1: "OTP sent to your email",
        });
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
              Pls enter the <IText type="lg">6-digit code </IText> sent to your
              email address {email}
            </IText>
            <View style={styles.otp}>
              <OTPTextInput
                inputCount={6}
                handleTextChange={(e: string) => {
                  if (e.length === 6) handleVerify(e);
                }}
              />

              <View>
                <TouchableOpacity disabled={!canResend} onPress={() => handleResend()}>
                  <IText
                    type="sm"
                    extrastyles={{ textAlign: "center", marginTop: 30 }}
                  >
                    Resend code {!canResend && 'in'}
                  </IText>
                </TouchableOpacity>
                <CountDown
                  size={14}
                  until={60}
                  id={id}
                  onFinish={() => setCanResend(true)}
                  digitStyle={{
                    backgroundColor: "#FFF",
                  }}
                  digitTxtStyle={{ color: "#6E759F" }}
                  timeLabelStyle={{ color: "red", fontWeight: "bold" }}
                  separatorStyle={{ color: "#6E759F" }}
                  timeToShow={["M", "S"]}
                  timeLabels={{ m: null, s: null }}
                  showSeparator
                />
              </View>
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
