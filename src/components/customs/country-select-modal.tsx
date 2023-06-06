import React from "react";
import { IText } from "../Text";
import { CustomModal } from "../modals/customer-modal";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import states from "../../utils/states.json";

export const SelectStateModal = ({ visible, setVisible, setFieldValue }) => {
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <ScrollView style={styles.container}>
        <IText type="lg" extrastyles={{paddingBottom: 20}}>Select your state</IText>
        {states.map((state, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
                setFieldValue("state", state.name)
                setVisible(false)
            }}
          >
            <IText extrastyles={{paddingBottom: 10}} type="sm">
              {idx + 1}. {state.name}
            </IText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 500,
    paddingBottom: 20
  },
});
