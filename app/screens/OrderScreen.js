import { Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const naviagation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      naviagation.replace("Main");
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <LottieView
        source={require("../../assets/thumbs.json")}
        style={{
          height: 200,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been recieved
      </Text>
      <LottieView
        source={require("../../assets/sparkle.json")}
        style={{
          height: 300,
          width: 300,
          top: 100,
          position: "absolute",
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
