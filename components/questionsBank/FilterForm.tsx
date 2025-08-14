// // FilterForm.tsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Picker as RNPicker } from '@react-native-picker/picker';

// type FilterFormProps = {
//   onProceed: (filters: {
//     company: string;
//     round: string;
//     questionType: string;
//     questionStatus: string;
//   }) => void;
// };

// export default function FilterForm({ onProceed }: FilterFormProps) {
//   const [company, setCompany] = useState('All');
//   const [round, setRound] = useState('All');
//   const [questionType, setQuestionType] = useState('All');
//   const [questionStatus, setQuestionStatus] = useState('All');

//   const handleProceed = () => {
//     onProceed({ company, round, questionType, questionStatus });
//   };

//   return (
//     <View className="flex-1 bg-white p-5">
//       <Text className="text-lg font-semibold mb-5">Question Bank</Text>

//       <Text className="text-sm mt-2 mb-1">Choose Company</Text>
//       <View className="border border-gray-300 rounded-lg mb-2">
//         <RNPicker selectedValue={company} onValueChange={setCompany}>
//           <RNPicker.Item label="All" value="All" />
//           <RNPicker.Item label="Google" value="Google" />
//           <RNPicker.Item label="Amazon" value="Amazon" />
//         </RNPicker>
//       </View>

//       <Text className="text-sm mt-2 mb-1">Round</Text>
//       <View className="border border-gray-300 rounded-lg mb-2">
//         <RNPicker selectedValue={round} onValueChange={setRound}>
//           <RNPicker.Item label="All" value="All" />
//           <RNPicker.Item label="Round 1" value="Round1" />
//           <RNPicker.Item label="Round 2" value="Round2" />
//         </RNPicker>
//       </View>

//       <Text className="text-sm mt-2 mb-1">Question type</Text>
//       <View className="border border-gray-300 rounded-lg mb-2">
//         <RNPicker selectedValue={questionType} onValueChange={setQuestionType}>
//           <RNPicker.Item label="All" value="All" />
//           <RNPicker.Item label="Technical" value="Technical" />
//           <RNPicker.Item label="HR" value="HR" />
//         </RNPicker>
//       </View>

//       <Text className="text-sm mt-2 mb-1">Question status</Text>
//       <View className="border border-gray-300 rounded-lg mb-2">
//         <RNPicker selectedValue={questionStatus} onValueChange={setQuestionStatus}>
//           <RNPicker.Item label="All" value="All" />
//           <RNPicker.Item label="Answered" value="Answered" />
//           <RNPicker.Item label="Pending" value="Pending" />
//         </RNPicker>
//       </View>

//       <TouchableOpacity className="bg-blue-600 py-4 rounded-lg mt-5" onPress={handleProceed}>
//         <Text className="text-white text-center font-semibold text-base">Proceed</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }




// FilterForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

type FilterFormProps = {
  onProceed: (filters: {
    company: string;
    round: string;
    questionType: string;
    questionStatus: string;
  }) => void;
};

export default function FilterForm({ onProceed }: FilterFormProps) {
  const [company, setCompany] = useState('All');
  const [round, setRound] = useState('All');
  const [questionType, setQuestionType] = useState('All');
  const [questionStatus, setQuestionStatus] = useState('All');

  const handleProceed = () => {
    onProceed({ company, round, questionType, questionStatus });
  };

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-lg font-semibold mb-5">Question Bank</Text>

      <Text className="text-sm mt-2 mb-1">Choose Company</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <RNPicker selectedValue={company} onValueChange={setCompany}>
          <RNPicker.Item label="All" value="All" />
          <RNPicker.Item label="Google" value="Google" />
          <RNPicker.Item label="Amazon" value="Amazon" />
        </RNPicker>
      </View>

      <Text className="text-sm mt-2 mb-1">Round</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <RNPicker selectedValue={round} onValueChange={setRound}>
          <RNPicker.Item label="All" value="All" />
          <RNPicker.Item label="Round 1" value="Round1" />
          <RNPicker.Item label="Round 2" value="Round2" />
        </RNPicker>
      </View>

      <Text className="text-sm mt-2 mb-1">Question type</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <RNPicker selectedValue={questionType} onValueChange={setQuestionType}>
          <RNPicker.Item label="All" value="All" />
          <RNPicker.Item label="Technical" value="Technical" />
          <RNPicker.Item label="HR" value="HR" />
        </RNPicker>
      </View>

      <Text className="text-sm mt-2 mb-1">Question status</Text>
      <View className="border border-gray-300 rounded-lg mb-2">
        <RNPicker selectedValue={questionStatus} onValueChange={setQuestionStatus}>
          <RNPicker.Item label="All" value="All" />
          <RNPicker.Item label="Answered" value="Answered" />
          <RNPicker.Item label="Pending" value="Pending" />
        </RNPicker>
      </View>

      <TouchableOpacity className="bg-blue-600 py-4 rounded-lg mt-5" onPress={handleProceed}>
        <Text className="text-white text-center font-semibold text-base">Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

