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
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { WelcomeImg } from "../../utils/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { loginUser } from "../../redux/reducers/auth/thunkAction";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = ({ navigation }) => {
  const dispatch = useAppThunkDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { loading } = useAppSelector(({ authReducer }) => authReducer);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(loginUser(values)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigation.navigate("Tabs");
        }
      });
    },
  });
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

          <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior="padding"
            style={styles.form}
          >
            <Image source={WelcomeImg} style={styles.img} />

            <View style={styles.input}>
              <Input
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                errMsg={errors.email}
                err={!!errors.email && touched.email}
                valid={!!errors.email && touched.email}
                hasLeftIcon={true}
                LeftIcon={
                  <Ionicons
                    name="mail-outline"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Email Address",
                }}
              />
              <View style={styles.password}>
                <Input
                  onBlur={handleBlur("password")}
                  onChange={handleChange("password")}
                  errMsg={errors.password}
                  err={!!errors.password && touched.password}
                  valid={!!errors.password && touched.password}
                  extrastyles={{ width: "80%", marginBottom: 0 }}
                  hasLeftIcon={true}
                  showEye={showPassword}
                  LeftIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      color={colors.placeholder}
                      size={20}
                    />
                  }
                  hasRightIcon={true}
                  RightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name="eye-outline"
                        color={colors.placeholder}
                        size={20}
                      />
                    </TouchableOpacity>
                  }
                  otherProps={{
                    placeholder: "Password",
                  }}
                />
                <TouchableOpacity style={styles.finger}>
                  <Ionicons
                    name="finger-print"
                    size={30}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.login, { marginTop: 30, marginBottom: 20 }]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Forgot password")}
                >
                  <IText extrastyles={{ color: colors.primary }} type="sm">
                    Forgot Password
                  </IText>
                </TouchableOpacity>
              </View>
              <Button loading={loading} onPress={() => handleSubmit()}>
                Login
              </Button>
              <View style={styles.flex}>
                <IText type="sm">Already a user?</IText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Choose Account type")}
                >
                  <IText extrastyles={{ color: colors.primary }} type="sm">
                    {" "}
                    Create account
                  </IText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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
  sText: {
    fontFamily: "PoppinsExtraLight",
    fontSize: 12,
  },
  input: {
    marginTop: 50,
    width: "100%",
  },
  login: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  img: {
    width: "70%",
    marginTop: 30,
  },
  finger: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 0.9,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  password: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
