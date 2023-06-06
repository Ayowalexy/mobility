import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, FlatList } from "react-native";
import { IText } from "../Text";
import { Empty } from "../../utils/images";
import { TransactionCard } from "./Transactionc-card";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import { getTransactions } from "../../redux/reducers/transactions/thunkAction";
import { TransactionsModal } from "../modals/transaction-modal";

export const RecentTransactions = () => {
  const dispatch = useAppThunkDispatch();
  const [visible, setVisible] = useState(false)
  const { transactions } = useAppSelector(
    ({ transactionReducer }) => transactionReducer
  );
  useEffect(() => {
    dispatch(getTransactions({}));
  }, []);

  return (
    <View style={styles.constainer}>
      <IText type="lg">Recent transactions</IText>
      <View style={styles.all}>
        {/* */}

        <FlatList
          data={transactions.slice(0).reverse().slice(0, 5)}
          style={{marginBottom: 100}}
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
          <>
            <Image style={{marginTop: -80}} source={Empty} />
            <IText
              extrastyles={{ textAlign: "center", paddingTop: 10 }}
              type="sm"
            >
              You have not performed any{"\n"} transactions yet
            </IText>
          </>
        )}
        <TransactionsModal visible={visible} setVisible={setVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    paddingTop: 30,
  },
  all: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
