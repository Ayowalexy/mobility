import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button } from "../../components/Button";
import { colors } from "../../utils/colors";
import { RedeemPointsModal } from "../../components/modals/redeem-points-modal";
import { useAppSelector } from "../../redux/store";

export const RedeemPoints = () => {
  const [amount, setAmount] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const {
    user: { points },
  } = useAppSelector(({ authReducer }) => authReducer);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <IText type="lg" extrastyles={styles.header}>
            Redeem Points
          </IText>
          <View style={styles.form}>
            <IText type="sm">
              Redeem your points by exchanging it with fuel at our partner's
              fuel stations
            </IText>

            <View style={styles.cont}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                placeholder="Enter amount"
              />
              <TouchableOpacity style={styles.points}>
                <IText extrastyles={{ color: colors.white }} type="sm">
                  Points: {points}
                </IText>
              </TouchableOpacity>
            </View>
            <Button extrastyles={styles.btn} onPress={() => setVisible(true)}>
              Redeem
            </Button>
          </View>
          <RedeemPointsModal visible={visible} setVisible={setVisible} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 25,
  },
  form: {
    paddingTop: 30,
  },
  cont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  points: {
    width: "47%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  input: {
    width: "47%",
    height: 55,
    paddingLeft: 15,
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    fontFamily: "PoppinsRegular",
  },
  btn: {
    marginTop: 20,
  },
});
