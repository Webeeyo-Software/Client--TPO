import Header from "components/ui/Header";
import React, { useState } from "react";
import InputField from "components/ui/InputField";
import { View,Text, ScrollView } from "react-native";
import ResultCard from "components/profile/ResultCard";
import BacklogStatus from "components/profile/BackLogStatus";

const ExaminationDetails = () => {
  const [Degree, setDegree] = useState("");
  
  
  return (
    <View className="px-2">
    <View className="px-4 mt-2 mb-0 ">
      <Header title="Examination Details"
       />
       <InputField
        label="Current Degree Latest CGPA/CPI"
        placeholder="Enter your CGPA/CPI"
        value={Degree}
        onChangeText={setDegree}
        required
        className=""
       />
       </View>
       <View className="mt-0">
        <BacklogStatus />
        </View>
      <ScrollView className="mt-4" 
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
       <ResultCard />
       <ResultCard />
       <ResultCard />
       </ScrollView>

    </View>
  );
};



export default ExaminationDetails;
