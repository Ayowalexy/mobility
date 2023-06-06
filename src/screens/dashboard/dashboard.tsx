import React, { useEffect } from "react";
import { Header } from "../../components/customs/header";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  BackHandler,
} from "react-native";
import { WalletCard } from "../../components/customs/wallet-card";
import { RecentTransactions } from "../../components/customs/recent-transactions";
import { useRoute } from "@react-navigation/native";

export const Dashboard = ({ navigation, ...others }) => {
  const route = useRoute();
  console.log("others", others);

 
  return (
    <SafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <WalletCard />
        <RecentTransactions />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
