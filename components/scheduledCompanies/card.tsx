import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FileText, Clock, Building2 } from 'lucide-react-native';

interface JobCardProps {
  logo?: any;
  company: string;
  type: string;
  mode: string;
  date: string;
  onApply: () => void;
  onMore: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ logo, company, type, mode, date, onApply, onMore }) => {
  return (
    <View className="h-30 flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
      <View className="mr-4 flex h-20 w-20  items-center justify-center overflow-hidden rounded-xl">
        {logo ? (
          <Image source={logo} className="h-20 w-20" resizeMode="contain" />
        ) : (
          <Building2 size={32} color="#9ca3af" />
        )}
      </View>

      <View className="flex-1 justify-between">
        <View>
          <Text className="text-base font-semibold text-gray-900" numberOfLines={1}>
            {company}
          </Text>
          <Text className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
            {type}
          </Text>
        </View>

        <View className="mt-2 flex-row flex-wrap gap-y-1">
          <View className="mr-4 flex-row items-center">
            <FileText size={16} color="#6b7280" />
            <Text className="ml-1 text-xs text-gray-600">{mode}</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={16} color="#6b7280" />
            <Text className="ml-1 text-xs text-gray-600">{date}</Text>
          </View>
        </View>

        <View className="mt-3 flex-row gap-2">
          <TouchableOpacity
            className="flex-1 rounded-lg bg-blue-500 py-2 active:bg-blue-600"
            onPress={onApply}>
            <Text className="text-center font-medium text-white">Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-lg bg-gray-200 py-2 active:bg-gray-300"
            onPress={onMore}>
            <Text className="text-center font-medium text-gray-700">More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
