import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

// ---------- Company List Data ----------
const companies = [
  { id: '1', name: 'Microsoft Corporation', type: 'Placement', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { id: '2', name: 'Amazon.com, Inc.', type: 'Internship', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { id: '3', name: 'Cisco Systems, Inc.', type: 'Industrial Training', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg' },
  { id: '4', name: 'Google LLC', type: 'Internship + Placement', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
];

// ---------- Sample Questions ----------
const sampleQuestions = [
  { question: "What is the primary purpose of using a load balancer in a web application architecture?", options: ["To cache frequently accessed data", "To improve database performance", "To distribute incoming traffic across multiple servers", "To enhance security measures"] },
  { question: "Which protocol is commonly used for secure communication over the Internet?", options: ["HTTP", "HTTPS", "FTP", "SMTP"] },
  { question: "What is the main benefit of using a CDN (Content Delivery Network)?", options: ["Reduce website load times", "Improve security", "Host databases", "Enable offline access"] },
];

// ---------- Main App ----------
export default function QuestionBankApp() {
  const [currentScreen, setCurrentScreen] = useState<'filter' | 'list' | 'question' | 'result'>('filter');

  const renderCard = ({ item }: any) => (
    <View className="bg-blue-50 rounded-xl p-4 mb-4">
      <View className="flex-row items-center mb-3">
        <Image source={{ uri: item.logo }} className="w-10 h-10 mr-3" resizeMode="contain" />
        <View>
          <Text className="text-base font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-400 mt-1">{item.type}</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-blue-600 rounded-lg py-3 items-center" onPress={() => setCurrentScreen('question')}>
        <Text className="text-white font-semibold text-base">Practice</Text>
      </TouchableOpacity>
    </View>
  );

  if (currentScreen === 'filter') {
    return <QuestionBankScreen goNext={() => setCurrentScreen('list')} />;
  } else if (currentScreen === 'list') {
    return (
      <View className="flex-1 bg-white px-4">
        <View className="flex-row items-center my-4">
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text className="text-lg font-semibold ml-2">Question Bank</Text>
        </View>
        <FlatList data={companies} keyExtractor={(item) => item.id} renderItem={renderCard} contentContainerStyle={{ paddingBottom: 20 }} />
      </View>
    );
  } else if (currentScreen === 'question') {
    return <QuestionScreen goBack={() => setCurrentScreen('list')} goResult={() => setCurrentScreen('result')} />;
  } else {
    return <ResultScreen goBack={() => setCurrentScreen('list')} />;
  }
}

// ---------- Filter Screen ----------
function QuestionBankScreen({ goNext }: { goNext: () => void }) {
  const [company, setCompany] = useState('All');
  const [round, setRound] = useState('All');
  const [questionType, setQuestionType] = useState('All');
  const [questionStatus, setQuestionStatus] = useState('All');

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center mb-5">
        <Text className="text-lg font-semibold ml-2">Question Bank</Text>
      </View>

      <Text className="text-sm mt-2 mb-1">Choose Company</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <Picker selectedValue={company} onValueChange={setCompany}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Google" value="Google" />
          <Picker.Item label="Amazon" value="Amazon" />
        </Picker>
      </View>

      <Text className="text-sm mt-2 mb-1">Round</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <Picker selectedValue={round} onValueChange={setRound}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Round 1" value="Round1" />
          <Picker.Item label="Round 2" value="Round2" />
        </Picker>
      </View>

      <Text className="text-sm mt-2 mb-1">Question type</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <Picker selectedValue={questionType} onValueChange={setQuestionType}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Technical" value="Technical" />
          <Picker.Item label="HR" value="HR" />
        </Picker>
      </View>

      <Text className="text-sm mt-2 mb-1">Question status</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <Picker selectedValue={questionStatus} onValueChange={setQuestionStatus}>
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Answered" value="Answered" />
          <Picker.Item label="Pending" value="Pending" />
        </Picker>
      </View>

      <TouchableOpacity className="bg-blue-600 py-4 rounded-lg mt-5" onPress={goNext}>
        <Text className="text-white text-center font-semibold text-base">Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Question Screen ----------
function QuestionScreen({ goBack, goResult }: { goBack: () => void; goResult: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = sampleQuestions[currentIndex];

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptions([]);
    } else {
      goResult(); // Navigate to Result Screen
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={goBack}><Ionicons name="arrow-back" size={24} color="#000" /></TouchableOpacity>
        <Text className="text-lg font-semibold ml-2 flex-1">Question Bank</Text>
        <View className="flex-row items-center">
          <Ionicons name="timer-outline" size={20} color="#007BFF" />
          <Text className="ml-1 font-medium text-black">2 : 30</Text>
        </View>
      </View>

      <Text className="text-base font-semibold mb-1">Ques{currentIndex + 1}:</Text>
      <Text className="text-sm mb-2">{currentQuestion.question}</Text>
      <View className="h-px bg-gray-300 mb-2" />

      {currentQuestion.options.map((opt, idx) => (
        <TouchableOpacity key={idx} className={`flex-row items-center border border-gray-300 rounded-md py-2 px-2 mb-2 ${selectedOptions.includes(opt) ? 'border-blue-600' : ''}`} onPress={() => toggleOption(opt)}>
          <Checkbox status={selectedOptions.includes(opt) ? 'checked' : 'unchecked'} onPress={() => toggleOption(opt)} />
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}

      <View className="flex-row justify-center my-4">
        {sampleQuestions.map((_, idx) => (
          <TouchableOpacity key={idx} className={`w-9 h-9 rounded-full border border-blue-600 justify-center items-center mx-1 ${idx === currentIndex ? 'bg-blue-600' : ''}`}>
            <Text className={`${idx === currentIndex ? 'text-white' : 'text-blue-600'} font-medium`}>{idx + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-gray-200 py-3 rounded-lg w-1/2 items-center" onPress={goBack}>
          <Text className="font-medium text-black">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 py-3 rounded-lg w-1/2 items-center" onPress={handleNext}>
          <Text className="text-white font-medium">{currentIndex === sampleQuestions.length - 1 ? 'End' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- Result Screen ----------
function ResultScreen({ goBack }: { goBack: () => void }) {
  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-600 items-center justify-center pt-10 pb-16">
        <View className="w-56 h-56 rounded-full bg-white/20 items-center justify-center">
          <View className="w-44 h-44 rounded-full bg-white/30 items-center justify-center">
            <View className="w-36 h-36 rounded-full bg-white items-center justify-center">
              <Text className="text-blue-600 font-medium text-base">Total Score</Text>
              <Text className="text-blue-600 font-bold text-4xl">6</Text>
              <Text className="text-blue-600 text-base">Out Of 10</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white mx-5 -mt-10 rounded-xl p-4 shadow">
        <View className="flex-row items-center mb-1">
          <Text className="text-blue-600 text-2xl mr-1">•</Text>
          <Text className="text-lg font-semibold mr-1">100%</Text>
          <Text className="text-sm text-gray-400">Completion</Text>
        </View>
        <View className="flex-row items-center mb-1">
          <Text className="text-blue-600 text-2xl mr-1">•</Text>
          <Text className="text-lg font-semibold mr-1">10</Text>
          <Text className="text-sm text-gray-400">Total Questions</Text>
        </View>
        <View className="flex-row justify-between w-4/5 mt-2">
          <Text className="text-green-600 font-medium text-sm">6 Correct</Text>
          <Text className="text-red-600 font-medium text-sm">4 Incorrect</Text>
        </View>
      </View>

      <View className="flex-row justify-between mx-5 mt-5">
        <TouchableOpacity className="bg-white border border-gray-300 rounded-lg py-3 px-4 shadow">
          <Text className="font-semibold text-black">Review Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row bg-blue-600 rounded-lg py-3 px-4 items-center">
          <Ionicons name="share-social-outline" size={18} color="#fff" className="mr-1" />
          <Text className="text-white font-semibold">Share Score</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-blue-600 mx-5 rounded-lg py-4 items-center mt-5" onPress={goBack}>
        <Text className="text-white font-semibold text-base">Done</Text>
      </TouchableOpacity>
    </View>
  );
}




























// // QuestionBankApp.tsx
// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Checkbox } from 'react-native-paper';
// import FilterForm from '../../../components/questionsBank/FilterForm';
// import QuestionCard from '../../../components/questionsBank/QuestionCard'; // import the reusable QuestionCard

// // ---------- Company List Data ----------
// const companies = [
//   { id: '1', name: 'Microsoft Corporation', type: 'Placement', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
//   { id: '2', name: 'Amazon.com, Inc.', type: 'Internship', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
//   { id: '3', name: 'Cisco Systems, Inc.', type: 'Industrial Training', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg' },
//   { id: '4', name: 'Google LLC', type: 'Internship + Placement', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
// ];

// // ---------- Sample Questions ----------
// export const sampleQuestions = [
//   { question: "What is the primary purpose of using a load balancer in a web application architecture?", options: ["To cache frequently accessed data", "To improve database performance", "To distribute incoming traffic across multiple servers", "To enhance security measures"] },
//   { question: "Which protocol is commonly used for secure communication over the Internet?", options: ["HTTP", "HTTPS", "FTP", "SMTP"] },
//   { question: "What is the main benefit of using a CDN (Content Delivery Network)?", options: ["Reduce website load times", "Improve security", "Host databases", "Enable offline access"] },
// ];

// // ---------- QuestionScreen Wrapper ----------
// function QuestionScreen({ goBack, goResult }: { goBack: () => void; goResult: () => void }) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < sampleQuestions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       goResult();
//     }
//   };

//   return (
//     <QuestionCard
//       question={sampleQuestions[currentIndex]}
//       index={currentIndex}
//       total={sampleQuestions.length}
//       onNext={handleNext}
//       onBack={goBack}
//     />
//   );
// }

// // ---------- Main App ----------
// export default function QuestionBankApp() {
//   const [currentScreen, setCurrentScreen] = useState<'filter' | 'list' | 'question' | 'result'>('filter');

//   const renderCard = ({ item }: any) => (
//     <View className="bg-blue-50 rounded-xl p-4 mb-4">
//       <View className="flex-row items-center mb-3">
//         <Image source={{ uri: item.logo }} className="w-10 h-10 mr-3" resizeMode="contain" />
//         <View>
//           <Text className="text-base font-semibold">{item.name}</Text>
//           <Text className="text-sm text-gray-400 mt-1">{item.type}</Text>
//         </View>
//       </View>
//       <TouchableOpacity className="bg-blue-600 rounded-lg py-3 items-center" onPress={() => setCurrentScreen('question')}>
//         <Text className="text-white font-semibold text-base">Practice</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (currentScreen === 'filter') {
//     return (
//       <FilterForm
//         onProceed={(filters) => {
//           console.log('Selected Filters:', filters);
//           setCurrentScreen('list');
//         }}
//       />
//     );
//   } else if (currentScreen === 'list') {
//     return (
//       <View className="flex-1 bg-white px-4">
//         <View className="flex-row items-center my-4">
//           <Ionicons name="arrow-back" size={24} color="#000" />
//           <Text className="text-lg font-semibold ml-2">Question Bank</Text>
//         </View>
//         <FlatList data={companies} keyExtractor={(item) => item.id} renderItem={renderCard} contentContainerStyle={{ paddingBottom: 20 }} />
//       </View>
//     );
//   } else if (currentScreen === 'question') {
//     return <QuestionScreen goBack={() => setCurrentScreen('list')} goResult={() => setCurrentScreen('result')} />;
//   } else {
//     return <ResultScreen goBack={() => setCurrentScreen('list')} />;
//   }
// }

// // ---------- Result Screen ----------
// function ResultScreen({ goBack }: { goBack: () => void }) {
//   return (
//     <View className="flex-1 bg-white">
//       <View className="bg-blue-600 items-center justify-center pt-10 pb-16">
//         <View className="w-56 h-56 rounded-full bg-white/20 items-center justify-center">
//           <View className="w-44 h-44 rounded-full bg-white/30 items-center justify-center">
//             <View className="w-36 h-36 rounded-full bg-white items-center justify-center">
//               <Text className="text-blue-600 font-medium text-base">Total Score</Text>
//               <Text className="text-blue-600 font-bold text-4xl">6</Text>
//               <Text className="text-blue-600 text-base">Out Of 10</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View className="bg-white mx-5 -mt-10 rounded-xl p-4 shadow">
//         <View className="flex-row items-center mb-1">
//           <Text className="text-blue-600 text-2xl mr-1">•</Text>
//           <Text className="text-lg font-semibold mr-1">100%</Text>
//           <Text className="text-sm text-gray-400">Completion</Text>
//         </View>
//         <View className="flex-row items-center mb-1">
//           <Text className="text-blue-600 text-2xl mr-1">•</Text>
//           <Text className="text-lg font-semibold mr-1">10</Text>
//           <Text className="text-sm text-gray-400">Total Questions</Text>
//         </View>
//         <View className="flex-row justify-between w-4/5 mt-2">
//           <Text className="text-green-600 font-medium text-sm">6 Correct</Text>
//           <Text className="text-red-600 font-medium text-sm">4 Incorrect</Text>
//         </View>
//       </View>

//       <View className="flex-row justify-between mx-5 mt-5">
//         <TouchableOpacity className="bg-white border border-gray-300 rounded-lg py-3 px-4 shadow">
//           <Text className="font-semibold text-black">Review Answer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row bg-blue-600 rounded-lg py-3 px-4 items-center">
//           <Ionicons name="share-social-outline" size={18} color="#fff" className="mr-1" />
//           <Text className="text-white font-semibold">Share Score</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity className="bg-blue-600 mx-5 rounded-lg py-4 items-center mt-5" onPress={goBack}>
//         <Text className="text-white font-semibold text-base">Done</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
