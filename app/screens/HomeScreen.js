import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { Icon } from "@rneui/base";
const HomeScreen = () => {
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
        <View className="p-4 bg-red-200 flex-row items-center space-x-2">
          <Icon name="location-pin" type="entypo" size={24} />
          <Pressable>
            <Text className="text-gray-700">Deliver to Ayobo - Lagos 012345</Text>
          </Pressable>
          <Icon
            name="keyboard-arrow-down"
            type="material-icons"
            size={24}
            color={"gray"}
          />
        </View>
        <ScrollView>

        </ScrollView>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
