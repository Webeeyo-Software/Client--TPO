import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};


export const Pagination: React.FC<PaginationProps> = ({ current, total, onPageChange }) => {
  const pages = [1, 2, "...", total - 1, total];

  return (
    <View className="flex-row justify-center items-center mt-4 space-x-2 gap-5 pb-11">
      {pages.map((p, index) => (
        <TouchableOpacity
          key={index}
          disabled={p === "..."}
          onPress={() => typeof p === "number" && onPageChange(p)}
          className={`w-12 h-12 rounded-full justify-center items-center ${
            p === current ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text className={`${p === current ? "text-white" : "text-gray-700"} text-sm`}>{p}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
