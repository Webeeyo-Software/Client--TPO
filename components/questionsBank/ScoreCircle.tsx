import React from "react";
import { View, Text } from "react-native";

export default function ScoreCircle({ score, total }: { score: number; total: number }) {
  return (
    <View className="bg-blue-600 items-center justify-center pt-10 pb-16">
      <View className="w-56 h-56 rounded-full bg-white/20 items-center justify-center">
        <View className="w-44 h-44 rounded-full bg-white/30 items-center justify-center">
          <View className="w-36 h-36 rounded-full bg-white items-center justify-center">
            <Text className="text-blue-600 font-medium text-base">Total Score</Text>
            <Text className="text-blue-600 font-bold text-4xl">{score}</Text>
            <Text className="text-blue-600 text-base">Out Of {total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
