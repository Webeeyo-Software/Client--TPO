import { View, Text } from "react-native";
import React from "react";

type Props = {
  rounds: { round: string; detail: string }[];
};

export const SelectionProcedure = ({ rounds }: Props) => {
  return (
    <View className="mt-2">
      {rounds.map((r, idx) => (
        <View
          key={idx}
          className="flex-row justify-between py-2 border-b border-gray-100"
        >
          <Text className="text-gray-500 text-sm">{r.round}</Text>
          <Text className="text-gray-800 font-medium text-sm">{r.detail}</Text>
        </View>
      ))}
    </View>
  );
};
