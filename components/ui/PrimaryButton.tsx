import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#1877F2] rounded-lg py-3 mt-6 w-full"
      onPress={onPress}
    >
      <Text className="text-white text-center font-semibold text-base">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
