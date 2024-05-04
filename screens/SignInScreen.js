// SignInScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      // Assuming this is the correct endpoint for your login
      const response = await fetch("http://192.168.84.45:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Navigate to the Dashboard screen if login is successful
        navigation.navigate("Dashboard");
      } else {
        // Handle login failure
        Alert.alert("Login failed", "Please check your credentials and try again.");
      }
    } catch (error) {
      // Handle login error
      console.error("Error logging in:", error);
      Alert.alert("Login failed", "Please try again.");
    }
  };

  const handleRegister = () => {
    // Navigate to the Register screen
    navigation.navigate("Register");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#CDE0CB" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#242723" }}>
        Sign In
      </Text>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: '#9BB399', borderWidth: 1, marginBottom: 20, backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 10 }}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{ height: 40, width: '80%', borderColor: '#9BB399', borderWidth: 1, marginBottom: 20, backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 10 }}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleSignIn} style={{ width: '70%', backgroundColor: "#6A0DAD", padding: 15, borderRadius: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, color: '#242723', marginBottom: 10 }}>Don't have an account? <Text style={{ fontSize: 16, color: '#6A0DAD', textDecorationLine: 'underline' }} onPress={handleRegister}>Sign up</Text></Text>
    </View>
  );
};

export default SignInScreen;
