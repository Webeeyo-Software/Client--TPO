import { View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from "components/ui/Header";

export default function Index() {
  return (
    <View className="flex-1 bg-white pt-[50px] px-4">
      {/* Header */}
      <Header title="Scheduled Companies" />
      {/* Message */}
      <View className="flex-row items-center justify-center mt-[350px]">
        <MaterialCommunityIcons name="alert" size={22} color="#dad618ff" style={{ marginRight: 8 }} />
        <Text className="text-[20px] text-red-600">
          No Companies are scheduled this time..!
        </Text>
      </View>
    </View>
  );
}
