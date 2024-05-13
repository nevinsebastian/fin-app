import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmiModal = ({ setModalEmiVisible, handleConfirmAddEmi }) => {
  const [emiData, setEmiData] = useState({
    date: '',
    amount: '',
    heading: '',
  });

  const handleConfirmEmi = () => {
    if (emiData.date && emiData.amount && emiData.heading) {
      handleConfirmAddEmi(emiData);
      setEmiData({
        date: '',
        amount: '',
        heading: '',
      });
      setModalEmiVisible(false);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalEmiVisible(false)}>
        <Icon name="times" size={24} color="#666" />
      </TouchableOpacity>
      <Text style={styles.heading}>Add EMI/Loan</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMI/Loan Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Date (MM/DD/YYYY)"
          value={emiData.date}
          onChangeText={(text) => setEmiData({ ...emiData, date: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMI/Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={emiData.amount}
          onChangeText={(text) => setEmiData({ ...emiData, amount: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMI/Loan Heading</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Heading"
          value={emiData.heading}
          onChangeText={(text) => setEmiData({ ...emiData, heading: text })}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleConfirmEmi}>
        <Text style={styles.addButtonText}>Add EMI/Loan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
    paddingVertical: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmiModal;
