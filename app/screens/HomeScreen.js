import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  Flatlist,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "../components/Screen";
import { Icon } from "@rneui/base";
import SwiperFlatList from "react-native-swiper-flatlist";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import useUser from "../contextApi/useUser";

import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import client from "../../api/client";
const HomeScreen = () => {
  const naviagation = useNavigation();
  console.log(deals);
  const [selected, setSelected] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const { userId, setUserId } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [selectedaddress, setSelectedAddress] = useState("");
  const data = [
    { key: "2", value: "men's clothing" },
    { key: "3", value: "jewelery" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "electronics" },
    { key: "6", value: "women's clothing" },
  ];

  // console.log(selected);
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
    require("../../assets/cookedfood.jpeg"),
    require("../../assets/sofa.jpeg"),
  ];
  const image = (index) => ({ image: slides[index % slides.length] });
  const item = slides?.map((_, index) => image(index));
  const [products, setProducts] = useState([]);
  // userId
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("logintoken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };
  // PRODUCT
  const fetchProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res?.data);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  // GET ADDRESS
  const getAddresses = async () => {
    console.log(userId);
    try {
      const res = await client.get(`/address/${userId}`);
      if (res) {
        // console.log(addresses);
        setAddresses(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      getAddresses();
    }
  }, [userId, modalOpen]);
  console.log("the address chosen:",selectedaddress);
  const deals = [
    {
      id: "20",
      title: "Buger Buger",
      oldPrice: 25000,
      price: 19000,
      image: require("../../assets/foodR.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "As seen",
      size: "Big size",
    },
    {
      id: "30",
      title: "Three Gold color studded ring",
      oldPrice: 74000,
      price: 26000,
      image: require("../../assets/jewel.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Gold",
      size: "heavy",
    },
    {
      id: "40",
      title: "Exclusive leather watch",
      oldPrice: 16000,
      price: 14000,
      image: require("../../assets/watch.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "All colors",
      size: "Light",
    },
    {
      id: "40",
      title: "Leather bag",
      oldPrice: 12999,
      price: 10999,
      image: require("../../assets/bag.jpg"),
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const filteredProducts = selected
    ? products.filter((product) => product.category === selected)
    : products;
  // console.log("Filtered Products:", filteredProducts);
  return (
    <>
      <Screen>
        <ScrollView>
          <View className="bg-red-300 p-4 flex-row items-center space-x-2">
            <Pressable className="bg-white flex-row items-center flex-1 space-x-2 p-1 px-2 rounded-md">
              <Icon
                name="search"
                type="font-awesome"
                size={20}
                color={"gray"}
              />
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
          <Pressable className="p-4 bg-red-200 flex-row items-center space-x-2">
            <Icon name="location-pin" type="entypo" size={24} />
            <Pressable onPress={() => setModalOpen(!modalOpen)}>
              {selectedaddress ? <Text className="text-gray-700" numberOfLines={1}>
                Deliver to {selectedaddress?.fullname}-{selectedaddress?.address}
              </Text>:<Text className="text-gray-700">
                Add an Address
              </Text>}
              
            </Pressable>
            <Icon
              name="keyboard-arrow-down"
              type="material-icons"
              size={24}
              color={"gray"}
            />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-20 h-[106px] bg-white mb-2"
              >
                <View className=" m-1 w-20 rounded-md overflow-hidden shadow-md">
                  <Image
                    source={item.image}
                    className="w-20 h-20 object-cover"
                  />
                  <Text className="text-center font-semibold text-gray-500 w-20">
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <SwiperFlatList
            autoplay
            autoplayDelay={4}
            index={3}
            autoplayLoop
            data={item}
            renderItem={({ item }) => (
              <Image
                className="w-screen object-cover"
                source={item.image}
                height={200}
                width={200}
              />
            )}
            // showPagination
          />
          <Text className="text-base p-2 font-semibold">
            Trending Deals of the week
          </Text>
          <View className="w-full  flex-row flex-wrap">
            {/* { uri: item?.image } */}
            {deals?.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[150px] h-36 flex-row items-center m-3"
                onPress={() =>
                  naviagation.navigate("Info", {
                    id: item?.id,
                    title: item?.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
              >
                <Image
                  className="w-full h-36 object-cover rounded-md"
                  source={item?.image}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="h-[1px] bg-gray-300 w-full mx-auto" />
          <Text className="p-4 font-semibold text-base bg-white">
            Today's Deal
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="bg-white"
          >
            {offers.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-40 h-[200px] bg-white mb-2 justify-center"
                onPress={() =>
                  naviagation.navigate("Info", {
                    id: item?.id,
                    title: item?.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
              >
                <View className=" m-1 w-40">
                  <Image
                    source={{ uri: item?.image }}
                    className="w-40 h-32 object-cover"
                  />
                  <Text className="text-center font-semibold text-gray-100 w-full h-[20px] bg-red-400">
                    Upto {item.offer}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="h-[1px] bg-gray-300 w-full mx-auto" />
          <View className="bg-white">
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder="choose category"
              boxStyles={{
                borderWidth: 1,
                backgroundColor: "white",
                marginVertical: 10,
                borderColor: "gray",
                width: 200,
              }}
              defaultOption={{ key: "3", value: "jewelery" }}
            />
          </View>
          <View className="flex-row flex-wrap bg-white pb-20">
            {filteredProducts == ""
              ? products?.map((item, index) => (
                  <ProductItem key={index} item={item} />
                ))
              : filteredProducts?.map((item, index) => (
                  <ProductItem key={index} item={item} />
                ))}
          </View>
        </ScrollView>
      </Screen>

      {/* Other components */}
      <BottomModal
        onBackdropPress={() => setModalOpen(!modalOpen)}
        swipeDirection={["up", "down"]} // can be string or an array
        swipeThreshold={200} // default 100
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalOpen(!modalOpen)}
        visible={modalOpen}
        // onSwipeOut={()=> setModalOpen(!modalOpen)}
        onTouchOutside={() => setModalOpen(!modalOpen)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View>
            <Text className="text-[16px] font-semibold">
              Choose your Location
            </Text>
            <Text className="text-gray-400 text-[16px]">
              Select a delivery location to see the product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Already added address */}
            {addresses?.useraddresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddress(item)}
                key={index}
                className={`w-[140px] p-2 mt-5 border border-gray-300 rounded-md h-[140px] items-center justify-center ${
                  selectedaddress === item ? "bg-red-200" : "bg-white"
                } `}
              >
                <View className="flex flex-row items-center space-x-2">
                  <Text className="font-semibold">{item?.fullname}</Text>
                  <Icon
                    name="location-pin"
                    type="entypo"
                    size={28}
                    color={"red"}
                  />
                </View>
                <View className="w-full px-1">
                  <Text
                    className="text-[15px] text-gray-400 w-[100px]"
                    numberOfLines={1}
                  >
                    {item?.address}
                  </Text>
                  <Text className="text-[15px] text-gray-400">
                    {item?.landmark}
                  </Text>
                  <Text className="text-[15px] text-gray-400">
                    {item?.country}
                  </Text>
                </View>
              </Pressable>
            ))}
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
                naviagation.navigate("Address");
              }}
              className="w-[140px] p-2 ml-2 mt-5 border border-gray-300 rounded-md h-[140px] items-center justify-center"
            >
              <Text className="text-[16px] font-semibold text-blue-400 text-center">
                Add an Address or pick-up point
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View className="mb-0 flex flex-col mt-5">
            <View className="flex flex-row items-center gap-4 mb-2">
              <Icon
                name="location-pin"
                type="entypo"
                size={28}
                color={"gray"}
              />
              <Text className="text-gray-400">Enter Zipcode</Text>
            </View>
            <View className="flex flex-row items-center gap-4 mb-2">
              <Icon
                name="locate-sharp"
                type="ionicon"
                size={28}
                color={"gray"}
              />
              <Text className="text-gray-400">Use My Current Location</Text>
            </View>
            <View className="flex flex-row items-center gap-4">
              <Icon name="earth" type="antdesign" size={28} color={"gray"} />
              <Text className="text-gray-400">Deliver outside Lagos</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;
