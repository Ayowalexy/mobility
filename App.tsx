import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, BackHandler, Alert } from "react-native";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./src/redux/store";
import { TransactionContextProvider } from "./src/components/context/transactionReducer";
import { AuthContextProvider } from "./src/components/context/authContext";
import { useEffect } from "react";


//main navigation
import { Main } from "./src/navigator/main";

export default function App() {
  const [loaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TransactionContextProvider>
      <AuthContextProvider>
        <Provider store={store}>
          <Main />
          <Toast />
        </Provider>
      </AuthContextProvider>
    </TransactionContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
