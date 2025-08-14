import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ActionButtons() {
  return (
    <View className="flex-row justify-between mx-5 mt-5">
      <TouchableOpacity className="bg-white border border-gray-300 rounded-lg py-3 px-4 shadow">
        <Text className="font-semibold text-black">Review Answer</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row bg-blue-600 rounded-lg py-3 px-4 items-center">
        <Ionicons name="share-social-outline" size={18} color="#fff" style={{ marginRight: 4 }} />
        <Text className="text-white font-semibold">Share Score</Text>
      </TouchableOpacity>
    </View>
  );
}
