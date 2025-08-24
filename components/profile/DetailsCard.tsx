import React from "react";
import { TouchableOpacity, Text, Image,View,ScrollView } from "react-native";

interface DetailCardProps {
  label: string;
  onPress: () => void;
  
}

const DetailsCard: React.FC<DetailCardProps> = ({ label, onPress}) => {
  return (
  
 <View className="flex-row items-center justify-between px-4">
    <TouchableOpacity
      className="w-full mt-3 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4"
      onPress={onPress}
    >
    <Text className="text-lg font-semibold text-gray-800">{label}</Text>
      <Image
        source={require("../../assets/images/editing.png")}
        className="w-6 h-6 ml-2"
        resizeMode="contain"
      />
     
    </TouchableOpacity>
     </View>
    
  );
};

export default DetailsCard;