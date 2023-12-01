import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../utils.js/colors";
import { Icon } from "@rneui/base";

export default function TabButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon
          name="user"
          type="font-awesome"
          color={colors.white}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: colors.primary,
    bottom: 20,
    borderColor: colors.white,
    borderWidth: 7,
    height: 70,
    justifyContent: "center",
    width: 70,
  },
});