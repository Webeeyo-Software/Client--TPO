import React from "react";
import { View } from "react-native";
import ScoreCircle from "./ScoreCircle";
import StatsCard from "./StatsCard";
import ActionButtons from "./ActionButtons";
import DoneButton from "./DoneButton";

export default function ResultScreen({ goBack }: { goBack: () => void }) {
  return (
    <View className="flex-1 bg-white">
      <ScoreCircle score={6} total={10} />
      <StatsCard completion="100%" totalQuestions={10} correct={6} incorrect={4} />
      <ActionButtons />
      <DoneButton onPress={goBack} />
    </View>
  );
}
