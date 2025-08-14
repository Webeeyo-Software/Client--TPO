import React from "react";
import { View, Text } from "react-native";

type ScoreStatsProps = {
  completion: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
};

const ScoreStats: React.FC<ScoreStatsProps> = ({
  completion,
  totalQuestions,
  correct,
  incorrect,
}) => {
  return (
    <View className="flex-row justify-between bg-white mx-6 -mt-12 rounded-2xl shadow p-4">
      <View className="items-center">
        <Text className="text-blue-500 font-semibold text-sm">
          {completion}%
        </Text>
        <Text className="text-gray-500 text-xs">Completion</Text>
      </View>

      <View className="items-center">
        <Text className="text-blue-500 font-semibold text-sm">
          {totalQuestions}
        </Text>
        <Text className="text-gray-500 text-xs">Total Questions</Text>
      </View>

      <View className="items-center">
        <Text className="text-green-500 font-semibold text-sm">{correct}</Text>
        <Text className="text-gray-500 text-xs">Correct</Text>
      </View>

      <View className="items-center">
        <Text className="text-red-500 font-semibold text-sm">{incorrect}</Text>
        <Text className="text-gray-500 text-xs">Incorrect</Text>
      </View>
    </View>
  );
};

export default ScoreStats;
