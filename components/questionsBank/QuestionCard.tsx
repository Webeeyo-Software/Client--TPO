import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type QuestionCardProps = {
  question: { question: string; options: string[] };
  index: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
};

export default function QuestionCard({ question, index, total, onNext, onBack }: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={onBack}><Ionicons name="arrow-back" size={24} color="#000" /></TouchableOpacity>
        <Text className="text-lg font-semibold ml-2 flex-1">Question Bank</Text>
      </View>

      <Text className="text-base font-semibold mb-1">Ques{index + 1}:</Text>
      <Text className="text-sm mb-2">{question.question}</Text>
      <View className="h-px bg-gray-300 mb-2" />

      {question.options.map((opt, idx) => (
        <TouchableOpacity key={idx} className={`flex-row items-center border border-gray-300 rounded-md py-2 px-2 mb-2 ${selectedOptions.includes(opt) ? 'border-blue-600' : ''}`} onPress={() => toggleOption(opt)}>
          <Checkbox status={selectedOptions.includes(opt) ? 'checked' : 'unchecked'} onPress={() => toggleOption(opt)} />
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}

      <View className="flex-row justify-center my-4">
        {Array.from({ length: total }).map((_, idx) => (
          <View key={idx} className={`w-9 h-9 rounded-full border border-blue-600 justify-center items-center mx-1 ${idx === index ? 'bg-blue-600' : ''}`}>
            <Text className={`${idx === index ? 'text-white' : 'text-blue-600'} font-medium`}>{idx + 1}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-gray-200 py-3 rounded-lg w-1/2 items-center" onPress={onBack}>
          <Text className="font-medium text-black">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 py-3 rounded-lg w-1/2 items-center" onPress={onNext}>
          <Text className="text-white font-medium">{index === total - 1 ? 'End' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
