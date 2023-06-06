import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PhoneNumberInput } from "../../components/customs/phone-number-input";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAppSelector, useAppThunkDispatch } from "../../redux/store";
import { signIn } from "../../redux/reducers/auth/thunkAction";
import { useAuth } from "../../components/context/authContext";
import { SelectLgaModal } from "../../components/customs/country-lga-modal";
import { SelectStateModal } from "../../components/customs/country-select-modal";
import AntDesign from "@expo/vector-icons/AntDesign";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  licence: Yup.string().required("Enter your licence number"),
  car_type: Yup.string().required("Enter your car type"),
  park: Yup.string().required("Required"),
  route_from: Yup.string().required("Where do you move from"),
  route_to: Yup.string().required("Where is your destination"),
  state: Yup.string().required("Select a state"),
  lga: Yup.string().required("Select a local goverment area"),
  phone: Yup.string().required("phone number is required"),
  referral_code: Yup.string(),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirm_password: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const DriverSignUp = ({ navigation }) => {
  const dispatch = useAppThunkDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showPassword_, setShowPassword_] = useState<boolean>(true);
  const { setEmail, account_type, setPhone } = useAuth();
  const [showStateModal, setShowStateModal] = useState<boolean>(false);
  const [showLgaModal, setShowLgaModal] = useState<boolean>(false);

  const { loading } = useAppSelector(({ authReducer }) => authReducer);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirm_password: "",
      licence: "",
      car_type: "",
      park: "",
      route_from: "",
      route_to: "",
      state: "",
      lga: "",
      phone: "",
      referral_code: "null",
    },
    validationSchema,
    onSubmit: async (values) => {
      delete values.confirm_password;
      await dispatch(signIn({ ...values, accountType: "Driver" })).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setEmail(values.email);
            setPhone(values.phone);
            navigation.navigate("Sign up success");
          }
        }
      );
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          behavior="padding"
          style={{ padding: 20 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={colors.black}
              size={30}
            />
          </TouchableOpacity>

          <View style={styles.form}>
            <IText type="lg" extrastyles={styles.header}>
              Register Account
            </IText>
            <IText type="sm" extrastyles={styles.sText}>
              Fill your details to continue with app
            </IText>

            <View style={styles.input}>
              <Input
                onBlur={handleBlur("firstName")}
                onChange={handleChange("firstName")}
                errMsg={errors.firstName}
                err={!!errors.firstName && touched.firstName}
                valid={!!errors.firstName && touched.firstName}
                LeftIcon={
                  <Ionicons
                    name="person-outline"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                hasLeftIcon={true}
                otherProps={{
                  placeholder: "First Name",
                }}
              />
              <Input
                onBlur={handleBlur("lastName")}
                onChange={handleChange("lastName")}
                errMsg={errors.lastName}
                err={!!errors.lastName && touched.lastName}
                valid={!!errors.lastName && touched.lastName}
                LeftIcon={
                  <Ionicons
                    name="person-outline"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                hasLeftIcon={true}
                otherProps={{
                  placeholder: "Last Name",
                }}
              />
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

              <PhoneNumberInput setFieldValue={setFieldValue} />

              <Input
                onBlur={handleBlur("licence")}
                onChange={handleChange("licence")}
                errMsg={errors.licence}
                err={!!errors.licence && touched.licence}
                valid={!!errors.licence && touched.licence}
                hasLeftIcon={true}
                LeftIcon={
                  <FontAwesome
                    name="drivers-license-o"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Licence number",
                }}
              />

              <Input
                onBlur={handleBlur("car_type")}
                onChange={handleChange("car_type")}
                errMsg={errors.car_type}
                err={!!errors.car_type && touched.car_type}
                valid={!!errors.car_type && touched.car_type}
                hasLeftIcon={true}
                LeftIcon={
                  <Ionicons
                    name="car-sport-outline"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Your car type",
                }}
              />

              <Input
                onBlur={handleBlur("park")}
                onChange={handleChange("park")}
                errMsg={errors.park}
                err={!!errors.park && touched.park}
                valid={!!errors.park && touched.park}
                hasLeftIcon={true}
                LeftIcon={
                  <MaterialCommunityIcons
                    name="garage-variant"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Your park",
                }}
              />
              <Input
                onBlur={handleBlur("route_from")}
                onChange={handleChange("route_from")}
                errMsg={errors.route_from}
                err={!!errors.route_from && touched.route_from}
                valid={!!errors.route_from && touched.route_from}
                hasLeftIcon={true}
                LeftIcon={
                  <FontAwesome5
                    name="route"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Where do you move from?",
                }}
              />
              <Input
                onBlur={handleBlur("route_to")}
                onChange={handleChange("route_to")}
                errMsg={errors.route_to}
                err={!!errors.route_to && touched.route_to}
                valid={!!errors.route_to && touched.route_to}
                hasLeftIcon={true}
                LeftIcon={
                  <FontAwesome5
                    name="route"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Where do you move to?",
                }}
              />

              <TouchableOpacity
                style={styles.select}
                onPress={() => setShowStateModal(true)}
              >
                <Ionicons
                  name="map-sharp"
                  color={colors.placeholder}
                  size={20}
                />
                <IText extrastyles={{ color: colors.placeholder }} type="sm">
                  {"   "}
                  {values.state ? values.state : "Select state"}
                </IText>
              </TouchableOpacity>

              <SelectStateModal
                visible={showStateModal}
                setVisible={setShowStateModal}
                setFieldValue={setFieldValue}
              />

              <TouchableOpacity
                style={styles.select}
                onPress={() => {
                  if (Boolean(values.state.length)) {
                    setShowLgaModal(true);
                  }
                }}
              >
                <Ionicons
                  name="map-sharp"
                  color={colors.placeholder}
                  size={20}
                />
                <IText extrastyles={{ color: colors.placeholder }} type="sm">
                  {"   "}
                  {values.lga ? values.lga : "Select LGA"}
                </IText>
              </TouchableOpacity>

              <SelectLgaModal
                visible={showLgaModal}
                setVisible={setShowLgaModal}
                setFieldValue={setFieldValue}
                state={values.state || ""}
              />

              <Input
                onBlur={handleBlur("referral_code")}
                onChange={handleChange("referral_code")}
                errMsg={errors.referral_code}
                err={!!errors.referral_code && touched.referral_code}
                valid={!!errors.referral_code && touched.referral_code}
                hasLeftIcon={true}
                LeftIcon={
                  <AntDesign
                    name="codesquareo"
                    color={colors.placeholder}
                    size={20}
                  />
                }
                otherProps={{
                  placeholder: "Referral code",
                }}
              />
              <Input
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                errMsg={errors.password}
                err={!!errors.password && touched.password}
                valid={!!errors.password && touched.password}
                showEye={showPassword}
                hasLeftIcon={true}
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
              <Input
                hasLeftIcon={true}
                onBlur={handleBlur("confirm_password")}
                onChange={handleChange("confirm_password")}
                errMsg={errors.confirm_password}
                err={!!errors.confirm_password && touched.confirm_password}
                valid={!!errors.confirm_password && touched.confirm_password}
                showEye={showPassword_}
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
                    onPress={() => setShowPassword_(!showPassword_)}
                  >
                    <Ionicons
                      name="eye-outline"
                      color={colors.placeholder}
                      size={20}
                    />
                  </TouchableOpacity>
                }
                otherProps={{
                  placeholder: "Confirm Password",
                }}
              />

              <Button loading={loading} onPress={() => handleSubmit()}>
                Register
              </Button>
              <View style={styles.login}>
                <IText type="sm">Already have an account?</IText>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <IText extrastyles={{ color: colors.primary }} type="sm">
                    {" "}
                    Login
                  </IText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  },
  sText: {
    fontFamily: "PoppinsExtraLight",
    fontSize: 12,
  },
  input: {
    marginTop: 50,
  },
  login: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    backgroundColor: colors.btn_bg,
    fontFamily: "PoppinsRegular",
    paddingLeft: 20,
    color: colors.black,
    borderColor: colors.error,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
});
