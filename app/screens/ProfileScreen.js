import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import useUser from "../contextApi/useUser";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId } = useUser();
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: "red" },
      headerLeft: () => (
        <Image
          style={{ width: 40, height: 40, resizeMode: "contain" }}
          className="ml-4 rounded-full"
          source={require("../../assets/ojasplash.jpg")}
        />
      ),
      headerRight: () => (
        <View className="ml-4 mr-3 flex-row items-center space-x-2">
          <Icon
            name="notifications-none"
            type="materialicons"
            size={24}
            color={"white"}
          />
          <Icon name="search1" type="antdesign" size={24} color={"white"} />
        </View>
      ),
    });
  }, [navigation]);
  // Get profile Uer
  const getUser = async () => {
    try {
      const res = await client.get(`/register/${userId}`);
      if (res) {
        setUser(res?.data?.user);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  // GET ADDRESS
  const getOrders = async () => {
    try {
      const res = await client.get(`/order/${userId}`);
      if (res) {
        console.log(res?.data?.orders);
        setOrders(res?.data?.orders);
      }
      setIsLoading(false);
      // console.log(res.data.orders)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getOrders();
  }, []);
  console.log("This is the orders", orders);
  const logOut = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("logintoken");
    console.log("Token cleared");
    navigation.replace("Login");
  };
  return (
    <ScrollView>
      <Text className="text-[16px] font-semibold p-2">
        Welcome {user?.fullname}
      </Text>
      <View className="mt-4 p-2 flex-row gap-4">
        <TouchableOpacity className="bg-orange-300 rounded-full p-2 flex-1">
          <Text className="text-center text-white">Your orders</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-700 rounded-full p-2 flex-1">
          <Text className="text-center text-white">Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-300 rounded-full p-2 flex-1"
          onPress={() => navigation.navigate("ProductUpload")}
        >
          <Text className="text-center text-white">Upload Products</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 p-2 flex-row gap-4">
        <TouchableOpacity className="bg-red-300 rounded-full p-2 flex-1">
          <Text className="text-center text-white">Buy Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-300 rounded-full p-2 flex-1"
          onPress={logOut}
        >
          <Text className="text-center text-white">Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : orders?.length > 0 ? (
          orders?.map((order) => (
            <Pressable
              className="p-4 rounded-md items-center justify-center border-gray-200"
              key={order?._id}
            >
              {order?.products?.map((product) => (
                <View key={product?._id}>
                  <View className="w-20 h-20 bg-gray-200 p-2 rounded-md">
                    <Text className="text-center">{product?.name}</Text>
                  </View>
                  {/* <Image
                    source={{ uri: product?.images }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  /> */}
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;
