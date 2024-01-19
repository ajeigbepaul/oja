import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppNavigation from "./AppNavigation";
import ProductInfoScreen from "../components/ProductInfoScreen";
import AddressScreen from "../screens/AddressScreen";
import AddAddress from "../screens/AddAddress";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import BillingScreen from "../screens/BillingScreen";
import ProductUploadScreen from "../screens/ProductUploadScreen";
const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main"
        component={AppNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Info"
        component={ProductInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Billing"
        component={BillingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductUpload"
        component={ProductUploadScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
