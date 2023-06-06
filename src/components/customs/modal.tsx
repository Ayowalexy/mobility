import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../utils/colors";
import { IText } from "../Text";

export const Preloader = () => {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => null}
    >
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.white} />
        <IText type="sm" extrastyles={{ fontSize: 16, color: colors.white }}>
          Loading....
        </IText>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
