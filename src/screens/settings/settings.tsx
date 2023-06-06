import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Share,
  Platform,
  Linking,
} from "react-native";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SettingsDataProps } from "../../components/types";
import { useAppSelector } from "../../redux/store";
import { SupportModal } from "../../components/customs/support-modal";

export const Settings = ({ navigation }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const data: SettingsDataProps[] = [
    {
      header: "Refer & Earn",
      text: "Invite your friend and get a bonus",
      icon: "gift",
    },
    {
      header: "Help Center",
      text: "Have any issues? Speak to our team",
      icon: "headset",
    },
    {
      header: "Transactions",
      icon: "star-half",
      screen: "Transactions",
    },
    {
      header: "Update Password",
      icon: "keypad",
      screen: "Update password",
    },
    {
      header: "Logout",
      icon: "log-out",
      screen: "Login",
    },
  ];

  const {
    user: { firstName, lastName, email, referral_code },
  } = useAppSelector(({ authReducer }) => authReducer);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Use my referral code ${referral_code} to sign up  to LAAR `,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <IText type="lg" extrastyles={styles.header}>
            Settings
          </IText>

          <View style={styles.profile_head}>
            <View style={styles.box}>
              <IText type="lg" extrastyles={styles.text}>
                {firstName.charAt(0)}
              </IText>
            </View>
            <IText type="lg" extrastyles={styles.name}>
              {firstName} {lastName}
            </IText>
            <IText type="sm" extrastyles={styles.email}>
              @{email}
            </IText>

            <TouchableOpacity style={styles.edit_btn}>
              <IText type="sm">{referral_code}</IText>
            </TouchableOpacity>
          </View>
          <SupportModal visible={visible} setVisible={setVisible} />
          <View style={styles.actions}>
            {data.map((element, idx) => (
              <TouchableOpacity
                onPress={() => {
                  if (element.header === "Refer & Earn") {
                    onShare();
                  } else if (element.header === "Help Center") {
                    // call();
                    setVisible(true)
                  } else {
                    navigation.navigate(element.screen);
                  }
                }}
                key={idx}
                style={styles.card}
              >
                <View style={styles.icon_bg}>
                  <Ionicons
                    name={element.icon}
                    color={colors.black}
                    size={20}
                  />
                </View>
                <View style={{ width: "70%" }}>
                  <IText type="lg">{element.header}</IText>
                  <IText type="sm" extrastyles={{ fontSize: 12 }}>
                    {element.text}
                  </IText>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color={colors.black}
                  size={25}
                />
              </TouchableOpacity>
            ))}
          </View>
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
    fontSize: 30,
    marginBottom: 30,
  },
  profile_head: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "blue",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 40,
  },
  name: {
    fontSize: 17,
    paddingTop: 10,
  },
  email: {
    fontFamily: "PoppinsExtraLight",
    fontSize: 12,
  },
  edit_btn: {
    width: 130,
    height: 50,
    backgroundColor: colors.edit_btn,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 15,
  },
  actions: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 40,
  },
  icon_bg: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 50,
  },
  card: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
});
