import Header from "components/ui/Header";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import InputField from "components/ui/InputField";
import api from "utils/authApi";

type ExaminationDetails = {
  academicYear: string;
  semester: string | number;
  cpi: string;
  spi: string;
  deadBacklog: number;
  activeBacklog: number;
  backlogName: string;
  action: string;
};

const ExaminationDetailsScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [examinationDetails, setExaminationDetails] = useState<ExaminationDetails>({
    academicYear: "",
    semester: "",
    cpi: "",
    spi: "",
    deadBacklog: 0,
    activeBacklog: 0,
    backlogName: "",
    action: "",
  });

  // Example: ideally from logged-in session
  const registrationNo = "122101";

  const handleChange = (field: keyof ExaminationDetails, value: string | number) => {
    setExaminationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchExaminationDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/ExaminationDetails/${registrationNo}`);
      const details = response.data.data; // ✅ FIX: correct path
      console.log("Fetched details:", details);

      if (details) {
        setExaminationDetails({
          academicYear: details.academicYear ?? "",
          semester: details.semester?.toString() ?? "",
          cpi: details.cpi?.toString() ?? "",
          spi: details.spi?.toString() ?? "",
          deadBacklog: details.deadBacklog ?? 0,
          activeBacklog: details.activeBacklog ?? 0,
          backlogName: details.backlogName ?? "",
          action: details.action ?? "",
        });
      } else {
        Alert.alert("Info", "No examination details found");
      }
    } catch (error) {
      console.error("Error fetching examination details:", error);
      Alert.alert("Error", "Failed to fetch examination details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExaminationDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="px-2 mt-8">
      {/* Header */}
      <View className="px-4 mt-2 mb-0">
        <Header title="Examination Details" />

        {/* CPI */}
        <InputField
          label="Current Degree Latest CPI"
          placeholder="Enter your CPI"
          value={examinationDetails.cpi}
          onChangeText={(text) => handleChange("cpi", text)}
          required
        />

        {/* SPI */}
        <InputField
          label="Current Degree Latest SPI"
          placeholder="Enter your SPI"
          value={examinationDetails.spi}
          onChangeText={(text) => handleChange("spi", text)}
          required
        />

        {/* Dead Backlogs */}
        <InputField
          label="Dead Backlogs"
          placeholder="0"
          value={examinationDetails.deadBacklog.toString()}
          onChangeText={(text) =>
            handleChange("deadBacklog", isNaN(Number(text)) ? 0 : Number(text))
          }
          keyboardType="numeric"
        />

        {/* Active Backlogs */}
        <InputField
          label="Active Backlogs"
          placeholder="0"
          value={examinationDetails.activeBacklog.toString()}
          onChangeText={(text) =>
            handleChange("activeBacklog", isNaN(Number(text)) ? 0 : Number(text))
          }
          keyboardType="numeric"
        />
      </View>

      {/* Details Card */}
      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 mt-2 mb-2">
          <Text className="text-xl font-semibold mb-4">Examination Summary</Text>

          <Text className="text-base">Academic Year: {examinationDetails.academicYear || "-"}</Text>
          <Text className="text-base">Semester: {examinationDetails.semester || "-"}</Text>
          <Text className="text-base">CPI: {examinationDetails.cpi || "-"}</Text>
          <Text className="text-base">SPI: {examinationDetails.spi || "-"}</Text>
          <Text className="text-base">Dead Backlog: {examinationDetails.deadBacklog}</Text>
          <Text className="text-base">Active Backlog: {examinationDetails.activeBacklog}</Text>
          <Text className="text-base">Backlog Name: {examinationDetails.backlogName || "-"}</Text>
          <Text className="text-base">Action: {examinationDetails.action || "-"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExaminationDetailsScreen;