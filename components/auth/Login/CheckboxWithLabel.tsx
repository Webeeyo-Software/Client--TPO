import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";

interface CheckboxWithLabelProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  checked,
  onToggle,
  label,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center"
      activeOpacity={0.8}
      onPress={onToggle}
    >
      <View
        className={`w-5 h-5 rounded-sm border ${
          checked ? "bg-[#1877F2] border-[#1877F2]" : "border-gray-300"
        } justify-center items-center mr-2`}
      >
        {checked && <CheckIcon size={16} color="white" />}
      </View>
      <Text className="text-sm text-gray-700">{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxWithLabel;
