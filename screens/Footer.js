// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

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
});

export default Footer;
