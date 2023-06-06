import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { colors } from "../utils/colors";
import { IText } from "./Text";

interface buttonProps {
  children: ReactNode;
  onPress: (e: GestureResponderEvent) => void;
  extrastyles?: StyleProp<ViewStyle>;
  loading?: "failed" | "pending" | "successful" | "idle";
}

export const Button = ({
  children,
  onPress,
  extrastyles,
  loading,
}: buttonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, extrastyles]}>
      {loading === "pending" ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <IText type="sm" extrastyles={styles.text}>
          {children}
        </IText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    color: colors.white,
    fontSize: 15,
  },
});
