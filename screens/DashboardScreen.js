import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, TouchableOpacity, Modal, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import Footer from './Footer';
import BudgetModal from './BudgetModal';
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
    { id: 1, name: 'Food', budget: 200, remaining_budget: 100, color: '#FF6347' },
    { id: 2, name: 'Transport', budget: 150, remaining_budget: 50, color: '#4682B4' },
    { id: 3, name: 'Entertainment', budget: 100, remaining_budget: 80, color: '#32CD32' },
  ]);
  const [monthlyBudget, setMonthlyBudget] = useState([
    { id: 1, month: 5, year: 2024, budget: 500, balance: 300 },
    { id: 2, month: 4, year: 2024, budget: 600, balance: 450 },
  ]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Calculate spent amount for each category
    const spentAmounts = categories.map((category) => {
      const spent = monthlyBudget.reduce((acc, budget) => {
        return acc + (budget.month === parseInt(moment().format("M")) && budget.year === parseInt(moment().format("YYYY")) ? budget.balance : 0);
      }, 0);
      return spent;
    });

    // Update Pie Chart data
    const data = categories.map((category, index) => ({
      name: category.name,
      budget: spentAmounts[index],
      color: category.color,
    }));
    setPieChartData(data);
  }, [categories, monthlyBudget]);

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

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((item) => {
      if (item.id === budgetData.id) {
        const spentAmount = parseFloat(budgetData.budget);
        const remainingBudget = item.remaining_budget - spentAmount;
        return { ...item, remaining_budget: remainingBudget };
      }
      return item;
    });

    setCategories(updatedCategories);

    // Update monthlyBudget with the new spent amount
    const updatedMonthlyBudget = monthlyBudget.map((budget) => {
      if (budget.id === budgetData.id) {
        return { ...budget, balance: parseFloat(budgetData.budget) };
      }
      return budget;
    });
    setMonthlyBudget(updatedMonthlyBudget);

    setModalCategoryVisible(false);
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
        color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6), // Random color
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
      <ScrollView>
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
        <ScrollView style={styles.bottomSection} showsVerticalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)} style={styles.categoryCard}>
              <View style={{ backgroundColor: category.color, borderRadius: 100, padding: 10 }}>
                <Icon name="circle" size={24} color="#FFF" />
              </View>
              <View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryBudget}>Budget: ${category.budget}</Text>
                <Text style={styles.categoryBudget}>Remaining: ${category.remaining_budget}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.chartContainer}>
          <ChartDashboard categories={categories} pieChartData={pieChartData} />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBudgetVisible}
        onRequestClose={() => setModalBudgetVisible(false)}
      >
        <BudgetModal
          setModalBudgetVisible={setModalBudgetVisible}
          budgetData={budgetData}
          setBudgetData={setBudgetData}
          handleConfirmSetBudget={handleConfirmSetBudget}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCategoryVisible}
        onRequestClose={() => setModalCategoryVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Spent Amount"
              keyboardType="numeric"
              value={budgetData.budget}
              onChangeText={(text) => setBudgetData({ ...budgetData, budget: text })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
                onPress={handleUpdateCategory}
              >
                <Text style={styles.textStyle}>Update Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#6A0DAD" }}
                onPress={() => setModalCategoryVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalActivityVisible}
        onRequestClose={() => setModalActivityVisible(false)}
      >
        <ActivityModal
          setModalActivityVisible={setModalActivityVisible}
          handleConfirmAddActivity={handleConfirmAddActivity}
        />
      </Modal>
      <Footer selectedTab={selectedTab} handleTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const ChartDashboard = ({ categories, pieChartData }) => {
  const chartConfig = {
    backgroundGradientFrom: 'rgba(255, 255, 255, 0.7)',
    backgroundGradientTo: 'rgba(255, 255, 255, 0.7)',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View style={styles.chart}>
      <PieChart
        data={pieChartData}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="budget"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  todaySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  todayText: {
    fontSize: 18,
    color: '#FFF',
  },
  todayExpenseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  monthlyBudgetContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  monthlyBudgetCard: {
    backgroundColor: '#FFF',
    width: 300,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
  },
  month: {
    fontSize: 16,
    marginBottom: 10,
  },
  monthExpense: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  chart: {
    backgroundColor: 'transparent', // Remove background color to avoid overlay
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bottomSection: {
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#6A0DAD',
  },
  categoryBudget: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
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
    elevation: 2
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

export default DashboardScreen;
