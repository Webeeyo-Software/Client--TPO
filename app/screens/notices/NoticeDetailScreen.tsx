import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SectionHeader } from "components/applications/companyDetails/SectionHeader";
import Header from "components/ui/Header"; 
import NoticeImage from "components/notices/NoticeImage";
import DescriptionItem from "components/notices/DescriptionItem";

export default function NoticeScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-12">
        <Header title="Notice Details" mode="normal"/>

      <ScrollView showsVerticalScrollIndicator={false}>
        <NoticeImage source={require("../../../assets/images/1.jpg")} />

        <View className="px-4 mt-6">
          <Text className="text-lg font-semibold text-blue-600 mb-4">
            Description
          </Text>

          <DescriptionItem
            title="1. Exam Schedule"
            content="View the detailed exam timetable for the upcoming end-semester exams. Check your exam centers, dates, and times."
          />
          <DescriptionItem
            title="2. Assignment Submission"
            content="Submit your assignments for Semester 2 on or before February 28, 2023. Late submissions will incur a penalty."
          />
          <DescriptionItem
            title="3. Project Presentations"
            content="Computer Science students, prepare for your final project presentations on April 5, 2023. Check the presentation schedule and guidelines."
          />
          <DescriptionItem
            title="4. Cultural Festival"
            content="Join us for a vibrant celebration of music, dance, food, and culture from around the world. Date: March 12, 2023."
          />
        </View>
      </ScrollView>
    </View>
  );
}
