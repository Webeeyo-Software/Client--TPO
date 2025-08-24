import Header from "components/ui/Header";
import React, { useState } from "react";
import InputField from "components/ui/InputField";
import { View,Text, ScrollView } from "react-native";
import ResultCard from "components/profile/ResultCard";
import BackLogStatus from "components/profile/BackLogStatus";

const ExaminationDetails = () => {
  const [Degree, setDegree] = useState("");
  
  
  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Examination Details" />
      <View className="mx-4 mt-4">
       <InputField
        label="Current Degree Latest CGPA/CPI"
        placeholder="Enter your CGPA/CPI"
        value={Degree}
        onChangeText={setDegree}
        required
        className=""
       />
       </View>
        <BackLogStatus />
      <ScrollView 
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