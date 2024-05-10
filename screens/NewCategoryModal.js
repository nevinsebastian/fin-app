import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const NewCategoryModal = ({ setModalNewCategoryVisible, handleConfirmAddCategory }) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');

  const handleAddCategory = () => {
    handleConfirmAddCategory(name, budget);
    setName('');
    setBudget('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => setModalNewCategoryVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={(text) => setBudget(text)}
          />
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
            onPress={handleAddCategory}
          >
            <Text style={styles.textStyle}>Add Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
            onPress={() => setModalNewCategoryVisible(false)}
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
    borderRadius: 10
  },
});

export default NewCategoryModal;
