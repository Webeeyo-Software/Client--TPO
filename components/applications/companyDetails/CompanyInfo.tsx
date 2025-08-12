import { View, Text } from "react-native";
import React from "react";

type Props = {
  info: { label: string; value: string }[];
};

export const CompanyInfo = ({ info }: Props) => {
  return (
    <View className="mt-2">
      {info.map((item, idx) => (
        <View
          key={idx}
          className="flex-row justify-between py-2 border-b border-gray-100"
        >
          <Text className="text-gray-500 text-sm">{item.label}</Text>
          <Text className="text-gray-800 font-medium text-sm">{item.value}</Text>
        </View>
      ))}
    </View>
  );
};
