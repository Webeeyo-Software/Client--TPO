import React from "react";
import { TouchableOpacity, Text, Image,View,ScrollView } from "react-native";

interface DetailCardProps {
  label: string;
  onPress: () => void;
  
}

const DetailsCard: React.FC<DetailCardProps> = ({ label, onPress}) => {
  return (
  
 <View className="flex-row items-center items-center justify-between px-4 border-b border-gray-200">
    <TouchableOpacity
      className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow-2xl w-full mt-4 "
      onPress={onPress}
    >
    <Text className="text-lg font-semibold text-gray-800">{label}</Text>
      <Image
        source={require("../../assets/images/editing.png")}
        className="w-8 h-8 ml-2"
        resizeMode="contain"
      />
     
    </TouchableOpacity>
     </View>
    
  );
};

export default DetailsCard;