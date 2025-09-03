// screens/AboutUs.tsx
import React from "react";
import { View, Text, ScrollView, Linking, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function AboutUs() {
  return (
    <ScrollView className="flex-1 bg-white px-5 py-6">
      {/* Header */}
      <View className="items-center mb-6">
        <Text className="text-2xl font-bold text-blue-600">About Us</Text>
        <Text className="text-center text-gray-600 mt-2">
          Training & Placement Cell (TPO)
        </Text>
      </View>

      {/* Vision */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow">
        <View className="flex-row items-center mb-2">
          <Ionicons name="bulb-outline" size={22} color="#f59e0b" />
          <Text className="ml-2 font-semibold text-gray-800">Our Vision</Text>
        </View>
        <Text className="text-gray-600">
          To empower students with the skills and confidence to excel in the
          competitive job market.
        </Text>
      </View>

      {/* What We Do */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow">
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="work-outline" size={22} color="#2563eb" />
          <Text className="ml-2 font-semibold text-gray-800">What We Do</Text>
        </View>
        <View className="mt-1 space-y-2">
          <Text className="text-gray-600"> Career guidance & counseling</Text>
          <Text className="text-gray-600"> Soft skills and aptitude training</Text>
          <Text className="text-gray-600"> Internship & placement opportunities</Text>
          <Text className="text-gray-600"> Industry interactions and workshops</Text>
        </View>
      </View>

      {/* Portal Benefits */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow">
        <View className="flex-row items-center mb-2">
          <Entypo name="network" size={22} color="#16a34a" />
          <Text className="ml-2 font-semibold text-gray-800">TPO Portal Benefits</Text>
        </View>
        <View className="mt-1 space-y-2">
          <Text className="text-gray-600">Placement updates & notifications</Text>
          <Text className="text-gray-600">Online registration for drives</Text>
          <Text className="text-gray-600">Student profile management</Text>
          <Text className="text-gray-600">Recruiter access for hiring</Text>
        </View>
      </View>

      {/* Contact Section */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow">
        <View className="flex-row items-center mb-2">
          <FontAwesome5 name="address-card" size={20} color="#dc2626" />
          <Text className="ml-2 font-semibold text-gray-800">Contact Us</Text>
        </View>
        <Text className="text-gray-600">📍 Training & Placement Office, XYZ Institute</Text>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:TPO@example.com")}
        >
          <Text className="text-blue-600 underline mt-1">📧 TPO@example.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("tel:+911234567890")}
        >
          <Text className="text-blue-600 underline mt-1">📞 +91 12345 XXXXX</Text>
        </TouchableOpacity>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        className="bg-blue-600 rounded-2xl py-3 items-center shadow mt-4"
        onPress={() => alert("Navigate to Registration Page")}
      >
        <Text className="text-white font-semibold text-lg">
          Register for Placement Drives →
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
