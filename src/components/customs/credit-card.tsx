import React from "react";
import { IText } from "../Text";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { creditCardProps } from "../types";

type cardProps = {
  name: string;
  bank: string;
  last4: string;
  setSelectedBank: React.Dispatch<React.SetStateAction<creditCardProps>>;
  authorization_code: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBank: creditCardProps
};

export const CreditCard = (props: cardProps) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      props.setSelectedBank({
        account_name: props.name,
        bank: props.bank,
        last4: props.last4,
        authorization_code: props.authorization_code
      })
      props.setVisible(false)
    }}
  >
    <View>
      <IText type="lg">{props.name}</IText>
      <IText type="sm">Access Bank</IText>
    </View>
    <View style={styles.end}>
      <IText type="sm" extrastyles={styles.type}>
        {props.bank}
      </IText>
      <IText type="sm" extrastyles={styles.type}>
        ****{props.last4}
      </IText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 0.5,
    paddingBottom: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  type: {
    fontStyle: "italic",
    fontSize: 12,
  },
  end: {
    alignItems: "flex-end",
  },
});
