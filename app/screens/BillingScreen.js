import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import { Icon } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Paystack } from "react-native-paystack-webview";
import client from "../../api/client";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { cleanCart } from "../../redux/cartSlice";

const BillingScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [pay, setPay] = useState(false);
  const amount = route?.params.total;
  const [billingDetail, setBillingDetail] = useState({
    billingName: "",
    billingEmail: "",
    billingMobile: "",
  });
  const handleOnchange = (text, input) => {
    setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
  };
  const placeOrder = async () => {
    const orderData = {
      userId: route?.params?.userId,
      cartItems: route?.params?.cartItems,
      totalPrice: route?.params?.totalPrice,
      shippingAddress: route?.params?.shippingAddress,
      paymentMethod: route?.params?.paymentMethod,
    };
    console.log(orderData)
    try {
      const res = await client.post("/order", orderData);
      if (res.status === 200) {
        dispatch(cleanCart());
        Alert.alert("Order successfull", "Your Order was successfull");
        navigation.navigate("Order");
        console.log(res.data.order);
      } else {
        console.log("Something went wrong", res.data);
      }
    } catch (error) {
      console.log("could not place orders", error);
    }
  };
  const handleSubmit = () => {
    if (
      billingDetail.billingName &&
      billingDetail.billingEmail &&
      billingDetail.billingMobile &&
      amount
    ) {
      setPay(true);
    //   placeOrder();
    } else {
      Toast.show("Fill in all fields", {
        duration: Toast.durations.LONG,
      });
    }
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
        <View style={styles.appBar}>
          <Text className="font-semibold text-[20px] text-gray-500">
            Billing Information
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            className="p-2 border-b border-gray-300"
            placeholder="Billing Name"
            onChangeText={(text) => handleOnchange(text, "billingName")}
            value={billingDetail?.billingName}
          />
          <TextInput
            className="p-2 border-b border-gray-300"
            placeholder="Billing Email"
            onChangeText={(text) => handleOnchange(text, "billingEmail")}
            value={billingDetail?.billingEmail}
          />
          <TextInput
            className="p-2 border-b border-gray-300"
            placeholder="Billing Mobile"
            onChangeText={(text) => handleOnchange(text, "billingMobile")}
            value={billingDetail?.billingMobile}
          />
          <View className="p-2 flex-row items-center">
            <Text className="text-[16px]">Amount :</Text>
            <Text className="text-[16px] font-semibold">₦{amount}</Text>
          </View>
          <TouchableOpacity
            className="mt-3 bg-orange-300 p-4 rounded-full"
            onPress={handleSubmit}
          >
            <Text className="text-center text-[16px]">Pay Now</Text>
          </TouchableOpacity>
        </View>
        {pay && (
          <View style={{ flex: 1 }}>
            <Paystack
              paystackKey="pk_test_bf02b912b6e3eacfbeb152117db46ef994d94964"
              amount={amount}
              billingEmail={billingDetail.billingEmail}
              billingMobile={billingDetail.billingMobile}
              activityIndicatorColor="green"
              onCancel={(e) => {
                // handle response here
                Toast.show("Transaction Cancelled!!", {
                  duration: Toast.durations.LONG,
                });
              }}
              onSuccess={(response) => {
                // handle response here

                const responseObject = response["transactionRef"]["message"];
                if (responseObject === "Approved") {
                  Toast.show("Transaction Approved!!", {
                    duration: Toast.durations.LONG,
                  });
                  placeOrder();
                }
              }}
              autoStart={pay}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#fff",
    height: 95,
    borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#841584",
  },
  body: {
    padding: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginTop: 15,
  },
});

export default BillingScreen;
