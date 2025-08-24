import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Dropdown from "components/questionsBank/Dropdown";
import PrimaryButton from "components/ui/PrimaryButton";
import Header from "components/ui/Header";
import { useRouter } from "expo-router";
const QuestionBankScreen = () => {
  const [company, setCompany] = useState("All");
  const [round, setRound] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const router = useRouter();
  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Question Bank"/>
      <ScrollView className="px-4 pt-4" showsVerticalScrollIndicator={false}>
        <Dropdown
          label="Choose Company"
          value={company}
          options={["All", "Google", "Microsoft", "Amazon", "Meta"]}
          onChange={setCompany}
        />
        <Dropdown
          label="Round"
          value={round}
          options={["All", "Round 1", "Round 2", "Final"]}
          onChange={setRound}
        />
        <Dropdown
          label="Question type"
          value={type}
          options={["All", "MCQ", "Coding", "Theory"]}
          onChange={setType}
        />
        <Dropdown
          label="Question status"
          value={status}
          options={["All", "Pending", "Approved", "Rejected"]}
          onChange={setStatus}
        />

        <PrimaryButton label="Proceed" onPress={() => {router.push('screens/questionsBank/Practice')}} />
      </ScrollView>
    </View>
  );
};

export default QuestionBankScreen;
