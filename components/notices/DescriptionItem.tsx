import React from "react";
import { View, Text } from "react-native";

interface DescriptionItemProps {
  title: string;
  content: string;
}

export default function DescriptionItem({ title, content }: DescriptionItemProps) {
  return (
    <View className="mb-4">
      <Text className="text-base font-semibold text-gray-900 mb-1">{title}</Text>
      <Text className="text-gray-600 text-sm leading-5">{content}</Text>
    </View>
  );
}
