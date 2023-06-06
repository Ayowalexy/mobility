import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { colors } from "../../utils/colors";

export const PhoneNumberInput = ({ setFieldValue }) => {
  const [value, setValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <>
      <View>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          containerStyle={styles.container}
          defaultCode="NG"
          layout="first"
          textInputStyle={styles.text}
          codeTextStyle={styles.text_1}
          onChangeText={(text) => {
            setValue(text);
            setFieldValue("phone", text);

          }}
          withDarkTheme
          withShadow={false}
          autoFocus={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    backgroundColor: colors.btn_bg,
    fontFamily: "PoppinsRegular",
    paddingLeft: 20,
    color: colors.black,
    borderColor: colors.error,
    marginBottom: 30,
  },
  button: {},
  wrapper: {},
  text: {
    fontFamily: "PoppinsRegular",
    color: colors.black,
    // paddingTop: 7,
    // borderWidth:1,4
    height: 55
  },
  text_1: {
    fontFamily: "PoppinsRegular",
    color: colors.black,
    // paddingTop: 5
  },
});
