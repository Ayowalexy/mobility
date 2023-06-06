import React, { ReactNode } from "react";
import { Text, StyleSheet, TextStyle, StyleProp, TextProps } from "react-native";
import { colors } from "../utils/colors";

interface textProps {
  children: ReactNode;
  extrastyles?: StyleProp<TextStyle>;
  type: 'lg' | 'sm';
  otherProps?: TextProps
}

export const IText = ({ children, extrastyles, type }: textProps) => (
  <Text
    style={[
      styles.text,
      { fontFamily: type === "lg" ? "PoppinsBold" : "PoppinsRegular" },
      extrastyles,
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 14,
  },
});
