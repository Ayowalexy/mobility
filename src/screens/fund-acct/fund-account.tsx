import React, { useState, useEffect } from "react";
import { IText } from "../../components/Text";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { CustomModal } from "../../components/modals/customer-modal";
import { CreditCard } from "../../components/customs/credit-card";
import { colors } from "../../utils/colors";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../../components/Button";
import {
  fundAccount,
  getTransactions,
  getCards
} from "../../redux/reducers/transactions/thunkAction";
import { creditCardProps, fundProps } from "../../components/types";
import { getUser } from "../../redux/reducers/auth/thunkAction";
import { TransferSuccessModal } from "../../components/lotties/transfer-success";
import { formatNumber } from "../../utils/numberFormatter";

export const FundAccount = ({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppThunkDispatch();
  const [selectedBank, setSelectedBank] = useState<creditCardProps>({
    bank: "",
    authorization_code: "",
    last4: "",
    account_name: "",
  });
  const { cards, loading } = useAppSelector(
    ({ transactionReducer }) => transactionReducer
  );

  const {
    user: { firstName, lastName, email },
  } = useAppSelector(({ authReducer }) => authReducer);

  const handleFund = async () => {
    const data: fundProps = {
      authorization_code: selectedBank.authorization_code,
      email,
      amount: amount,
    };
    await dispatch(fundAccount(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getUser({}));
        dispatch(getTransactions({}));
        setMessage(`You just funded your account with ${formatNumber(amount)}`);
        setShowFeedback(true);
      }
    });
  };

  useEffect(() => {
    dispatch(getCards({}))
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.cards}>
        <IText type="lg" extrastyles={styles.header}>
          Fund your account
        </IText>

        <TouchableOpacity
          style={styles.selected}
          onPress={() => setVisible(true)}
        >
          {selectedBank?.bank ? (
            <>
              <IText type="lg">Access bank</IText>
              <IText type="sm">****9789</IText>
            </>
          ) : (
            <IText type="sm">Select a bank</IText>
          )}
        </TouchableOpacity>

        <View style={{ width: "100%" }}>
          <IText type="sm" extrastyles={styles.currency}>
            ₦
          </IText>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            style={styles.input}
          />
        </View>

        <View style={styles.btn}>
          <Button loading={loading} onPress={handleFund}>
            Continue
          </Button>
        </View>
      </View>

      <CustomModal
        visible={visible}
        header="Select a card"
        setVisible={setVisible}
      >
        <View style={styles.box}>
          <FlatList
            data={cards}
            renderItem={({ item }) => (
              <CreditCard
                name={firstName.concat(" ", lastName)}
                last4={item.cards.last4}
                bank={item.cards.bank}
                authorization_code={item.cards.authorization_code}
                setSelectedBank={setSelectedBank}
                setVisible={setVisible}
                selectedBank={selectedBank}
              />
            )}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </CustomModal>
      <TransferSuccessModal
        visible={showFeedback}
        setVisible={setShowFeedback}
        message={message}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cards: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 70,
    height: Dimensions.get("screen").height,
    alignItems: "center",
  },
  header: {
    paddingBottom: 40,
    fontSize: 25,
  },
  box: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 70,
  },
  selected: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 0.5,
    marginTop: 30,
    height: 60,
    fontFamily: "PoppinsSemiBold",
    color: colors.black,
    paddingLeft: 20,
  },
  currency: {
    position: "absolute",
    top: 52,
  },
  btn: {
    position: "absolute",
    bottom: 100,
    width: "100%",
  },
});
