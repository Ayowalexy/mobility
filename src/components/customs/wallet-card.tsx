import React, { useState, useEffect } from "react";
import { IText } from "../Text";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { CardBG } from "../../utils/images";
import { BlurView } from "expo-blur";
import { colors } from "../../utils/colors";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { CarddModal } from "../modals/cards-modal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { getCards } from "../../redux/reducers/transactions/thunkAction";
import { formatNumber } from "../../utils/numberFormatter";
import * as Clipboard from "expo-clipboard";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { getUser } from "../../redux/reducers/auth/thunkAction";

export const WalletCard = () => {
  const [show, setShow] = useState<boolean>(false);
  const route = useRoute();
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const [copiedText, setCopiedText] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const {
    user: { accountBalance, accountNumber, accountType },
    loading,
  } = useAppSelector(({ authReducer }) => authReducer);
  const { cards } = useAppSelector(
    ({ transactionReducer }) => transactionReducer
  );

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    if (Platform.OS === "android") {
      ToastAndroid.show("Account number copied", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    dispatch(getCards({}));
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (navigation.getState().index === 0) {
        BackHandler.exitApp();
        return false;
      } else {
        return false;
      }
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  }, [route.name]);

  const refresh = () => {
    dispatch(getUser({}));
  };

  return (
    <View>
      <View style={style.head}>
        <IText type="lg">Account</IText>
        {loading === "pending" ? (
          <ActivityIndicator size="small" color={"#000"} />
        ) : (
          <TouchableOpacity onPress={refresh}>
            <EvilIcons name="refresh" size={25} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>
      <ImageBackground
        blurRadius={10}
        source={CardBG}
        resizeMode="cover"
        style={style.card}
      >
        <View style={style.box}>
          <View>
            <IText type="sm" extrastyles={style.HText}>
              Balance
            </IText>
            <View style={style.flex}>
              <IText type="lg" extrastyles={[style.amount]}>
                {show && "₦"}{" "}
                {show
                  ? accountBalance === 0
                    ? accountBalance
                    : formatNumber(Number(accountBalance)).toString()
                  : "* * * * *"}{" "}
              </IText>
              <TouchableOpacity onPress={() => setShow(!show)}>
                <Ionicons
                  name={show ? "eye-outline" : "eye-off-outline"}
                  color={colors.white}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <IText type="sm" extrastyles={[style.HText, { paddingTop: 15 }]}>
              Account Number
            </IText>
            <View style={[style.flex, { paddingTop: 10 }]}>
              <IText type="sm" extrastyles={[style.HText, { fontSize: 17 }]}>
                {accountNumber}
                {"    "}
              </IText>
              <TouchableOpacity onPress={copyToClipboard}>
                <Ionicons name="copy" color={colors.white} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <IText type="sm" extrastyles={style.HText}>
              Status
            </IText>
            <IText
              type="sm"
              extrastyles={[style.HText, { paddingTop: 10, fontSize: 15 }]}
            >
              Active
            </IText>

            <View style={{ alignItems: "flex-end", marginTop: 15 }}>
              <IText type="sm" extrastyles={style.HText}>
                Type
              </IText>
              <IText
                type="sm"
                extrastyles={[style.HText, { paddingTop: 10, fontSize: 15 }]}
              >
                {accountType}
              </IText>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            if (cards.length) {
              navigation.navigate("Fund account");
            } else {
              setVisible(true);
            }
          }}
        >
          <IText type="sm" extrastyles={{ color: colors.white }}>
            Fund Account
          </IText>
        </TouchableOpacity>
      </ImageBackground>
      <CarddModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    padding: 10,
    paddingBottom: 20,
  },
  HText: {
    color: colors.white,
    fontSize: 13,
  },
  box: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 20,
    color: colors.white,
    paddingTop: 5,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: "100%",
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
