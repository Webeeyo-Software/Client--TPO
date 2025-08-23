import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface BottomNavProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onBack,
  onNext,
  nextLabel = "Next",
}) => {
  return (
    <View className="flex-row justify-between px-4 py-3 bg-white border-t border-gray-200">
      <TouchableOpacity
        onPress={onBack}
        className="flex-1 py-3 mr-2 rounded-lg border border-gray-300 bg-white items-center"
      >
        <Text className="text-gray-700 font-medium">Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        className="flex-1 py-3 ml-2 rounded-lg bg-[#1877F2] items-center"
      >
        <Text className="text-white font-medium">{nextLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
