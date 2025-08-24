import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "components/ui/Header";

const OfferLetterScreen: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<any>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.assets && result.assets.length > 0) {
        setPdfFile(result);
        const fileName = result.assets[0].name || "PDF";
        Alert.alert("PDF Selected", fileName);
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleSubmit = () => {
    if (!pdfFile) {
      Alert.alert("Please upload your Offer Letter PDF first!");
      return;
    }
    Alert.alert("Submitted!", "Your Offer Letter has been uploaded.");
  };

  return (
    <View className="flex-1 bg-white p-5">
      <Header 
       title="Upload Offer Letter" />

      <View className="items-center mb-8 mt-12" >
        <Ionicons name="document-text-outline" size={40} color="#1976D2" />
        <Text className="text-center mt-2 text-gray-600">
          Upload a PDF of your Offer Letter{"\n"}to complete your profile
        </Text>
      </View>

      <TouchableOpacity
        className="bg-[#1976D2] p-4 rounded-lg items-center mb-5"
        onPress={pickDocument}
      >
        <Text className="text-white font-bold">Upload PDF</Text>
      </TouchableOpacity>

      <View className="flex-row justify-around">
        <TouchableOpacity
          className="bg-[#1976D2] py-3 px-8 rounded-lg"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-gray-400 py-3 px-8 rounded-lg">
          <Text className="text-gray-800 font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferLetterScreen;