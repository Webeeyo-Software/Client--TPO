import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import PrimaryButton from "components/ui/PrimaryButton";
interface CompanyCardProps {
  logo: any;
  name: string;
  role: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logo, name, role }) => {
  const router = useRouter();
  return (
    <View className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 h-40">
      <View className="flex-row items-center">
        <Image source={logo} className="w-12 h-12 mr-3" resizeMode="contain" />
        <View className="flex-1">
          <Text className="text-base font-semibold">{name}</Text>
          <Text className="text-sm text-gray-500">{role}</Text>
        </View>
      </View>

      <View>
        <PrimaryButton label="Practice" onPress={()=>{router.push('screens/questionsBank/QuestionScreen')}}/>
      </View>
    </View>
  );
};

export default CompanyCard;
