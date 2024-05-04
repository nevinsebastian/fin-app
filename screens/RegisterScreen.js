import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.84.45:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: firstName,
          password: password,
        }),
      });
      if (response.ok) {
        Alert.alert("Registration successful", "You can now sign in.");
        navigation.navigate("SignIn");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      Alert.alert("Registration failed", "Please try again.");
    }
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#CDE0CB" }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, left: 20 }}>
        <Text style={{ fontSize: 18, color: '#6A0DAD', textDecorationLine: 'underline' }}>Back</Text>
      </TouchableOpacity>
      <Text style={{ marginLeft:-225,fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "#242723" }}>
        Register
      </Text>
      <Text style={{marginLeft:-120, fontSize: 14, color: '#6A0DAD', marginBottom: 70}}>Create an account to continue</Text>
      <Text style={{ fontSize: 18, color: '#242723', marginBottom: 5, alignSelf: 'flex-start', marginLeft: '10%',fontWeight: "bold" }}>First Name</Text>
      <TextInput
        style={{ height: 50, width: '80%', borderColor: '#9BB399', borderWidth: 1, marginBottom: 20, backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 10 }}
        placeholder="Enter your name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={{ fontSize: 18, color: '#242723', marginBottom: 5, alignSelf: 'flex-start', marginLeft: '10%' ,fontWeight: "bold"}}>Password</Text>
      <TextInput
        style={{ height: 50, width: '80%', borderColor: '#9BB399', borderWidth: 1, marginBottom: 20, backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 10 }}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleRegister} style={{  width:'70%' ,backgroundColor: "#6A0DAD", padding: 15, borderRadius: 10, marginBottom: 10,marginTop:40 }}>
        <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center' }}>Register</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, color: '#242723', marginBottom: 10 }}>Already have an account? <Text style={{ fontSize: 16, color: '#6A0DAD', textDecorationLine: 'underline' }} onPress={handleSignIn}>Sign in</Text></Text>
    </View>
  );
};

export default RegisterScreen;
