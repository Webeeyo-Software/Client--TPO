import React from "react";
import { View, Text } from "react-native";

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <View className="mb-6 mt-5">
      <Text className="text-blue-600 font-semibold mb-3 text-lg">{title}</Text>
      {children}
    </View>
  );
}
