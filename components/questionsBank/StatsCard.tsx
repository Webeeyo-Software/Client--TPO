import React from "react";
import { View, Text } from "react-native";

export default function StatsCard({
  completion,
  totalQuestions,
  correct,
  incorrect,
}: {
  completion: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
}) {
  return (
    <View className="bg-white mx-5 -mt-10 rounded-xl p-4 shadow">
      <View className="flex-row items-center mb-1">
        <Text className="text-blue-600 text-2xl mr-1">•</Text>
        <Text className="text-lg font-semibold mr-1">{completion}</Text>
        <Text className="text-sm text-gray-400">Completion</Text>
      </View>
      <View className="flex-row items-center mb-1">
        <Text className="text-blue-600 text-2xl mr-1">•</Text>
        <Text className="text-lg font-semibold mr-1">{totalQuestions}</Text>
        <Text className="text-sm text-gray-400">Total Questions</Text>
      </View>
      <View className="flex-row justify-between w-4/5 mt-2">
        <Text className="text-green-600 font-medium text-sm">{correct} Correct</Text>
        <Text className="text-red-600 font-medium text-sm">{incorrect} Incorrect</Text>
      </View>
    </View>
  );
}
