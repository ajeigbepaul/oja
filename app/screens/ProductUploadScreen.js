import { View, Text } from "react-native";
import React from "react";
import KeyboardAvoidingScreen from "../components/KeyboardAvoidingScreen";

const ProductUploadScreen = () => {
  return (
    <KeyboardAvoidingScreen>
      <View className="flex-1 items-center justify-center">
        <Text>Upload Products here</Text>
        <View>
            
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
};

export default ProductUploadScreen;
