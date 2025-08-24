// screens/AcademicDetails.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

interface AcademicDetails {
  registrationNo: number;
  highestQualification?: string;

  sscPercent?: number;
  sscBoard?: string;
  sscInstitute?: string;
  sscYear?: number;

  hscPercent?: number;
  hscBoard?: string;
  hscInstitute?: string;
  hscYear?: number;

  diplomaPercent?: number;
  diplomaBoard?: string;
  diplomaYear?: number;
  diplomaInstitute?: string;

  graduationCPI?: number;
  graduationPercent?: number;
  graduationYear?: number;
  graduationInstitute?: string;
  graduationUniversity?: string;

  postGraduationCPI?: number;

  isDirectSecondYear?: boolean;
  isGoingForHigherStudies?: boolean;
  isInterestedOnlyInInternship?: boolean;
}

const AcademicDetailsScreen: React.FC<{ registrationNo: number }> = ({
  registrationNo,
}) => {
  const [data, setData] = useState<AcademicDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://your-backend-url/api/students/${registrationNo}/academic-details`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching academic details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [registrationNo]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No academic details found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Academics</Text>

      {/* Highest Qualification */}
      <View className="mb-3">
        <Text className="text-sm">Highest Qualification</Text>
        <TextInput
          value={data.highestQualification || ""}
          className="border border-gray-300 rounded-lg px-3 py-2"
          editable={false}
        />
      </View>

      {/* SSC */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">SSC</Text>
        <Text>Board: {data.sscBoard}</Text>
        <Text>Institute: {data.sscInstitute}</Text>
        <Text>Percentage: {data.sscPercent}</Text>
        <Text>Year: {data.sscYear}</Text>
      </View>

      {/* HSC */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">HSC</Text>
        <Text>Board: {data.hscBoard}</Text>
        <Text>Institute: {data.hscInstitute}</Text>
        <Text>Percentage: {data.hscPercent}</Text>
        <Text>Year: {data.hscYear}</Text>
      </View>

      {/* Diploma */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Diploma</Text>
        <Text>Board: {data.diplomaBoard}</Text>
        <Text>Institute: {data.diplomaInstitute}</Text>
        <Text>Percentage: {data.diplomaPercent}</Text>
        <Text>Year: {data.diplomaYear}</Text>
      </View>

      {/* Graduation */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Graduation</Text>
        <Text>University: {data.graduationUniversity}</Text>
        <Text>Institute: {data.graduationInstitute}</Text>
        <Text>CPI: {data.graduationCPI}</Text>
        <Text>Percentage: {data.graduationPercent}</Text>
        <Text>Year: {data.graduationYear}</Text>
      </View>

      {/* Post Graduation */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Post Graduation</Text>
        <Text>CPI: {data.postGraduationCPI}</Text>
      </View>

      {/* Toggles */}
      <View className="mt-4 space-y-2">
        <View className="flex-row items-center justify-between">
          <Text>Direct Second Year?</Text>
          <Switch value={data.isDirectSecondYear || false} />
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Going for Higher Studies?</Text>
          <Switch value={data.isGoingForHigherStudies || false} />
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Interested only in Internship?</Text>
          <Switch value={data.isInterestedOnlyInInternship || false} />
        </View>
      </View>

      {/* Freeze Button */}
      <TouchableOpacity className="mt-6 bg-blue-500 rounded-2xl py-3">
        <Text className="text-white text-center font-bold">Freeze</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AcademicDetailsScreen;
