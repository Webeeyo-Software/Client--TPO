import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface QuestionProgressProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const QuestionProgress: React.FC<QuestionProgressProps> = ({
  total,
  current,
  onSelect,
}) => {
  return (
    <View className="flex-row justify-center my-4">
      {Array.from({ length: total }).map((_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onSelect(i + 1)}
          className={`w-8 h-8 mx-1 rounded-full items-center justify-center ${
            current === i + 1 ? "bg-[#1877F2]" : "border border-gray-400"
          }`}
        >
          <Text
            className={`${
              current === i + 1 ? "text-white" : "text-gray-700"
            } font-medium`}
          >
            {i + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
