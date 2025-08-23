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
      className="bg-blue-500 rounded-lg px-3 py-3 items-center justify-center mb-4 mt-6 mx-4 shadow-2xl w-auto"
      onPress={onPress}
    >
      <Text className="text-white text-center font-semibold text-base">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
