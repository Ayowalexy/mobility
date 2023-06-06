import React, { ReactNode, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  ViewStyle,
  StyleProp,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { IText } from "./Text";

interface inputProps {
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
  valid?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  otherProps?: TextInputProps;
  onChange?: (e: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  extrastyles?: StyleProp<ViewStyle>;
  err?: boolean;
  errMsg?: string;
  showEye?: boolean;
}

export const Input = ({
  RightIcon,
  LeftIcon,
  valid,
  hasLeftIcon,
  hasRightIcon,
  otherProps,
  extrastyles,
  onBlur,
  onChange,
  err,
  errMsg,
  showEye
}: inputProps) => {
  return (
    <View style={[styles.container, extrastyles]}>
      {hasLeftIcon && <View style={styles.leftIcon}>{LeftIcon}</View>}
      {hasRightIcon && <View style={styles.rightIcon}>{RightIcon}</View>}
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={showEye ? showEye : false}
        style={[
          styles.input,
          {
            paddingLeft: hasLeftIcon ? 50 : 0,
            backgroundColor: valid ? colors.bg_error : colors.btn_bg,
            borderWidth: valid ? 0.9 : 0,
          },
        ]}
        {...otherProps}
        placeholderTextColor={colors.placeholder}
      />
      {err && (
        <IText type="sm" extrastyles={{ color: "red", fontSize: 12 }}>
          {errMsg}
        </IText>
      )}
    </View>
  );
};

type textInputProps = {
  value?: string;
  onChange?: (e: string) => void;
  type?: "currency" | "text";
  otherProps?: TextInputProps;
  err?: boolean;
  errMsg?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

export const ITextInput = (props: textInputProps) => {
  return (
    <View style={{ width: "100%", marginTop: 20 }}>
      {props.type === "currency" && (
        <IText type="sm" extrastyles={styles.currency}>
          ₦
        </IText>
      )}
      <TextInput
        value={props.value}
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        placeholder="Enter amount"
        style={[styles.input_2, { paddingLeft: props.type === 'currency' ? 20 : 0}]}
        {...props.otherProps}
      />
      {props.err && <IText extrastyles={styles.err} type="sm">{props.errMsg}</IText>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    backgroundColor: colors.btn_bg,
    fontFamily: "PoppinsRegular",
    paddingLeft: 20,
    color: colors.black,
    borderColor: colors.error,
  },
  leftIcon: {
    position: "absolute",
    zIndex: 1000,
    top: 16,
    left: 20,
  },
  rightIcon: {
    position: "absolute",
    zIndex: 1000,
    top: 16,
    right: 20,
  },
  container: {
    marginBottom: 30,
  },
  input_2: {
    width: "100%",
    borderBottomWidth: 0.5,
    height: 60,
    fontFamily: "PoppinsSemiBold",
    color: colors.black,
    paddingLeft: 0,
  },
  currency: {
    position: "absolute",
    top: 18,
  }, err: {
    fontSize: 10,
    color: colors.error
  }
});
