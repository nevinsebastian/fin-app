import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const EditCategoryModal = ({ setModalEditCategoryVisible, budgetData, handleUpdateCategory }) => {
  const [spent, setSpent] = useState('');

  const handleUpdate = () => {
    handleUpdateCategory(budgetData.id, spent);
    setSpent('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => setModalEditCategoryVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Spent Amount"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            value={spent}
            onChangeText={(text) => setSpent(text)}
          />
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
            onPress={handleUpdate}
          >
            <Text style={styles.textStyle}>Update Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
            onPress={() => setModalEditCategoryVisible(false)}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default EditCategoryModal;
