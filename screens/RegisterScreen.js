import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BarChart } from "react-native-svg-charts";

const data = [
  {
    key: 1,
    amount: 3000,
    svg: { fill: "#FF5733" },
    name: "Groceries",
  },
  {
    key: 2,
    amount: 0,
    svg: { fill: "#33FF99" },
    name: "Fuel",
  },
  {
    key: 3,
    amount: 0,
    svg: { fill: "#3366FF" },
    name: "Bills",
  },
  {
    key: 4,
    amount: 0,
    svg: { fill: "#FF33FF" },
    name: "Travel",
  },
  {
    key: 5,
    amount: 0,
    svg: { fill: "#FFFF33" },
    name: "Apparel",
  },
  {
    key: 6,
    amount: 0,
    svg: { fill: "#33FFFF" },
    name: "Utilities",
  },
  {
    key: 7,
    amount: 0,
    svg: { fill: "#AABBCC" },
    name: "Other",
  },
];

const DashboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <View style={styles.todaySection}>
          <Text style={styles.todayText}>Today</Text>
          <Text style={styles.todayExpenseText}>$100</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.monthlyCostTitle}>Monthly Cost</Text>
        <View style={styles.monthlyCostCard}>
          <Text style={styles.month}>July</Text>
          <Text style={styles.monthExpense}>$500</Text>
        </View>
        <Text style={styles.topSpendingTitle}>Top Spending</Text>
        <View style={styles.categories}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryCard name="Groceries" icon="shopping-cart" amount={3000} />
            <CategoryCard name="Fuel" icon="gas-pump" amount={0} />
            <CategoryCard name="Bills" icon="file-invoice-dollar" amount={0} />
            <CategoryCard name="Travel" icon="plane" amount={0} />
            <CategoryCard name="Apparel" icon="tshirt" amount={0} />
            <CategoryCard name="Utilities" icon="plug" amount={0} />
            <CategoryCard name="Other" icon="ellipsis-h" amount={0} />
          </ScrollView>
        </View>
        {selectedTab === "chart" && <ChartCard data={data} />}
        <Text style={styles.monthlyBudgetTitle}>Monthly Budget</Text>
        <View style={styles.budgetCards}>
          <BudgetCard name="Groceries" icon="shopping-cart" budget={3000} spent={2000} />
          <BudgetCard name="Fuel" icon="gas-pump" budget={500} spent={200} />
          <BudgetCard name="Bills" icon="file-invoice-dollar" budget={1000} spent={300} />
          <BudgetCard name="Travel" icon="plane" budget={800} spent={400} />
          <BudgetCard name="Apparel" icon="tshirt" budget={600} spent={150} />
          <BudgetCard name="Utilities" icon="plug" budget={400} spent={200} />
          <BudgetCard name="Other" icon="ellipsis-h" budget={300} spent={100} />
        </View>
        <Footer selectedTab={selectedTab} handleTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const CategoryCard = ({ name, icon, amount }) => {
  return (
    <View style={styles.category}>
      <Icon name={icon} size={30} color="#6A0DAD" />
      <Text style={styles.categoryText}>{name}</Text>
      <Text style={styles.categoryAmount}>${amount}</Text>
    </View>
  );
};

const BudgetCard = ({ name, icon, budget, spent }) => {
  const budgetLeft = budget - spent;
  const budgetPercentage = (spent / budget) * 100;
  return (
    <View style={styles.budgetCard}>
      <View style={styles.budgetHeader}>
        <Icon name={icon} size={24} color="#6A0DAD" />
        <Text style={styles.budgetHeaderText}>{name}</Text>
      </View>
      <Text style={styles.budgetAmount}>${budgetLeft} / ${budget}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${budgetPercentage}%` }]} />
      </View>
    </View>
  );
};

const ChartCard = ({ data }) => {
  const pieData = data.map((item) => ({
    key: item.key,
    value: item.amount,
    svg: item.svg,
    arc: { outerRadius: "80%", padAngle: 0.02 },
  }));

  return (
    <View style={styles.chartCard}>
      <PieChart style={{ height: 200 }} data={pieData} />
      <View style={styles.categoryList}>
        {data.map((item) => (
          <View key={item.key} style={styles.categoryItem}>
            <View style={[styles.categoryColor, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryAmount}>${item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Footer = ({ selectedTab, handleTabPress }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handleTabPress("home")} style={[styles.tab, selectedTab === "home" && styles.selectedTab]}>
        <Icon name="home" size={24} color={selectedTab === "home" ? "#6A0DAD" : "#000"} />
        <Text style={[styles.tabText, selectedTab === "home" && styles.selectedTabText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress("chart")} style={[styles.tab, selectedTab === "chart" && styles.selectedTab]}>
        <Icon name="bar-chart" size={24} color={selectedTab === "chart" ? "#6A0DAD" : "#000"} />
        <Text style={[styles.tabText, selectedTab === "chart" && styles.selectedTabText]}>Chart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: "#6A0DAD",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  todaySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayText: {
    color: "#FFF",
    fontSize: 18,
    marginRight: 10,
  },
  todayExpenseText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  monthlyCostTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  monthlyCostCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
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
    fontSize: 24,
    color: "#333",
    marginBottom: 5,
  },
  monthExpense: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  topSpendingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categories: {
    flexDirection: "row",
    marginTop: 40,
  },
  category: {
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "#6A0DAD",
    marginTop: 5,
  },
  categoryAmount: {
    color: "#333",
    marginTop: 2,
    fontWeight: "bold",
  },
  monthlyBudgetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    color: "#333",
  },
  budgetCards: {
    flexDirection: "row",
    marginTop: 10,
  },
  budgetCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  budgetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  budgetHeaderText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  budgetAmount: {
    fontSize: 14,
    color: "#6A0DAD",
    marginBottom: 5,
  },
  progressBar: {
    backgroundColor: "#F2F2F2",
    height: 10,
    width: "100%",
    borderRadius: 5,
  },
  progress: {
    backgroundColor: "#6A0DAD",
    height: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    marginTop: 2,
  },
  selectedTab: {
    backgroundColor: "#E6D4FF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  selectedTabText: {
    color: "#6A0DAD",
  },
  chartCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryName: {
    flex: 1,
    color: "#333",
  },
});

export default DashboardScreen;
