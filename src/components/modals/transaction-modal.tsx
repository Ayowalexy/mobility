import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { modalProps } from "../lotties/insufficient-balance-lottie";
import { BlurView } from "expo-blur";
import { colors } from "../../utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IText } from "../Text";
import { useAppSelector } from "../../redux/store";
import { formatNumber } from "../../utils/numberFormatter";

export const TransactionsModal = ({ visible, setVisible }: modalProps) => {
  const {
    oneTransaction: { createdAt, amount, name, reference, status, type },
  } = useAppSelector(({ transactionReducer }) => transactionReducer);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
      animationType="slide"
      transparent={true}
    >
      <BlurView tint="dark" intensity={30} style={styles.container}>
        <View style={styles.box}>
          <View style={styles.status}>
            <AntDesign
              color={type === "debit" ? colors.error : colors.success}
              size={70}
              name={type === "debit" ? "closecircle" : "checkcircle"}
            />
          </View>
          <IText type="lg" extrastyles={{ fontSize: 16, paddingTop: 7 }}>
            Successful transaction
          </IText>
          <IText type="sm" extrastyles={{ textAlign: "center", padding: 20 }}>
            A credit transaction of 800 took place in your account, find more
            details attached
          </IText>

          <View style={styles.form}>
            <View style={styles.box_}>
              <IText type="lg">Date</IText>
              <IText extrastyles={styles.text} type="sm">
                {new Date(createdAt).toLocaleDateString()}
              </IText>
            </View>
            <View style={[styles.box_, { alignItems: "flex-end" }]}>
              <IText type="lg">Time</IText>
              <IText extrastyles={styles.text} type="sm">
                {new Date(createdAt).toLocaleTimeString()}
              </IText>
            </View>

            <View style={styles.box_}>
              <IText type="lg">Status</IText>
              <IText extrastyles={styles.text} type="sm">
                {status}
              </IText>
            </View>
            <View style={[styles.box_, { alignItems: "flex-end" }]}>
              <IText type="lg">Type</IText>
              <IText extrastyles={styles.text} type="sm">
                {type}
              </IText>
            </View>

            <View style={styles.box_}>
              <IText type="lg">Amount</IText>
              <IText extrastyles={styles.text} type="sm">
                {formatNumber(amount)}
              </IText>
            </View>
            <View style={[styles.box_, { alignItems: "flex-end" }]}>
              <IText type="lg">Reference</IText>
              <IText extrastyles={styles.text} type="sm">
                {reference}
              </IText>
            </View>

            <View style={styles.box_}>
              <IText type="lg">Name</IText>
              <IText extrastyles={styles.text} type="sm">
                {name}
              </IText>
            </View>
            <View style={[styles.box_, { alignItems: "flex-end" }]} />
          </View>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={[
              styles.footer,
              {
                backgroundColor:
                  type === "debit" ? colors.error : colors.success,
              },
            ]}
          >
            <IText type="sm" extrastyles={{ color: colors.white }}>
              Close
            </IText>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    height: 500,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  status: {
    marginTop: -35,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 50,
  },
  box_: {
    width: "50%",
    marginTop: 20,
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "80%",
    marginTop: 15,
  },
  text: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  footer: {
    width: "100%",
    height: 55,
    backgroundColor: colors.success,
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
