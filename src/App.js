// In App.js in a new project

import * as React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

//"usuario@testemobile.com","Admin@123"

function HomeScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  function postAxios() {
    if (email === "" || password === "") {
      alert("Field Email/Senha empty. Please insert credencials!");
    } else {
      axios
        .post(`https://entrevista.azurewebsites.net/api/v1/account/login`, {
          email: email,
          password: password
        })
        .then((res) => {
          if (res.status === 200) {
            //console.log(res);
            //console.log(res.data.access_token);
            navigation.navigate("DetailsScreen");
            alert(res.data.access_token);
            console.log(res.data.access_token);
          }
        })
        .catch(function (error) {
          alert(error + "Wrong Email | Password... Try Again");
        });
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TextInput
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        placeholder="   Login"
        style={styles.inputText}
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
      />
      <TextInput
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        secureTextEntry={true}
        placeholder="   Password"
        style={styles.inputText}
        onChangeText={(text) => onChangePassword(text)}
        value={password}
      />

      <Button title="Press to Login" onPress={() => postAxios()} />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Entrou!!! </Text>
      <Button
        title="Leave Session"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  inputText: {
    width: "90%",
    fontSize: 12,
    height: 40,
    backgroundColor: "#aa6100",
    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 3,
    marginBottom: 20
  }
});
