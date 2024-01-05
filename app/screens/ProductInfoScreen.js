import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import Screen from "./Screen";
import { Icon } from "@rneui/base";
import { useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const route = useRoute();
  return (
    <Screen>
      <ScrollView showsHorizontalScrollIndicator={false}>
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
        {/* Change this to flatlist later */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params?.item.carouselImages.map((item, index) => (
            <ImageBackground></ImageBackground>
          ))}
        </ScrollView>
      </ScrollView>
    </Screen>
  );
};

export default ProductInfoScreen;
