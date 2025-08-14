import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  className?: string; // Optional className prop for additional styling
}

const PrimaryButton: React.FC<Props> = ({ label, onPress, className }) => {
  return (
    <TouchableOpacity
      className={`bg-blue-500 rounded-lg p-2 items-center justify-center w-60 mb-4 ml-24 mt-6 shadow-2xl ${className}`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-semibold text-base">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
