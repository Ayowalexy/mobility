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
import { useNavigation } from "@react-navigation/native";

export type modalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};

export const TransferSuccessModal = (props: modalProps) => {
  const animation = useRef(null);
  const navigation = useNavigation();

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
              source={require("../../../assets/lotties//88860-success-animation.json")}
            />
          </View>
          <IText type="lg">Transfer success</IText>
          <IText type="sm">{props.message}</IText>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              props.setVisible(false)
              navigation.navigate('Tabs')
            }}
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
    borderColor: "#3490dc",
    borderRadius: 8,
    marginTop: 50,
  },
  error: {
    color: "#3490dc",
  },
});
