import { NavigationContainer } from "@react-navigation/native";
import { Login_Register, Routes } from "./src/pages/routes";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          component={Routes}
          options={{ headerShown: false }}
        ></RootStack.Screen>
        <RootStack.Screen
          name="Login"
          component={Login_Register}
          options={{ headerShown: false }}
        ></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
