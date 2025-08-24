import React from "react";
import { View, TextInput, Text } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function RangeInput({ label, value, onChangeText }: Props) {
  return (
    <View className="flex-1">
      <Text className="text-gray-500 mb-1">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
