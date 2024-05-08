// BudgetModal.js
import React from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';

const BudgetModal = ({ modalVisible, setModalVisible, budgetData, setBudgetData, handleConfirmSetBudget }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Budget</Text>
              <TextInput
                style={styles.input}
                placeholder="Month"
                keyboardType="numeric"
                value={budgetData.month}
                onChangeText={(text) => setBudgetData({ ...budgetData, month: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Year"
                keyboardType="numeric"
                value={budgetData.year}
                onChangeText={(text) => setBudgetData({ ...budgetData, year: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Budget"
                keyboardType="numeric"
                value={budgetData.budget}
                onChangeText={(text) => setBudgetData({ ...budgetData, budget: text })}
              />
              <Button title="Set Budget" onPress={handleConfirmSetBudget} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#9BB399",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default BudgetModal;
