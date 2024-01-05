import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import Screen from "./Screen";
import { Icon } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const naviagation = useNavigation();
  const height = (width * 100) / 100;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };
  const cart = useSelector((state) => state.cart.cart);
//   console.log(cart);
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
          {route.params?.carouselImages.map((item, index) => (
            <ImageBackground
              source={{ uri: item }}
              key={index}
              style={{ width, height, resizeMode: "contain", marginTop: 25 }}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "orange",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: 12,
                    }}
                  >
                    20% off
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,

                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  className="bg-gray-300"
                >
                  <Icon name="share" type="font-awesome" color="black" />
                </View>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
                className="bg-gray-300"
              >
                <Icon name="hearto" type="antdesign" color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 12 }}>
            {route?.params?.title}
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 15, marginTop: 10 }}>
            ₦ {route?.params?.price}
          </Text>
        </View>
        <Text style={{ height: 1, borderColor: "gray", borderWidth: 1 }} />
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Color:</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Size:</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.size}
          </Text>
        </View>
        <Text style={{ height: 1, borderColor: "gray", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total: ₦ {route?.params?.price}
          </Text>
          <Text className="text-blue-400">
            Free delivery Tomorrow by 3 PM. Order within 10hrs. 30mins
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Icon name="location-pin" type="entypo" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver to Ajeigbe Paul - Lagos 012345
            </Text>
          </View>
        </View>
        <Text
          style={{ marginHorizontal: 10, fontWeight: "500" }}
          className="text-green-400"
        >
          IN stock
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => addItemToCart(route?.params?.item)}
        >
          {addedToCart ? (<Text>Added to Cart</Text>) : (<Text>Add to Cart</Text>)}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text>By Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

export default ProductInfoScreen;
