import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const EditCategoryScreen = ({ route, navigation }) => {
  const { categories, categoryIndex } = route.params;
  const [editedCategory, setEditedCategory] = useState(categories[categoryIndex]);

  const handleSave = () => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex] = editedCategory;
    route.params.onSave(updatedCategories);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Name:</Text>
      <TextInput
        style={styles.input}
        value={editedCategory.name}
        onChangeText={(text) => setEditedCategory({ ...editedCategory, name: text })}
      />
      <Text style={styles.label}>Budget:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={editedCategory.budget.toString()}
        onChangeText={(text) => {
          if (!isNaN(text)) {
            setEditedCategory({ ...editedCategory, budget: parseFloat(text) });
          }
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6A0DAD",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditCategoryScreen;
