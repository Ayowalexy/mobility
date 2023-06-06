import React, { useState } from "react";
import { IText } from "../Text";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../utils/colors";
import { TransactionsProps } from "../types";
import { formatNumber } from "../../utils/numberFormatter";
import { useDispatch } from "react-redux";
import { setOneTransaction } from "../../redux/reducers/transactions";
import { useTransaction } from "../context/transactionReducer";

export const TransactionCard = (props: TransactionsProps) => {
  const dispatch = useDispatch();

  const handleSelectOne = () => {
    dispatch(setOneTransaction(props._id));
    props.setVisible(true);
  };
  return (
    <TouchableOpacity onPress={handleSelectOne} style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[
            styles.success_bx,
            {
              backgroundColor:
                props.status === "credit"
                  ? colors.success_bg
                  : props.status === "pending"
                  ? colors.pending_bg
                  : colors.error_bg,
            },
          ]}
        >
          <Ionicons
            name={
              props.status === "credit"
                ? "ios-arrow-down-circle"
                : "ios-arrow-up-circle"
            }
            color={
              props.status === "credit"
                ? colors.success
                : props.status === "pending"
                ? colors.pending
                : props.status === "debit"
                ? colors.error
                : colors.error
            }
            size={30}
          />
        </View>
        <View style={styles.texts}>
          <IText type="lg" extrastyles={styles.name}>
            {props.name}
          </IText>
          <IText type="sm" extrastyles={{ fontSize: 11 }}>
            {props.date}
          </IText>
        </View>
      </View>
      <IText type="sm">₦{formatNumber(props.amount)}</IText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    // borderWidth: 1
  },
  success_bx: {
    width: 50,
    height: 50,
    backgroundColor: colors.success_bg,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  name: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
  },
  texts: {
    paddingLeft: 10,
  },
});
