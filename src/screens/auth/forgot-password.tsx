import React from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../../utils/colors";
import { Input } from "../../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "../../components/Button";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import { getResetPassordToken } from "../../redux/reducers/auth/thunkAction";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export const ForgotPassword = ({ navigation }) => {
    const dispatch = useAppThunkDispatch();
    const { loading } = useAppSelector(({ authReducer}) => authReducer)
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
    },
    validationSchema,
    onSubmit: async (values) => {
        await dispatch(getResetPassordToken(values)).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                navigation.navigate('Verify OTP', { page: 'Reset', email: values.email})
            }
        })
    },
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <IText type="lg">Forgot password</IText>
          <IText type="sm">Enter your email to get the reset token</IText>
          <View style={styles.form}>
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
            <Button loading={loading} onPress={() => handleSubmit()}>Proceed</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
    backgroundColor: colors.white,
    padding: 30,
  },
  form: {
    marginTop: 30,
  },
});
