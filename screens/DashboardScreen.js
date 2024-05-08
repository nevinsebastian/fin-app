// DashboardScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import Footer from './Footer';
import BudgetModal from './BudgetModal';
import CategoryModal from './CategoryModal';
import ActivityModal from './ActivityModal';

const DashboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [balance, setBalance] = useState(0);
  const [modalBudgetVisible, setModalBudgetVisible] = useState(false);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalActivityVisible, setModalActivityVisible] = useState(false);
  const [budgetData, setBudgetData] = useState({
    month: '',
    year: '',
    budget: '',
    name: '',
  });
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food', budget: 200, remaining_budget: 100 },
    { id: 2, name: 'Transport', budget: 150, remaining_budget: 50 },
    { id: 3, name: 'Entertainment', budget: 100, remaining_budget: 80 },
  ]);
  const [monthlyBudget, setMonthlyBudget] = useState([
    { id: 1, month: 5, year: 2024, budget: 500, balance: 300 },
    { id: 2, month: 4, year: 2024, budget: 600, balance: 450 },
  ]);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleSetBudget = () => {
    setModalBudgetVisible(true);
  };

  const handleConfirmSetBudget = () => {
    setMonthlyBudget([
      ...monthlyBudget,
      {
        id: monthlyBudget.length + 1,
        month: parseInt(budgetData.month),
        year: parseInt(budgetData.year),
        budget: parseFloat(budgetData.budget),
        balance: parseFloat(budgetData.budget),
      },
    ]);
    setModalBudgetVisible(false);
    setBudgetData({
      month: '',
      year: '',
      budget: '',
      name: '',
    });
  };

  const handleCategoryPress = (category) => {
    setBudgetData({ ...category });
    setModalCategoryVisible(true);
  };

  const handleAddCategory = () => {
    setBudgetData({
      name: '',
      budget: '',
    });
    setModalCategoryVisible(true);
  };

  const handleConfirmAddCategory = () => {
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        name: budgetData.name,
        budget: parseFloat(budgetData.budget),
        remaining_budget: parseFloat(budgetData.budget),
      },
    ]);
    setModalCategoryVisible(false);
    setBudgetData({
      name: '',
      budget: '',
    });
  };

  const handleActivityPress = () => {
    setModalActivityVisible(true);
  };

  const handleConfirmAddActivity = () => {
    // Add activity functionality here
    setModalActivityVisible(false);
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <View style={styles.todaySection}>
          <Text style={styles.todayText}>Today</Text>
          <Text style={styles.todayExpenseText}>${balance}</Text>
        </View>
        <Button title="Set Budget" onPress={handleSetBudget} />
      </View>
      <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} style={[styles.monthlyBudgetContainer, {marginBottom:0}]}>
        {monthlyBudget.map((budget, index) => (
          <View key={index} style={styles.monthlyBudgetCard}>
            <Text style={styles.month}>Month: {moment().month(budget.month - 1).format('MMMM')}</Text>
            <Text style={styles.month}>Year: {budget.year}</Text>
            <Text style={styles.monthExpense}>Budget: ${budget.budget}</Text>
            <Text style={styles.monthExpense}>Balance: ${budget.balance}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
        <Text style={styles.categoryHeading}>Categories</Text>
        <TouchableOpacity onPress={handleAddCategory}>
          <Icon name="plus" size={20} color="#6A0DAD" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.bottomSection} horizontal={true}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)} style={styles.categoryCard}>
            <Text style={styles.month}>{category.name}</Text>
            <Text style={styles.monthExpense}>Budget: ${category.budget}</Text>
            <Text style={styles.monthExpense}>Remaining: ${category.remaining_budget}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer selectedTab={selectedTab} handleTabPress={handleTabPress} />
      <BudgetModal
        modalVisible={modalBudgetVisible}
        setModalVisible={setModalBudgetVisible}
        budgetData={budgetData}
        setBudgetData={setBudgetData}
        handleConfirmSetBudget={handleConfirmSetBudget}
      />
      <CategoryModal
        modalVisible={modalCategoryVisible}
        setModalVisible={setModalCategoryVisible}
        budgetData={budgetData}
        setBudgetData={setBudgetData}
        handleConfirmAddCategory={handleConfirmAddCategory}
      />
      <ActivityModal
        modalVisible={modalActivityVisible}
        setModalVisible={setModalActivityVisible}
        handleConfirmAddActivity={handleConfirmAddActivity}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryHeading:{
    fontWeight:"bold",
    fontSize:18,
    marginBottom:5,
    color:"#6A0DAD",
    marginLeft: 20,
  },
  topSection: {
    backgroundColor: "#6A0DAD",
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomSection: {
    backgroundColor: "#FFF",
    paddingVertical: 30,
    flexDirection: "row",
  },
  todaySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayText: {
    color: "#FFF",
    fontSize: 20,
    marginRight: 10,
  },
  todayExpenseText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    height:160,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
  monthlyBudgetContainer: {
    marginTop: 20,
  },
  monthlyBudgetCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    height: 200,
    width: 400,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
  },
  month: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  monthExpense: {
    fontSize: 14,
    color: "#6A0DAD",
  },
});

export default DashboardScreen;
