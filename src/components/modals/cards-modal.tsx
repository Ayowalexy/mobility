import React, { useState } from "react";
import { IText } from "../Text";
import {
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from "react-native";
import { Empty } from "../../utils/images";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "../Button";
import { Payment } from "../paystack/paystack";
import { CreditCard } from "../customs/credit-card";
import { useAppSelector } from "../../redux/store";

type cardProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CarddModal = ({ visible, setVisible }: cardProps): JSX.Element => {
  const [showpayment, setShowPayment] = useState<boolean>(false);
 
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setVisible(false)}
          >
            <Ionicons name="close-circle" color={colors.primary} size={35} />
          </TouchableOpacity>

          <View style={styles.inner_box}>
            <Image source={Empty} />
            <IText
              type="sm"
              extrastyles={{ textAlign: "center", width: "80%" }}
            >
              You have not added any card yet. {"\n"}Click to add a card now. A
              token of #100 will be deducted from your bank which will be
              refunded once we've tokenize your card
            </IText>
            <Button
              extrastyles={styles.btn}
              onPress={() => setShowPayment(true)}
            >
              Add a card
            </Button>
            {showpayment && <Payment setVisible={setVisible} setShowPayment={setShowPayment} />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.modal_bg,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  box: {
    width: "100%",
    // height: 500,
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  close: {
    position: "absolute",
    right: 0,
    padding: 20,
    zIndex: 1000,
  },
  inner_box: {
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    marginBottom: 70,
    width: "100%",
  },
  btn: {
    width: "80%",
    marginTop: 30,
  },
});
