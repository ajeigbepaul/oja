import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@rneui/base";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const naviagation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(cart);
  console.log(total);
  const handleAddQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };
  const handleDelete = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <Screen style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View className="bg-red-300 p-4 flex-row items-center space-x-2">
          <Pressable className="bg-white flex-row items-center flex-1 space-x-2 p-1 px-2 rounded-md">
            <Icon name="search" type="font-awesome" size={20} color={"gray"} />
            <TextInput className="w-full text-gray-400 text-sm">
              Search OJA
            </TextInput>
          </Pressable>
        </View>
        <View className="flex flex-row p-4 gap-2 bg-white">
          <Text className="font-semibold text-[16px]">SubTotal:</Text>
          <Text className="text-gray-600 text-[16px]">₦ {total}</Text>
        </View>
        <View className="p-2 bg-white">
          <TouchableOpacity
            className={`p-2 ${
              cart?.length === 0 ? "bg-orange-100" : "bg-orange-300"
            }  rounded-md`}
            disabled={cart?.length === 0}
            onPress={() => naviagation.navigate("Confirmation")}
          >
            <Text className="text-center font-semibold">
              Proceed to checkout ({cart?.length}) items
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="h-[1px] w-full bg-gray-300" />
        <View className="bg-white">
          {cart?.map((item, i) => (
            <View key={i} className="border-b border-gray-300 py-2">
              <Pressable className="flex flex-row">
                <View>
                  <Image
                    source={{ uri: item?.carouselImages[0] }}
                    className="w-[140px] h-[140px] object-cover"
                  />
                </View>
                <View>
                  <Text className="text-[16px]" numberOfLines={2}>
                    {item?.title}
                  </Text>
                  <Text className="text-[18px] text-gray-700 font-bold mt-1">
                    ₦{item?.price}
                  </Text>
                  <Text className="text-green-400 text-sm font-semibold">
                    in Stock
                  </Text>
                </View>
              </Pressable>
              <View className="w-full p-4">
                <View className="w-full flex flex-row items-center space-x-3">
                  {item?.quantity > 1 ? (
                    <TouchableOpacity
                      className=" rounded-sm w-8 h-8 bg-gray-100 flex items-center justify-center"
                      onPress={() => handleDecrement(item)}
                    >
                      <Icon type="ant-design" name="minus" color={"red"} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className=" rounded-sm w-8 h-8 bg-gray-100 flex items-center justify-center"
                      onPress={() => handleDelete(item)}
                    >
                      <Icon type="ant-design" name="delete" color={"red"} />
                    </TouchableOpacity>
                  )}

                  <View>
                    <Text className="font-bold">{item?.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleAddQuantity(item)}
                    className=" rounded-sm w-8 h-8 bg-gray-100 flex items-center justify-center"
                  >
                    <Icon type="feather" name="plus" color={"red"} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="rounded-md w-14 h-8 border border-gray-200 flex items-center justify-center"
                    onPress={() => handleDelete(item)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex flex-row px-4 space-x-1">
                <TouchableOpacity className=" rounded-md w-24 h-8 border border-gray-200 flex items-center justify-center">
                  <Text>Save for later</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" rounded-md w-32 h-8 border border-gray-200 flex items-center justify-center">
                  <Text>See more like this</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CartScreen;
