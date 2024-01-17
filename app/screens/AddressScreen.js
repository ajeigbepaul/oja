import { View, Text, TextInput, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";
import Screen from "../components/Screen";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useUser from "../contextApi/useUser";
import client from "../../api/client";

const AddressScreen = () => {
  const { userId } = useUser();
  // console.log(userId)
  const naviagation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const getAddresses = async () => {
    console.log(userId)
    try {
      const res = await client.get(`/address/${userId}`);
      console.log(res.data)
      if (res) {
        setAddresses(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddresses();
  }, []);
  console.log(addresses);
  // Refresh the addresses when component comes in focus view or when we navigate back
  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, [])
  );
  return (
    <Screen>
      <ScrollView>
        <View className="bg-red-300 p-4 flex-row items-center space-x-2">
          <Pressable className="bg-white flex-row items-center flex-1 space-x-2 p-1 px-2 rounded-md">
            <Icon name="search" type="font-awesome" size={20} color={"gray"} />
            <TextInput className="w-full text-gray-400 text-sm">
              Search OJA
            </TextInput>
          </Pressable>
          <Icon
            name="microphone"
            type="font-awesome"
            size={20}
            color={"white"}
          />
        </View>
        <View className="p-4">
          <Text className="font-bold p-2 text-[16px]">Your Addresses</Text>
          <TouchableOpacity
            onPress={() => naviagation.navigate("AddAddress")}
            className="border border-l-0 border-r-0 border-gray-300 flex flex-row p-2 items-center justify-between mb-3"
          >
            <Text>Add a new Address</Text>
            <Icon name="keyboard-arrow-right" type="material-icon" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            {addresses?.useraddresses?.map((item, index) => (
              <Pressable
                className="border border-gray-300 p-2 flex flex-col"
                key={index}
              >
                <View className="flex flex-row items-center space-x-2">
                  <Text className="font-semibold">{item?.fullname}</Text>
                  <Icon
                    name="location-pin"
                    type="entypo"
                    size={28}
                    color={"red"}
                  />
                </View>
                <Text className="text-[15px] text-gray-400">
                  {item?.address}
                </Text>
                <Text className="text-[15px] text-gray-400">
                  {item?.landmark}
                </Text>
                <Text className="text-[15px] text-gray-400">
                  {item?.country}
                </Text>
                <Text className="text-[15px] text-gray-400">
                  Phone Nos: {item?.mobilenos}
                </Text>
                <Text className="text-[15px] text-gray-400">
                  Postalcode: {item?.postalcode}
                </Text>
                <View className="flex flex-row gap-4 items-center">
                  <Pressable className="border border-gray-200 p-1 rounded-md">
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable className="border border-gray-200 p-1 rounded-md">
                    <Text>Remove</Text>
                  </Pressable>
                  <Pressable className="border border-gray-200 p-1 rounded-md">
                    <Text>Set as Default</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
            {/* All Address here */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AddressScreen;
