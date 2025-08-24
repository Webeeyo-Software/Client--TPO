import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface UploadBoxProps {
  fileName?: string;
  onUpload: () => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ fileName, onUpload }) => {
  return (
    <View className="mb-5 mt-5">
      {/* Description text */}
      <Text className="text-sm text-gray-600 mb-5">
        Please upload your offer letter to complete your profile.
      </Text>

      {/* Heading text */}
      <View className="mb-5">
        <Text className="text-2xl font-bold text-center">
          Upload a PDF of your Offer Letter
        </Text>
        <Text className="text-center mt-2 text-gray-600">
          to complete your profile
        </Text>
      </View>

      {/* Upload button */}
      <TouchableOpacity
        className="bg-[#007BFF] py-3 rounded-md items-center mb-8"
        onPress={onUpload}
      >
        <Text className="text-white text-lg font-bold">
          {fileName || "Upload PDF"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadBox;