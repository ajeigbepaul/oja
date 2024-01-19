import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import client from "../../api/client";
import useUser from "../contextApi/useUser";
import { Icon } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../../redux/cartSlice";

const ConfirmationScreen = () => {
  const naviagation = useNavigation();
  const dispatch = useDispatch();
  const { userId } = useUser();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Option" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedaddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedoption, setSelectedoption] = useState("");
  const getAddresses = async () => {
    console.log(userId);
    try {
      const res = await client.get(`/address/${userId}`);
      console.log(res.data);
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
  const placeOrder = async () => {
    const orderData = {
      userId: userId,
      cartItems: cart,
      totalPrice: total,
      shippingAddress: selectedaddress,
      paymentMethod: selectedoption,
    };
    try {
      const res = await client.post("/order", orderData);
      if (res.status === 200) {
        dispatch(cleanCart());
        Alert.alert("Order successfull", "Your Order was successfull");
        naviagation.navigate("Order");
        console.log(res.data.order);
      } else {
        console.log("Something went wrong", res.data);
      }
    } catch (error) {
      console.log("could not place orders", error);
    }
  };
  return (
    <ScrollView className="mt-14">
      <View className="flex-1 p-4">
        <View className="flex flex-row items-center justify-between">
          {steps?.map((step, i) => (
            <View className="items-center" key={i}>
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  i < currentStep && { backgroundColor: "green" },
                ]}
              >
                {i < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text>{step?.title}</Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep == 0 && (
        <View>
          <Text className="p-4 font-bold text-[16px]">
            Select delivery address
          </Text>
          <View>
            <Pressable>
              {addresses?.useraddresses?.map((item, index) => (
                <View
                  className="border border-gray-300 p-2 flex flex-row items-center mx-2 mb-2 rounded-md "
                  key={index}
                >
                  {selectedaddress && selectedaddress?._id == item?._id ? (
                    <Pressable>
                      <Icon name="check-circle" type="font-awesome" size={18} />
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => setSelectedAddress(item)}>
                      <Icon name="circle" type="entypo" size={18} />
                    </Pressable>
                  )}

                  <Pressable className=" flex flex-col ml-4">
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
                    <View className="flex flex-row gap-4 items-center mb-1 mt-1">
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
                    <View>
                      {selectedaddress && selectedaddress?._id == item?._id && (
                        <TouchableOpacity
                          className="bg-red-300 p-2 rounded-full"
                          onPress={() => setCurrentStep(1)}
                        >
                          <Text className="text-center text-[14px] text-white font-semibold">
                            Deliver to this address
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </Pressable>
                </View>
              ))}
            </Pressable>
          </View>
        </View>
      )}
      {currentStep == 1 && (
        <View className="p-4">
          <View>
            <Text className="text-[16px] font-bold text-gray-600">
              Choose your delivery options
            </Text>
            <View className="flex-row bg-white mt-2 p-2 space-x-2 mb-2">
              {option ? (
                <Pressable>
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color={"green"}
                    size={18}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={() => setOption(!option)}>
                  <Icon name="circle" type="entypo" size={18} />
                </Pressable>
              )}

              <Text className="flex-1">
                <Text className="text-green-700 ">Tommorrow by 10 pm</Text>
                <Text>- Free delivery with your prime membership</Text>
              </Text>
            </View>
            <TouchableOpacity
              className="bg-orange-300 p-2 rounded-full"
              onPress={() => setCurrentStep(2)}
            >
              <Text className="text-center">Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {currentStep === 2 && (
        <View className="p-4">
          <Text className="text-[16px] font-bold text-gray-700">
            Select your payment method
          </Text>
          <View className="flex-row bg-white mt-2 p-2 space-x-2 mb-2">
            {selectedoption === "Cash" ? (
              <Pressable>
                <Icon
                  name="check-circle"
                  type="font-awesome"
                  color={"green"}
                  size={18}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => setSelectedoption("Cash")}>
                <Icon name="circle" type="entypo" size={18} />
              </Pressable>
            )}
            <Text>Cash on delivery</Text>
          </View>
          <View className="flex-row bg-white mt-2 p-2 space-x-2 mb-2">
            {selectedoption === "Card" ? (
              <Pressable>
                <Icon
                  name="check-circle"
                  type="font-awesome"
                  color={"green"}
                  size={18}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setSelectedoption("Card");
                  Alert.alert("Card Payment", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "Ok",
                      onPress: () => {
                        naviagation.navigate("Billing", {
                          total: total,
                          userId: userId,
                          cartItems: cart,
                          totalPrice: total,
                          shippingAddress: selectedaddress,
                          paymentMethod: "card",
                        });
                      },
                    },
                  ]);
                }}
              >
                <Icon name="circle" type="entypo" size={18} />
              </Pressable>
            )}
            <Text>Card Payment</Text>
          </View>
          <TouchableOpacity
            className="bg-orange-300 p-2 rounded-full"
            onPress={() => setCurrentStep(3)}
          >
            <Text className="text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentStep === 3 && selectedoption === "Cash" && (
        <View className="p-4">
          <Text className="text-[16px] font-bold text-gray-700 mb-2">
            Order Summary
          </Text>
          <View className="flex-row items-center justify-between bg-white border p-2 border-gray-300">
            <View>
              <Text>Save 5% and never run out</Text>
              <Text>Turn on auto deliveries</Text>
            </View>
            <Icon
              name="keyboard-arrow-right"
              type="material-icons"
              size={24}
              color={"gray"}
            />
          </View>
          <View className="bg-white border mt-2 p-2 border-gray-300">
            <Text>Shipped to {selectedaddress?.fullname}</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold">Items</Text>
              <Text className="text-[16px] font-semibold">₦{total}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-[14px] font-semibold">Delivery</Text>
              <Text className="text-[16px] font-semibold">₦{"0"}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-[14px] font-semibold">Order Total</Text>
              <Text className="text-[18px] font-bold text-orange-400">
                ₦{total}
              </Text>
            </View>
          </View>
          <View className="mt-2 p-2 bg-white">
            <Text className="text-[14px] font-semibold">Pay with</Text>
            <Text className="text-[16px] font-bold text-gray-600">
              Pay on delivery (Cash)
            </Text>
          </View>
          <TouchableOpacity
            className="bg-orange-300 p-2 rounded-full mt-5"
            onPress={placeOrder}
          >
            <Text className="text-center font-semibold">Place your Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;
