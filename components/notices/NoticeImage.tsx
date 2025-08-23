import React from "react";
import { Image, View } from "react-native";

interface NoticeImageProps {
  source: any;
}

export default function NoticeImage({ source }: NoticeImageProps) {
  return (
    <View className="bg-white p-3 mx-4 mt-4 rounded-xl shadow-md border border-gray-200">
      <Image
        source={source}
        className="w-full h-48 rounded-lg"
        resizeMode="contain"
      />
    </View>
  );
}
