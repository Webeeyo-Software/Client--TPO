import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import  Header  from "components/ui/Header";
import { QuestionOption } from "components/questionsBank/QuestionOption";
import { QuestionProgress } from "components/questionsBank/QuestionProgress";
import { BottomNav } from "components/questionsBank/BottomNav";
import { router } from "expo-router";

export default function QuestionScreen() {
  const [selectedOption, setSelectedOption] = useState<number | null>(3);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const totalQuestions = 5;

  const options = [
    "To cache frequently accessed data",
    "To improve database performance",
    "To distribute incoming traffic across multiple servers",
    "To enhance security measures",
  ];

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((p) => p + 1);
    } else {
      router.push("/screens/questionsBank/ResultScreen");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((p) => p - 1);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header  title="Questions"/>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="mb-4 text-gray-800 font-medium">
          Ques{currentQuestion}:
        </Text>
        <Text className="mb-6 text-lg font-semibold text-gray-900">
          What is the primary purpose of using a load balancer in a web
          application architecture?
        </Text>

        {options.map((opt, idx) => (
          <QuestionOption
            key={idx}
            text={opt}
            selected={selectedOption === idx}
            onPress={() => setSelectedOption(idx)}
          />
        ))}

        <QuestionProgress
          total={totalQuestions}
          current={currentQuestion}
          onSelect={(q) => setCurrentQuestion(q)}
        />
        <BottomNav
        onBack={handleBack}
        onNext={handleNext}
        nextLabel={currentQuestion === totalQuestions ? "Submit" : "Next"}
      />
      </ScrollView>

      
    </View>
  );
}
