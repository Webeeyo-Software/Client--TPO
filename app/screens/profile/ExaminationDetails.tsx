import Header from "components/ui/Header";
import React, { useState, useEffect } from "react";
import InputField from "components/ui/InputField";
import { View, Text, ScrollView, ActivityIndicator,TextInput } from "react-native";
import ResultCard from "components/profile/ResultCard";

import axios from "axios";
const BASE_URL = "http://192.168.1.30:3000";

const ExaminationDetails = () => {
    const [dead, setDead] = useState("");
    const [active, setActive] = useState("");
    
  const [loading, setLoading] = useState(true);
  const [degreeDetails, setDegreeDetails] = useState({
    degree: "",
    cgpa: "",
    backlogs: [],
    results: [],
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchExaminationDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile/examination-details/122102");
        // Assuming response.data has: { degree, cgpa, backlogs: [], results: [] }
        setDegreeDetails(response.data);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      } finally {
        setLoading(false);
      }
    };

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
    <View className="px-2">
    <View className="px-4 mt-2 mb-0 ">
      <Header title="Examination Details" />
       <InputField
        label="Current Degree Latest CGPA/CPI"
        placeholder="Enter your CGPA/CPI"
        value={dead}
        onChangeText={setDead}
        required
        className=""
       />
       </View>
       <View className="mt-0">
        
        </View>
      <ScrollView className="mt-4" 
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
        {degreeDetails.results.length > 0 ? (
          degreeDetails.results.map((result, index) => (
            <ResultCard key={index} />
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-4">
            No results available.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ExaminationDetails;
