import React, { useState } from "react";
import { IText } from "../../components/Text";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Image,
} from "react-native";
import { useAppSelector } from "../../redux/store";
import { Empty } from "../../utils/images";
import { TransactionsModal } from "../../components/modals/transaction-modal";
import { TransactionCard } from "../../components/customs/Transactionc-card";

export const Transactions = () => {
  const [visible, setVisible] = useState(false);
  const { transactions } = useAppSelector(
    ({ transactionReducer }) => transactionReducer
  );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IText type="lg" extrastyles={styles.header}>
          Transactions
        </IText>
        <ScrollView style={{ marginTop: 30, width: transactions.length ? '115%' : "100%" }}>
          <FlatList
            data={transactions}
            style={{ marginBottom: 100 }}
            renderItem={({ item }) => (
              <TransactionCard
                name={item.name}
                status={item.type}
                setVisible={setVisible}
                date={new Date(item.createdAt).toLocaleDateString()}
                amount={item.amount}
                _id={item._id}
              />
            )}
            keyExtractor={(item: any) => item._id}
          />

          {!Boolean(transactions.length) && (
            <View style={{alignItems: 'center'}}>
              <Image style={{ marginTop: -80 }} source={Empty} />
              <IText
                extrastyles={{ textAlign: "center", paddingTop: 10 }}
                type="sm"
              >
                You have not performed any{"\n"} transactions yet
              </IText>
            </View>
          )}
          <TransactionsModal visible={visible} setVisible={setVisible} />
        </ScrollView>
      </View>
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
});
