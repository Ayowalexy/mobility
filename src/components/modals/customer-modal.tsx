import React, { ReactNode } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IText } from "../Text";

type modalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  header?: string;
};

export const CustomModal = ({ visible, setVisible, children, header }: modalProps) => (
  <Modal
    visible={visible}
    onRequestClose={() => setVisible(!visible)}
    transparent={true}
    animationType="slide"
  >
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => setVisible(false)}
        >
          <Ionicons name="close-circle" color={colors.primary} size={35} />
        </TouchableOpacity>
        <IText type="sm" extrastyles={styles.header}>{header}</IText>
        {children}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.modal_bg,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  close: {
    position: "absolute",
    right: 0,
    padding: 20,
    zIndex: 1000,
  },
  box: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    padding: 20,
    paddingTop: 40
  }
});
