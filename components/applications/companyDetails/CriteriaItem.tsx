import { View, Text } from "react-native";
import React from "react";

type Props = {
  label: string;
  value: string | number;
};

export const CriteriaItem = ({ label, value }: Props) => {
  return (
    <View className="flex-row justify-between py-2 border-b border-gray-100">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-800 font-medium text-sm">{value}</Text>
    </View>
  );
};
