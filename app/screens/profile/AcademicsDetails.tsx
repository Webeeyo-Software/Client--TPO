// screens/AcademicDetails.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "components/ui/Header";
import api from "utils/authApi";
import PrimaryButton from "components/ui/PrimaryButton";
import InputField from "components/ui/InputField";

type AcademicDetailsProps = {
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
};

const AcademicDetailsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false); // for fetch
  const [saving, setSaving] = useState<boolean>(false); // for save
  const [academicDetails, setAcademicDetails] = useState<AcademicDetailsProps>({
    highestQualification: "",
    sscPercent: 0,
    sscBoard: "",
    sscInstitute: "",
    sscYear: 0,
    hscPercent: 0,
    hscBoard: "",
    hscInstitute: "",
    hscYear: 0,
    diplomaPercent: 0,
    diplomaBoard: "",
    diplomaYear: 0,
    diplomaInstitute: "",
    graduationCPI: 0,
    graduationPercent: 0,
    graduationYear: 0,
    graduationInstitute: "",
    graduationUniversity: "",
    postGraduationCPI: 0,
    isDirectSecondYear: false,
    isGoingForHigherStudies: false,
    isInterestedOnlyInInternship: false,
  });

  // TODO: replace hardcoded value with context/props later
  const registrationNo = "122102";

  const handleChange = (field: keyof AcademicDetailsProps, value: string | number | boolean) => {
    setAcademicDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchAcademicDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/AcademicDetails/${registrationNo}`);
      const details = response.data.data; // ✅ FIX: correct path
      console.log("Fetched academic details:", details);
      if (details) {
        setAcademicDetails({
          highestQualification: details.highestQualification || "",
          sscPercent: details.sscPercent || 0,
          sscBoard: details.sscBoard || "",
          sscInstitute: details.sscInstitute || "",
          sscYear: details.sscYear || 0,
          hscPercent: details.hscPercent || 0,
          hscBoard: details.hscBoard || "",
          hscInstitute: details.hscInstitute || "",
          hscYear: details.hscYear || 0,
          diplomaPercent: details.diplomaPercent || 0,
          diplomaBoard: details.diplomaBoard || "",
          diplomaYear: details.diplomaYear || 0,
          diplomaInstitute: details.diplomaInstitute || "",
          graduationCPI: details.graduationCPI || 0,
          graduationPercent: details.graduationPercent || 0,
          graduationYear: details.graduationYear || 0,
          graduationInstitute: details.graduationInstitute || "",
          graduationUniversity: details.graduationUniversity || "",
          postGraduationCPI: details.postGraduationCPI || 0,
          isDirectSecondYear: details.isDirectSecondYear || false,
          isGoingForHigherStudies: details.isGoingForHigherStudies || false,
          isInterestedOnlyInInternship: details.isInterestedOnlyInInternship || false,
        });
      } else {
        Alert.alert("No academic details found");
      }
    } catch (error) {
      console.error("Error fetching academic details:", error);
      Alert.alert("Error fetching academic details");
    } finally {
      setLoading(false);
    }
  };

  const saveAcademicDetails = async () => {
    setSaving(true);
    try {
      const payload = { ...academicDetails };
      const { data } = await api.put(
        `/api/AcademicDetails/${registrationNo}`,
        payload
      );
      if (data && data.message) {
        Alert.alert("Academic details saved successfully", data.message);
      } else {
        Alert.alert("Failed to save academic details");
      }
    } catch (error) {
      console.error("Error saving academic details:", error);
      Alert.alert("Error saving academic details");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchAcademicDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!academicDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No academic details found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Header title="Academic Details" />

      {/* Editable fields */}
      <View className="mb-3">
        <InputField
          label="Highest Qualification"
          value={academicDetails.highestQualification || ""}
          onChangeText={(text) => handleChange("highestQualification", text)}
        />
        <InputField
          label="SSC Percentage"
          value={String(academicDetails.sscPercent ?? "")}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleChange("sscPercent", Number(text) || 0)
          }
        />
        <InputField
          label="HSC Percentage"
          value={String(academicDetails.hscPercent ?? "")}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleChange("hscPercent", Number(text) || 0)
          }
        />
        <InputField
          label="Diploma Percentage"
          value={String(academicDetails.diplomaPercent ?? "")}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleChange("diplomaPercent", Number(text) || 0)
          }
        />
        <InputField
          label="Graduation Latest CPI"
          value={String(academicDetails.graduationCPI ?? "")}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleChange("graduationCPI", Number(text) || 0)
          }
        />
        <InputField
          label="Post Graduation CPI"
          value={String(academicDetails.postGraduationCPI ?? "")}
          keyboardType="numeric"
          onChangeText={(text) =>
            handleChange("postGraduationCPI", Number(text) || 0)
          }
        />
      </View>

      {/* SSC */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">SSC</Text>
        <Text>Board: {academicDetails.sscBoard || "N/A"}</Text>
        <Text>Institute: {academicDetails.sscInstitute || "N/A"}</Text>
        <Text>Percentage: {academicDetails.sscPercent ?? "N/A"}</Text>
        <Text>Year: {academicDetails.sscYear || "N/A"}</Text>
      </View>

      {/* HSC */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">HSC</Text>
        <Text>Board: {academicDetails.hscBoard || "N/A"}</Text>
        <Text>Institute: {academicDetails.hscInstitute || "N/A"}</Text>
        <Text>Percentage: {academicDetails.hscPercent ?? "N/A"}</Text>
        <Text>Year: {academicDetails.hscYear || "N/A"}</Text>
      </View>

      {/* Diploma */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Diploma</Text>
        <Text>Board: {academicDetails.diplomaBoard || "N/A"}</Text>
        <Text>Institute: {academicDetails.diplomaInstitute || "N/A"}</Text>
        <Text>Percentage: {academicDetails.diplomaPercent ?? "N/A"}</Text>
        <Text>Year: {academicDetails.diplomaYear || "N/A"}</Text>
      </View>

      {/* Graduation */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Graduation</Text>
        <Text>University: {academicDetails.graduationUniversity || "N/A"}</Text>
        <Text>Institute: {academicDetails.graduationInstitute || "N/A"}</Text>
        <Text>CPI: {academicDetails.graduationCPI ?? "N/A"}</Text>
        <Text>Percentage: {academicDetails.graduationPercent ?? "N/A"}</Text>
        <Text>Year: {academicDetails.graduationYear || "N/A"}</Text>
      </View>

      {/* Post Graduation */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-4 shadow">
        <Text className="font-bold text-blue-600 mb-2">Post Graduation</Text>
        <Text>CPI: {academicDetails.postGraduationCPI ?? "N/A"}</Text>
      </View>

      {/* Toggles */}
      <View className="mt-4 space-y-2">
        <View className="flex-row items-center justify-between">
          <Text>Direct Second Year?</Text>
          <Switch
            value={academicDetails.isDirectSecondYear || false}
            onValueChange={(val) => handleChange("isDirectSecondYear", val)}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Going for Higher Studies?</Text>
          <Switch
            value={academicDetails.isGoingForHigherStudies || false}
            onValueChange={(val) => handleChange("isGoingForHigherStudies", val)}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text>Interested only in Internship?</Text>
          <Switch
            value={academicDetails.isInterestedOnlyInInternship || false}
            onValueChange={(val) =>
              handleChange("isInterestedOnlyInInternship", val)
            }
          />
        </View>
      </View>

      <PrimaryButton
        label={saving ? "Saving..." : "Save"}
        onPress={saveAcademicDetails}
        
      />
    </ScrollView>
  );
};

export default AcademicDetailsScreen;
