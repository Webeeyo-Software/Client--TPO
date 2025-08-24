import { View, Text } from "react-native";
import React from "react";

type Props = {
  question: string;
  answer: string;
};

export const QAItem = ({ question, answer }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-500 text-sm mb-1">{question}</Text>
      <Text className="text-gray-800 font-medium text-sm">{answer}</Text>
    </View>
  );
};
