import React from "react";
import { Text, View } from "react-native";

export default function SuccessMessage() {
  return (
    <View className="items-center space-y-1 my-40">
      <Text className="text-xl font-bold text-gray-700">Congratulations!</Text>
      <Text className="text-sm text-gray-500">
        Your account is ready to use
      </Text>
    </View>
  );
}
