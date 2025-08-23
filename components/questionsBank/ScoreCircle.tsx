import React from "react";
import { View, Text } from "react-native";

type ScoreCircleProps = {
  score: number;
  total: number;
};

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, total }) => {
  return (
    <View className="items-center justify-center bg-blue-500 pb-20 rounded-b-[40px] h-96">
      <View className="items-center justify-center w-48 h-48 rounded-full bg-blue-400">
        <View className="items-center justify-center w-40 h-40 rounded-full bg-white">
          <Text className="text-base text-blue-500 font-medium">Total Score</Text>
          <Text className="text-5xl font-bold text-blue-500">{score}</Text>
          <Text className="text-base text-blue-500">Out Of {total}</Text>
        </View>
      </View>
    </View>
  );
};

export default ScoreCircle;
