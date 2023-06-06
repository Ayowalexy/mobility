import React from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { colors } from "../../utils/colors";
import { Button } from "../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { updatePassword } from "../../redux/reducers/auth/thunkAction";
import { changePassword } from "../../redux/reducers/auth/thunkAction";
import { useRoute, RouteProp } from "@react-navigation/native";

type ParamList = {
    "Set new password": {
      email: string
    };
  };

const validationSchema = Yup.object().shape({
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

export const SetNewPassword = ({ navigation }) => {
  const dispatch = useAppThunkDispatch();
  const route = useRoute<RouteProp<ParamList, "Set new password">>();
  const { loading } = useAppSelector(({ authReducer }) => authReducer);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      delete values.confirm_password;
      await dispatch(changePassword({password: values.password, email: route.params.email})).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Successfully changed your password",
          });
          navigation.navigate('Login')
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.payload,
          });
        }
      });
    },
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <IText extrastyles={styles.header_text} type="lg">
            Reset password
          </IText>
          <View style={styles.form}>
            
            <Input
              onBlur={handleBlur("password")}
              onChange={handleChange("password")}
              errMsg={errors.password}
              err={!!errors.password && touched.password}
              valid={!!errors.password && touched.password}
              //   extrastyles={{ width: "100%", marginBottom: 0 }}
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
                <Ionicons
                  name="eye-outline"
                  color={colors.placeholder}
                  size={20}
                />
              }
              otherProps={{
                placeholder: "Password",
              }}
            />
            <Input
              onBlur={handleBlur("confirm_password")}
              onChange={handleChange("confirm_password")}
              errMsg={errors.confirm_password}
              err={!!errors.confirm_password && touched.confirm_password}
              valid={!!errors.confirm_password && touched.confirm_password}
              //   extrastyles={{ width: "100%", marginBottom: 0 }}
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
                <Ionicons
                  name="eye-outline"
                  color={colors.placeholder}
                  size={20}
                />
              }
              otherProps={{
                placeholder: "Confirm password",
              }}
            />
          </View>
          <View style={{ width: "100%", justifyContent: "center" }}>
            <Button extrastyles={{}} onPress={() => handleSubmit()} loading={loading}>
              Proceed
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    height: Dimensions.get("window").height,
  },
  header_text: {
    fontSize: 25,
  },
  form: {
    width: "100%",
    marginTop: 30,
  },
});
