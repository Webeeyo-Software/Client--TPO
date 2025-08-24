import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Switch, } from "react-native";
import CheckBox from "expo-checkbox";
import Header from "components/ui/Header";
import InputRow from "components/profile/inputRow";
import PrimaryButton from "components/ui/PrimaryButton";
import ProgressCard from "components/profile/ProgressCard";

export default function AcademicsScreen() {
  const [isDirectSecondYear, setIsDirectSecondYear] = useState(false);
  const [isHigherStudies, setIsHigherStudies] = useState(false);
  const [isInternshipOnly, setIsInternshipOnly] = useState(false);
  const [admission12th, setAdmission12th] = useState(false);
  const [admissionDiploma, setAdmissionDiploma] = useState(false);

  return (
     <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Academic Year" mode="normal" />
              <InputRow />

    <ScrollView  showsVerticalScrollIndicator={ false} className=" p-4 bg-white">

      <Text className="mt-3">Please select your admission 12th / Diploma</Text>
      <View className="flex-row items-center space-x-0">
        <View className="flex-row gap-14 mt-4">
          <View>
        <CheckBox value={admission12th} onValueChange={setAdmission12th} />
        <Text>12th</Text>
        </View>
        <View>
        <CheckBox className="pl-2" value={admissionDiploma} onValueChange={setAdmissionDiploma} />
        <Text>Diploma</Text>
        </View>
        </View>
      </View>
    <View className="mt-4">
     <View className="flex-row justify-between ">
        <Text>Is Direct Second Year admission?</Text>
        <Switch value={isDirectSecondYear} onValueChange={setIsDirectSecondYear} />
      </View>
      <View className="flex-row justify-between ">
        <Text>Are you going for higher studies?</Text>
        <Switch value={isHigherStudies} onValueChange={setIsHigherStudies} />
      </View>
      <View className="flex-row justify-between">
        <Text>Are you Interested only in Internship?</Text>
        <Switch value={isInternshipOnly} onValueChange={setIsInternshipOnly} />
      </View>
      </View>
  
        <ProgressCard
          education="SSC"
          university="XYZ University"
          instituteName="ABC Institute"
          percentage="85%"
        passingYear="2022"
        highestQualification="SSC"
      />
      <ProgressCard
        education="Diploma"
        university="XYZ University"
        instituteName="ABC Institute"
        percentage="90%"
        passingYear="2024"
        highestQualification="Diploma"
      />
      <ProgressCard
        education="B.Tech"
        university="XYZ University"
        instituteName="ABC Institute"
        percentage="85%"
        passingYear="2022"
        highestQualification="B.Tech"
      />
      

    </ScrollView>
        <PrimaryButton label="Freeze" onPress={() => {}} />

    </View>
  );
}