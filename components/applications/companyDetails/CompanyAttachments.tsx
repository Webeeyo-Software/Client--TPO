import { View, Text, TouchableOpacity } from "react-native";
import { DocumentTextIcon } from "react-native-heroicons/outline";
import React from "react";

type Props = {
  attachments: { name: string }[];
};

export const CompanyAttachments = ({ attachments }: Props) => {
  return (
    <View className="gap-3 mt-2">
      {attachments.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          className="flex-row items-center gap-3 p-3 border border-gray-200 rounded-lg"
        >
          <DocumentTextIcon size={22} color="#4B5563" />
          <Text className="text-gray-800 text-sm">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
