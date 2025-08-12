import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

const SecondaryButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-gray-100 rounded-lg py-3 mt-3 w-full"
      onPress={onPress}
    >
      <Text className="text-gray-800 text-center font-semibold text-base">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
