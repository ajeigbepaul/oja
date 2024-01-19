import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import KeyboardAvoidingScreen from "../components/KeyboardAvoidingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { useFormik } from "formik";
import * as Yup from "yup";
import client from "../../api/client";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
const LoginScreen = () => {
  const navigation = useNavigation();
  
  const register = () => {
    navigation.navigate("Register");
  };
  const home = () => {
    navigation.navigate("Main");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      loginUser(values), resetForm();
    },
  });
  const loginUser = async (values) => {
    try {
      const res = await client.post("/auth", {
        ...values,
      });
      console.log(res);
      const token = res?.data?.token;
      console.log("login token",token);
      AsyncStorage.setItem("logintoken", token);
      home();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        Alert.alert("Oops!! something went wrong", error.response.data.message);
      }
      console.log("Could not login", error);
    }
  };
  const forgetpassword = () => {
    console.log("I have forgotten this password");
  };
  return (
    <KeyboardAvoidingScreen>
      <View className="flex-1 items-center justify-center">
        <View>
          <Image
            source={require("../../assets/oja2.jpg")}
            width={200}
            height={200}
          />
        </View>
        <View className="p-4 w-full">
          <View className="w-full items-center flex justify-center">
            <Text className="text-lg font-semibold">LOGIN </Text>
            <Text className="text-gray-600">To your No1 Market</Text>
          </View>
          <View className=" w-full p-4">
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="at" type="font-awesome" color="gray" />
              <TextInput
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                className="flex-1"
                keyboardType="email-address"
              />
              {formik.touched.email && formik.errors.email ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.email}
                </Text>
              ) : null}
            </View>
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="lock-closed-outline" type="ionicon" color="gray" />
              <TextInput
                id="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                secureTextEntry={true}
                className="flex-1"
              />

              {formik.touched.password && formik.errors.password ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.password}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={forgetpassword}
              className="w-full flex items-end"
            >
              <Text className="text-red-300">Forgot password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={formik.handleSubmit}
              className="mt-5 bg-red-400 p-3 rounded-lg"
            >
              <Text className="text-center font-semibold text-white text-lg">
                Login
              </Text>
            </TouchableOpacity>
            <View className="w-full"></View>
            <View className="flex-row space-x-2 justify-center mt-4">
              <Text className="text-gray-500">New to the app?</Text>
              <TouchableOpacity onPress={register}>
                <Text className="font-semibold text-sm text-red-300">
                  Register
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={clearOnboarding}>
            <Text className="font-semibold text-sm text-orange-700">Reset</Text>
          </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
};

export default LoginScreen;
