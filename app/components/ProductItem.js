import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    // setAddedToCart(true);
    // dispatch(addToCart(item));
    // setTimeout(() => {
    //   setAddedToCart(false);
    // }, 5000);
    console.log(item)
  };
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart)
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
        <Text className="font-semibold text-xs text-orange-400">
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <TouchableOpacity
        className="bg-red-400 mt-2 p-2 rounded-full"
        onPress={() => addItemToCart(item)}
      >
        {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductItem;
