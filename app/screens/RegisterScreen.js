import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import KeyboardAvoidingScreen from "../components/KeyboardAvoidingScreen";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Icon } from "@rneui/base";
import client from "../../api/client";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const login = () => {
    navigation.navigate("Login");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      fullname: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      registerUser(values);
      resetForm();
    },
  });
  const registerUser = async (values) => {
    try {
      const res = await client.post("/register", {
        ...values,
      });
      console.log(res);
      Alert.alert(
        "Registration successfull",
        "You have registered successfully"
      );
    } catch (error) {
      Alert.alert(
        "Registration failed",
        "Your registration was not successfull"
      );
      console.log("Could not register", error);
    }
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
            <Text className="text-lg font-semibold">REGISTER </Text>
            <Text className="text-gray-600">To your No1 Market</Text>
          </View>
          <View className=" w-full p-4">
            <View className="flex-row space-x-2 border-b border-gray-100 py-2 flex items-center">
              <Icon name="user" type="font-awesome" color="gray" />
              <TextInput
                id="fullname"
                name="fullname"
                placeholder="Fullname here"
                value={formik.values.fullname}
                onChangeText={formik.handleChange("fullname")}
                onBlur={formik.handleBlur("fullname")}
                className="flex-1"
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <Text className="text-xs text-red-300 text-center">
                  {formik.errors.fullname}
                </Text>
              ) : null}
            </View>
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
              onPress={formik.handleSubmit}
              className="mt-5 bg-red-400 p-3 rounded-lg"
            >
              <Text className="text-center font-semibold text-white text-lg">
                Register
              </Text>
            </TouchableOpacity>
            <View className="w-full"></View>
            <View className="flex-row space-x-2 justify-center mt-4">
              <Text className="text-gray-500">Already have an account?</Text>
              <TouchableOpacity onPress={login}>
                <Text className="font-semibold text-sm text-red-300">
                  Login
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

export default RegisterScreen;
