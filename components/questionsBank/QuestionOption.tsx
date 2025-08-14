import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuestionOptionProps {
  text: string;
  selected: boolean;
  onPress: () => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  text,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-3 rounded-xl border ${
        selected ? "border-[#1877F2] bg-blue-50" : "border-gray-300 bg-white"
      } mb-3`}
    >
      <View
        className={`w-5 h-5 mr-3 rounded border ${
          selected ? "bg-[#1877F2] border-[#1877F2]" : "border-gray-400"
        } items-center justify-center`}
      >
        {selected && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
      <Text className="flex-1 text-gray-800">{text}</Text>
    </TouchableOpacity>
  );
};
