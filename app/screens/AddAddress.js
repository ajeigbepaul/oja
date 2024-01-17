import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import KeyboardAvoidingScreen from "../components/KeyboardAvoidingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import useUser from "../contextApi/useUser";
import client from "../../api/client";
import { useNavigation } from "@react-navigation/native";
const AddAddress = () => {
  const naviagation = useNavigation();
  const { userId } = useUser();
  const [country, setCountry] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [mobilenos, setMobilenos] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalcode, setPostalcode] = useState("");

  const handleAddAddress = async () => {
    const addressData = {
      country,
      fullname,
      address,
      mobilenos,
      landmark,
      postalcode,
    };
    try {
      const res = await client.post("/address", { userId, addressData });
      console.log(res.data);
      if (res) {
        Alert.alert(
          "Address successful",
          "You have Added an address successfully"
        );
        setCountry("");
        setFullname("");
        setMobilenos("");
        setLandmark("");
        setAddress("");
        setPostalcode("");
      }
      setTimeout(() => {
        naviagation.navigate("Address");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingScreen>
      <View>
        <View className="bg-red-300 p-4"></View>
        <Text className="font-semibold text-[18px] p-4">Add a new Address</Text>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">Country</Text>
          <TextInput
            value={country}
            onChangeText={(text) => setCountry(text)}
            placeholder="Nigeria"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">Full name</Text>
          <TextInput
            value={fullname}
            onChangeText={(text) => setFullname(text)}
            placeholder="enter your name"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">Mobile Number</Text>

          <TextInput
            value={mobilenos}
            onChangeText={(text) => setMobilenos(text)}
            placeholder="Enter your mobile number"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">Delivery Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Enter Delivery address"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholder="Popular place around you"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <Text className="text-sm font-semibold">PinCode</Text>
          <TextInput
            value={postalcode}
            onChangeText={(text) => setPostalcode(text)}
            placeholder="Enter Pincode"
            className="p-2 border-b border-gray-300"
          />
        </View>
        <View className="mt-4 px-4 mb-2">
          <TouchableOpacity
            className="bg-orange-300 p-3 rounded-sm"
            onPress={handleAddAddress}
          >
            <Text className="text-white text-center text-[16px] font-semibold">
              Add Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
};

export default AddAddress;
