import React from "react";
import { Text, TouchableOpacity } from "react-native";

type OutlineButtonProps = {
  title: string;
  onPress?: () => void;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="border border-gray-300 rounded-lg py-3 px-6 items-center mt-4 bg-white shadow-sm h-14"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text className="text-black font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;
