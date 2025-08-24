import { Text, View } from "react-native";
import React from "react";
type SectionHeaderProps = {
  title: string;
};

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <Text className="text-[#1877F2] font-semibold text-base mt-5 mb-2">
      {title}
    </Text>
  );
};
