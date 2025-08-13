import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FileText, Clock } from "lucide-react-native";

interface JobCardProps {
  logo: any;
  company: string;
  type: string;
  mode: string;
  date: string;
  onApply: () => void;
  onMore: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  logo,
  company,
  type,
  mode,
  date,
  onApply,
  onMore,
}) => {
  return (
    <View className="bg-white rounded-xl p-4 shadow flex-row items-start gap-4 mb-4">
      {/* Logo */}
      <Image source={logo} className="w-20 h-20 mr-4" resizeMode="contain" />

      {/* Details */}
      <View className="flex-1">
        <Text className="text-lg font-bold">{company}</Text>
        <Text className="text-gray-500">{type}</Text>

        {/* Mode */}
        <View className="flex-row items-center mt-1">
          <FileText size={16} color="#9ca3af" className="mr-2" />
          <Text className="text-gray-500 text-sm">{mode}</Text>
        </View>

        {/* Date */}
        <View className="flex-row items-center mt-1">
          <Clock size={16} color="#9ca3af" className="mr-2" />
          <Text className="text-gray-500 text-sm">{date}</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row mt-3 space-x-3 gap-2">
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={onApply}
          >
            <Text className="text-white font-semibold">Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onPress={onMore}
          >
            <Text className="text-gray-700 font-semibold">more</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default JobCard;
