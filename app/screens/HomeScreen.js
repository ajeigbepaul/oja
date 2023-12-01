import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { Icon } from "@rneui/base";
import SwiperFlatList from "react-native-swiper-flatlist";

const HomeScreen = () => {
  const list = [
    { id: 0, image: require("../../assets/cookedfood.jpeg"), name: "Home" },
    { id: 1, image: require("../../assets/sofa.jpeg"), name: "Deals" },
    { id: 2, image: require("../../assets/cooker.jpeg"), name: "Electronics" },
    { id: 3, image: require("../../assets/food.jpeg"), name: "Market" },
    { id: 4, image: require("../../assets/fahion.jpeg"), name: "Fashion" },
    { id: 5, image: require("../../assets/jewery.jpeg"), name: "Jewelry" },
    { id: 6, image: require("../../assets/shoes.jpeg"), name: "Footwear" },
  ];
  const slides = [
    require("../../assets/shoes.jpeg"),
    require("../../assets/fahion.jpeg"),
    // require("../../assets/food.jpeg"),
    // require("../../assets/cookedfood.jpeg"),
    require("../../assets/sofa.jpeg"),
  ];
  const image = (index) => ({ image: slides[index % slides.length] });
  const items = slides?.map((_, index) => image(index));
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
            <Text className="text-gray-700">
              Deliver to Ayobo - Lagos 012345
            </Text>
          </Pressable>
          <Icon
            name="keyboard-arrow-down"
            type="material-icons"
            size={24}
            color={"gray"}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-20 h-[106px] bg-white p-1"
            >
              <Image
                source={item.image}
                className="w-20 h-20 object-cover rounded-md"
              />
              <Text className="text-center font-semibold text-gray-500">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <SwiperFlatList
          autoplay
          autoplayDelay={4}
          index={3}
          autoplayLoop
          // autoplayInvertDirection
          data={items}
          renderItem={({ item }) => (
            <Image
              style={{ width: 400, height: 200, resizeMode: "cover" }}
              source={item.image}
              height={200}
              width={200}
            />
          )}
          showPagination
        />
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
