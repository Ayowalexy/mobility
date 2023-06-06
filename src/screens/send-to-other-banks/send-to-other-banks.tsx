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
  resolveOtherBanks,
  sendMoneyToOtherBanks,
} from "../../redux/reducers/transfer/thunkAction";
import { colors } from "../../utils/colors";
import { Preloader } from "../../components/customs/modal";
import { formatNumber, unFormatNumber } from "../../utils/numberFormatter";
import { Button } from "../../components/Button";
import { InsufficientBalanceModal } from "../../components/lotties/insufficient-balance-lottie";
import { IUserBanks } from "../../components/types";

const validationSchema = Yup.object().shape({
  account_number: Yup.string().required("Account number is required"),
  amount: Yup.string().required("Amount is required"),
  code: Yup.string().required("Select a bank"),
  bank_name: Yup.string(),
});

export const SendToOtherBanks = () => {
  const [showAllBanksModal, setShowAllBanksModal] = useState(false);
  const [text, setText] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const [resolvedbank, setResolvedBank] = useState<IUserBanks | any>({
    account_name: "",
    account_number: "",
    bank_id: 0,
  });
  const dispatch = useAppThunkDispatch();
  const { loading, allBanks, isResolving } = useAppSelector(
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
      code: "",
      bank_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      delete values.bank_name;
      const data = {
        ...values,
        amount: unFormatNumber(values.amount),
        name: resolvedbank.account_name,
      };
      await dispatch(sendMoneyToOtherBanks(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
        } else if (res?.payload === "insufficient balance") {
          setShowError(true);
        }
      });
    },
  });

  useEffect(() => {
    dispatch(getAllBanks({}));
  }, []);

  useEffect(() => {
    if (values.account_number.length === 10) {
      const data: IUserBanks = {
        account_number: values.account_number,
        code: values.code,
      };
      handleResolve(data)
    }
  }, [values.account_number]);

  const handleResolve = async (data: IUserBanks) => {
    await dispatch(resolveOtherBanks(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setResolvedBank(res.payload)
      }else {
        console.log(res.payload)
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <IText extrastyles={styles.header_text} type="lg">
            Send money
          </IText>

          <View style={styles.form}>
            <TouchableOpacity
              style={styles.selected}
              onPress={() => setShowAllBanksModal(true)}
            >
              {values.bank_name ? (
                <>
                  <IText type="sm">{values.bank_name}</IText>
                </>
              ) : (
                <IText type="sm">Select a bank</IText>
              )}
            </TouchableOpacity>

            <ITextInput
              onChange={handleChange("account_number")}
              onBlur={handleBlur("account_number")}
              err={!!errors.account_number && touched.account_number}
              errMsg={errors.account_number}
              otherProps={{
                placeholder: 'Enter account number'
              }}
            />

            {resolvedbank.account_name && resolvedbank.account_number && (
              <>
                <TouchableOpacity
                  style={[styles.selected, { marginTop: 35 }]}
                  onPress={() => setShowAllBanksModal(true)}
                >
                  <IText type="sm">{resolvedbank.account_name}</IText>
                </TouchableOpacity>

                <ITextInput
                  type="currency"
                  value={formatNumber(values.amount)}
                  onChange={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  err={!!errors.amount && touched.amount}
                  errMsg={errors.amount}
                />
              </>
            )}
          </View>

          <CustomModal
            visible={showAllBanksModal}
            header="Select a bank"
            setVisible={setShowAllBanksModal}
          >
            <View style={styles.box}>
              {loading === "pending" && (
                <ActivityIndicator size={25} color={colors.primary} />
              )}
              <ITextInput
                value={text}
                onChange={setText}
                otherProps={{ placeholder: "Search bank" }}
              />
              <FlatList
                data={allBanks.filter((ele) =>
                  ele.name.toLowerCase().includes(text.toLowerCase())
                )}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setFieldValue("code", item.code);
                      setFieldValue("bank_name", item.name);
                      setShowAllBanksModal(false);
                    }}
                    style={styles.bx}
                  >
                    <IText type="sm">
                      {index + 1}.{"  "}
                      {item.name}
                    </IText>
                  </TouchableOpacity>
                )}
                keyExtractor={(item: any) => item._id}
              />
            </View>
          </CustomModal>
          {isResolving === "pending" && <Preloader />}
          <InsufficientBalanceModal
            visible={showError}
            setVisible={setShowError}
          />
          <View style={styles.btn}>
            <Button loading={loading} onPress={() => handleSubmit()}>Send</Button>
          </View>
        </View>
      </ScrollView>
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
    position: "absolute",
    bottom: 100,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    display: "flex",
    padding: 20,
  },
});
