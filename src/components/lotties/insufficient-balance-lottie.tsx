import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { IText } from "../Text";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../utils/colors";
import { Button } from "../Button";

export type modalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InsufficientBalanceModal = (props: modalProps) => {
  const animation = useRef(null);
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.setVisible(!props.visible)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#fff",
            }}
          >
            <LottieView
              autoPlay
              ref={animation}
              resizeMode="cover"
              source={require("../../../assets/lotties/4386-connection-error.json")}
            />
          </View>
          <IText type="lg">Insufficent balance</IText>
          <IText type="sm">Fund your account and try again</IText>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.setVisible(false)}
          >
            <IText type="sm" extrastyles={styles.error}>
              Close
            </IText>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.modal_bg,
  },
  box: {
    width: "90%",
    height: "60%",
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: colors.error,
    borderRadius: 8,
    marginTop: 50,
  },
  error: {
    color: colors.error,
  },
});
