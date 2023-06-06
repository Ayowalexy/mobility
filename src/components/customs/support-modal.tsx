import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { colors } from "../../utils/colors";
import { IText } from "../Text";
import { AntDesign } from "@expo/vector-icons";

type props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SupportModal = ({ visible, setVisible }: props) => {
  const call = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:08130944449";
    } else {
      phoneNumber = "telprompt:08130944449";
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.close}
          >
            <AntDesign name="closecircle" color={colors.black} size={25} />
          </TouchableOpacity>
          <IText
            extrastyles={{ paddingTop: 30, paddingBottom: 20, fontSize: 17 }}
            type="lg"
          >
            How will you like to reach us?
          </IText>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@laar.com')} style={{ paddingBottom: 15 }}>
            <IText type="sm">1) Email</IText>
          </TouchableOpacity>
          <TouchableOpacity onPress={call} style={{ paddingBottom: 15 }}>
            <IText type="sm">2) Phone call</IText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/message/VZAIN5RV5PDLD1')} style={{ paddingBottom: 15 }}>
            <IText type="sm">3) WhatsApp</IText>
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  box: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.white,
    height: 300,
    padding: 20,
  },
  close: {
    position: "absolute",
    right: 0,
    margin: 20,
    zIndex: 1000,
  },
});
