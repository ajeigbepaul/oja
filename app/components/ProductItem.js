import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ProductItem = ({ item }) => {
  return (
    <TouchableOpacity className="m-[15px] w-[150px] h-[150px] mb-20 my-14">
      <Image
    //   className="w-[150px] h-[150px] object-contain"
        style={{ width: 100, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text className="w-[150px] mt-2" numberOfLines={1}>
        {item?.title}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-sm">₦{item?.price}</Text>
        <Text className="font-semibold text-xs text-orange-400">{item?.rating?.rate} ratings</Text>
      </View>
      <TouchableOpacity className="bg-red-400 mt-2 p-2 rounded-full">
        <Text className="text-center text-white font-semibold">Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;
