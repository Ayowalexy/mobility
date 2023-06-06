import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Onboading } from "../screens/onboading/onboading";
import { SignUp } from "../screens/auth/signup";
import { Login } from "../screens/auth/login";
import { SignupSuccess } from "../screens/auth/signup_success";
import { VerifyOtp } from "../screens/auth/otp";
import { OTPSuccess } from "../screens/auth/otp_success";
import { ChooseAccountType } from "../screens/auth/choose-account-type";
import { Dashboard } from "../screens/dashboard/dashboard";
import { BottomTabs } from "./bottom-tabs";
import { FundAccount } from "../screens/fund-acct/fund-account";
import { DriverSignUp } from "../screens/auth/signup-driver";
import { VerifyPhoneOtp } from "../screens/auth/verify-phone";
import { SendToOtherBanks } from "../screens/send-to-other-banks/send-to-other-banks";
import { SendToIntraBanks } from "../screens/send-to-intra-banks/send-to-intra-banks";
import { RedeemPoints } from "../screens/redeem-points/redeem-points";
import { Transactions } from "../screens/transactions/transactions";
import { UpdatePassword } from "../screens/update-password/update-password";
import { ForgotPassword } from "../screens/auth/forgot-password";
import { SetNewPassword } from "../screens/auth/set-new-password";

const StackNavigator = createStackNavigator();

export const Stacks = () => (
  <StackNavigator.Navigator
    initialRouteName="Onboading"
    screenOptions={{ headerShown: false }}
  >
   
    <StackNavigator.Screen name="Onboading" component={Onboading} />
    <StackNavigator.Screen name="Sign Up" component={SignUp} />
    <StackNavigator.Screen name="Driver Sign up" component={DriverSignUp} />
    <StackNavigator.Screen name="Login" component={Login} />
    <StackNavigator.Screen name="Forgot password" component={ForgotPassword} />
    <StackNavigator.Screen name="Set new password" component={SetNewPassword} />
    <StackNavigator.Screen
      name="Choose Account type"
      component={ChooseAccountType}
    />
    <StackNavigator.Screen name="Sign up success" component={SignupSuccess} />
    <StackNavigator.Screen name="Verify OTP" component={VerifyOtp} />
    <StackNavigator.Screen name="Verify phone" component={VerifyPhoneOtp} />
    <StackNavigator.Screen name="OTP Success" component={OTPSuccess} />
    <StackNavigator.Screen name="Tabs" component={BottomTabs} />
    <StackNavigator.Screen name="Fund account" component={FundAccount} />
    
    <StackNavigator.Group>
      <StackNavigator.Screen
        name="Send to other banks"
        component={SendToOtherBanks}
      />
      <StackNavigator.Screen
        name="Send to intra banks"
        component={SendToIntraBanks}
      />
      <StackNavigator.Screen name="Redeem points" component={RedeemPoints} />
      <StackNavigator.Screen name="Transactions" component={Transactions} />
      <StackNavigator.Screen
        name="Update password"
        component={UpdatePassword}
      />
    </StackNavigator.Group>
  </StackNavigator.Navigator>
);
