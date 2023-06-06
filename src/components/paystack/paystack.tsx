import React, { useEffect } from "react";
import { Paystack } from "react-native-paystack-webview";
import { useAppSelector, useAppThunkDispatch } from "../../redux/store";
import { getTransactions } from "../../redux/reducers/transactions/thunkAction";
import { getCards } from "../../redux/reducers/transactions/thunkAction";
import { useNavigation } from "@react-navigation/native";

type paymentProps = {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
};

export const Payment = ({ setShowPayment, setVisible }: paymentProps) => {
  const dispatch = useAppThunkDispatch();
  const navigation = useNavigation()
  const {
    user: { email },
  } = useAppSelector(({ authReducer }) => authReducer);

  return (
    <Paystack
      paystackKey="pk_test_a6f6845f6f09ba262dc51bc926945135d09514ff"
      amount={"100"}
      billingEmail={email}
      activityIndicatorColor="green"
      onCancel={(e: any) => {
        // handle response here
        setShowPayment(false);
      }}
      onSuccess={(res: any) => {
        setShowPayment(false);
        dispatch(getTransactions({}));
        dispatch(getCards({}))
        setVisible(false)
        navigation.navigate("Fund account");
      }}
      autoStart={true}
    />
  );
};
