import React from "react";
import { IText } from "../Text";
import { CustomModal } from "../modals/customer-modal";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import states from "../../utils/states.json";

export const SelectLgaModal = ({
  visible,
  setVisible,
  setFieldValue,
  state,
}) => {
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <ScrollView style={styles.container}>
        <IText type="lg" extrastyles={{ paddingBottom: 20 }}>
          Select your local goverment area
        </IText>
        {states
          ?.find((s: any) => s.name === state)
          ?.lgas?.map((lga, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setFieldValue("lga", lga);
                  setVisible(false);
                }}
              >
                <IText extrastyles={{ paddingBottom: 10 }} type="sm">
                  {idx + 1}. {lga}
                </IText>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 500,
    paddingBottom: 20,
  },
});
