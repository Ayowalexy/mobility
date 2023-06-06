import React from "react";
import { IText } from "../Text";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Share,
} from "react-native";
import { modalProps } from "../lotties/insufficient-balance-lottie";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../Button";
import { useAppSelector } from "../../redux/store";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Enter the agent's code"),
});

export const RedeemPointsModal = ({ visible, setVisible }: modalProps) => {
  const { handleSubmit, handleChange, handleBlur, errors, touched } = useFormik(
    {
      initialValues: {
        code: "",
      },
      validationSchema,
      onSubmit: async (values) => {},
    }
  );
  const {
    user: { points, referral_code },
  } = useAppSelector(({ authReducer }) => authReducer);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Use my referral code ${referral_code} to sign up  to LAAR `,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={[styles.box, { height: points >= 5000 ? "60%" : "45%" }]}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.close}
          >
            <Ionicons name="close" size={25} color={colors.black} />
          </TouchableOpacity>

          {points >= 5000 ? (
            <>
              <IText type="sm">
                Be informed, your should only verify after you have successfully
                received fuel at in our partner's stations
              </IText>
              <View style={{ marginTop: 20 }}>
                <IText type="sm">Enter agent code</IText>
                <TextInput
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  style={styles.input}
                  placeholder="Enter code"
                />
                {!!errors.code && touched.code && (
                  <IText type="sm" extrastyles={styles.error}>
                    {errors.code}
                  </IText>
                )}

                <IText type="sm" extrastyles={{ marginTop: 15 }}>
                  Enter OTP sent to agent
                </IText>
                <TextInput
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  style={styles.input}
                  placeholder="Enter OTP"
                />
                <Button
                  extrastyles={{ marginTop: 40 }}
                  onPress={() => handleSubmit()}
                >
                  Continue
                </Button>
              </View>
            </>
          ) : (
            <>
              <IText type="sm">
                You have not accrued enough points to convert to fuel. Continue
                sharing your code with friends and family to enjoy more benefits
              </IText>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.close_btn}
              >
                <IText extrastyles={{ color: colors.primary }} type="sm">
                  Close
                </IText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onShare}
                style={[
                  styles.close_btn,
                  { backgroundColor: colors.primary, marginTop: 10 },
                ]}
              >
                <IText extrastyles={{ color: colors.white }} type="sm">
                  Share code
                </IText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modal_bg,
  },
  box: {
    width: "90%",
    height: "60%",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    paddingTop: 60,
  },
  close: {
    position: "absolute",
    right: 0,
    padding: 20,
  },
  input: {
    width: "100%",
    height: 55,
    paddingLeft: 15,
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    fontFamily: "PoppinsRegular",
  },
  error: {
    color: colors.error,
    fontSize: 10,
  },
  close_btn: {
    width: "100%",
    height: 55,
    paddingLeft: 15,
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
