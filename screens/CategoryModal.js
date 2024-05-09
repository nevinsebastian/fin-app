// CategoryModal.js
import React from "react";
import { Modal, Text, TextInput, Button, View, TouchableWithoutFeedback, StyleSheet } from "react-native";

const CategoryModal = ({ modalVisible, setModalVisible, budgetData, setBudgetData, handleConfirmAddCategory }) => {
  const isEditing = !!budgetData.id;

  const handleConfirm = () => {
    if (isEditing) {
      // Update existing category
      handleConfirmAddCategory();
    } else {
      // Add new category
      handleConfirmAddCategory();
    }
  };

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
              <Text style={styles.modalTitle}>{isEditing ? "Edit Category" : "Add Category"}</Text>
              <TextInput
                style={styles.input}
                placeholder="Category Name"
                value={budgetData.name}
                onChangeText={(text) => setBudgetData({ ...budgetData, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Budget"
                keyboardType="numeric"
                value={budgetData.budget}
                onChangeText={(text) => setBudgetData({ ...budgetData, budget: text })}
              />
              <Button title={isEditing ? "Update Category" : "Add Category"} onPress={handleConfirm} />
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

export default CategoryModal;
