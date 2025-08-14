
import { View, Text, Image, TouchableOpacity } from "react-native";

interface CompanyCardProps {
  name: string;
  type: string;
  logo: string;
  onPress: () => void;
}

export default function CompanyCard({ name, type, logo, onPress }: CompanyCardProps) {
  return (
    <View className="bg-blue-50 rounded-xl p-4 mb-4">
      <View className="flex-row items-center mb-3">
        <Image source={{ uri: logo }} className="w-10 h-10 mr-3" resizeMode="contain" />
        <View>
          <Text className="text-base font-semibold">{name}</Text>
          <Text className="text-sm text-gray-400 mt-1">{type}</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-blue-600 rounded-lg py-3 items-center" onPress={onPress}>
        <Text className="text-white font-semibold text-base">Practice</Text>
      </TouchableOpacity>
    </View>
  );
}
