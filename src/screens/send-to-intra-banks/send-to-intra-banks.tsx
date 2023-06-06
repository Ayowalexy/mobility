import React, { useState, useEffect } from "react";
import { IText } from "../../components/Text";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ITextInput } from "../../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { CustomModal } from "../../components/modals/customer-modal";
import {
  getAllBanks,
  resolveIntraBanks,
  sendMoneyIntraBanks,
} from "../../redux/reducers/transfer/thunkAction";
import { getUser } from "../../redux/reducers/auth/thunkAction";
import { colors } from "../../utils/colors";
import { Preloader } from "../../components/customs/modal";
import { formatNumber, unFormatNumber } from "../../utils/numberFormatter";
import { Button } from "../../components/Button";
import { InsufficientBalanceModal } from "../../components/lotties/insufficient-balance-lottie";
import { IUserBanks } from "../../components/types";
import { TransferSuccessModal } from "../../components/lotties/transfer-success";
import { getTransactions } from "../../redux/reducers/transactions/thunkAction";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const validationSchema = Yup.object().shape({
  account_number: Yup.string().required("Account number is required"),
  amount: Yup.string().required("Amount is required"),
});

export const SendToIntraBanks = () => {
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState("");
  const [resolvedbank, setResolvedBank] = useState<IUserBanks | any>({
    account_name: "",
    account_number: "",
    bank_id: 0,
  });
  const [isPaymentForRide, setIsPaymentForRide] = useState(false);
  const dispatch = useAppThunkDispatch();
  const { loading, isResolving } = useAppSelector(
    ({ transferReducer }) => transferReducer
  );
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      account_number: "",
      amount: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        accountNumber: values.account_number,
        amount: unFormatNumber(values.amount),
      };
      await dispatch(sendMoneyIntraBanks(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setMessage(res.payload);
          setShowFeedback(true);
          dispatch(getUser({}));
          dispatch(getTransactions({}));
        } else if (res?.payload === "insufficient balance") {
          setShowError(true);
        }
      });
    },
  });

  useEffect(() => {
    if (values.account_number.length === 10) {
      const data: IUserBanks = {
        account_number: values.account_number,
      };
      handleResolve(data);
    }
  }, [values.account_number]);

  const handleResolve = async (data: IUserBanks) => {
    await dispatch(resolveIntraBanks(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setResolvedBank(res.payload);
      } else {
      }
    });
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <IText extrastyles={styles.header_text} type="lg">
            Send money
          </IText>

          <View style={styles.form}>
            <ITextInput
              onChange={handleChange("account_number")}
              onBlur={handleBlur("account_number")}
              err={!!errors.account_number && touched.account_number}
              errMsg={errors.account_number}
              otherProps={{
                placeholder: "Enter account number",
                keyboardType: "number-pad",
              }}
            />

            {resolvedbank.account_name && resolvedbank.account_number && (
              <>
                <TouchableOpacity style={[styles.selected, { marginTop: 35 }]}>
                  <IText type="sm" extrastyles={{ textTransform: "uppercase" }}>
                    {resolvedbank.account_name}
                  </IText>
                </TouchableOpacity>

                <ITextInput
                  type="currency"
                  value={formatNumber(values.amount)}
                  onChange={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  err={!!errors.amount && touched.amount}
                  errMsg={errors.amount}
                />
                <IText type="sm" extrastyles={{ paddingTop: 30 }}>
                  Is this payment for a ride?
                </IText>
                <View style={styles.action}>
                  <TouchableOpacity
                    onPress={() => setIsPaymentForRide(true)}
                    style={[
                      styles.action_box,
                      isPaymentForRide && styles.active,
                    ]}
                  >
                    <IText type="sm">Yes</IText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsPaymentForRide(false)}
                    style={[
                      styles.action_box,
                      !isPaymentForRide && styles.active,
                      { marginLeft: 10 },
                    ]}
                  >
                    <IText type="sm">No</IText>
                  </TouchableOpacity>
                </View>
                {isPaymentForRide && (
                  <>
                    <ITextInput
                      value={moveFrom}
                      onChange={setMoveFrom}
                      otherProps={{
                        placeholder: "Moved from?",
                      }}
                    />
                    <ITextInput
                      value={moveTo}
                      onChange={setMoveTo}
                      otherProps={{
                        placeholder: "Moved to?",
                      }}
                    />
                  </>
                )}
              </>
            )}
          </View>
          {isResolving === "pending" && <Preloader />}
          <TransferSuccessModal
            visible={showFeedback}
            setVisible={setShowFeedback}
            message={message}
          />

          <InsufficientBalanceModal
            visible={showError}
            setVisible={setShowError}
          />
          <View style={styles.btn}>
            <Button loading={loading} onPress={() => handleSubmit()}>
              Send
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: Dimensions.get("window").height,
  },
  header_text: {
    fontSize: 20,
  },
  selected: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  form: {
    paddingTop: 40,
  },
  box: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 70,
    height: 500,
  },
  bx: {
    marginTop: 15,
  },
  btn: {
    // position: "absolute",
    // bottom: 100,
    // width: Dimensions.get("window").width,
    justifyContent: "center",
    display: "flex",
    padding: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
  },
  action_box: {
    width: 100,
    height: 55,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.8,
  },
  active: {
    backgroundColor: colors.primary,
  },
  textInput: {
    flex: 2,
    padding: 14,
    fontSize: 14,
    color: "#767676",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    height: 50,
  },
  container_: {
    flex: 1,
  },
});
