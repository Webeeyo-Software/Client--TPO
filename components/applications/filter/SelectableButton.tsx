import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
};

export default function SelectableButton({ label, isSelected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full border ${
        isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
      }`}
    >
      <Text
        className={`text-sm ${
          isSelected ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
