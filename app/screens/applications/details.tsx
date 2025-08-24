import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SectionHeader } from "../../../components/applications/companyDetails/SectionHeader";
import { CompanyAttachments } from "../../../components/applications/companyDetails/CompanyAttachments";
import { CriteriaItem } from "../../../components/applications/companyDetails/CriteriaItem";
import { SelectionProcedure } from "../../../components/applications/companyDetails/SelectionProcedure";
import { QAItem } from "../../../components/applications/companyDetails/QAItem";
import { CompanyInfo } from "../../../components/applications/companyDetails/CompanyInfo";
import Header from "components/ui/Header";
export default function CompanyDetailsScreen() {
  return (
    <View className="flex-1 bg-white px-4 pt-12">
        <Header title="Details" mode="normal"/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SectionHeader title="Company Attachments" />
        <CompanyAttachments
          attachments={[
            { name: "Company Brochure" },
            { name: "Company Presentation" },
          ]}
        />

        <SectionHeader title="Instructions" />
        <Text className="text-gray-700 text-sm">
          Please note Online Assessment is on 10th June 2025 and Interview Drive
          on Friday, June 14th.
        </Text>

        <SectionHeader title="Company Criteria" />
        <View className="mt-1">
          <CriteriaItem label="CGPA" value="7.5" />
          <CriteriaItem label="Backlogs" value="0" />
          <CriteriaItem
            label="Eligible Branches"
            value="Computer Science, Information Technology"
          />
        </View>

        <SectionHeader title="Company Selection Procedure" />
        <SelectionProcedure
          rounds={[
            { round: "Round 1", detail: "Online Test" },
            { round: "Round 2", detail: "Technical Interview" },
            { round: "Round 3", detail: "HR Interview" },
          ]}
        />

        <SectionHeader title="Questions answered by You while applying" />
        <QAItem
          question="Why do you want to join this company?"
          answer="I am passionate about technology and innovation."
        />
        <QAItem
          question="What are your strengths and weaknesses?"
          answer="I am a quick learner and a team player."
        />
        <QAItem
          question="What are your career goals?"
          answer="I want to grow as a software engineer."
        />

        <SectionHeader title="Company Information And Criteria" />
        <CompanyInfo
          info={[
            { label: "Company Name", value: "Tech Solutions Inc." },
            { label: "Industry", value: "Technology" },
            { label: "Location", value: "New York" },
            { label: "Salary", value: "$80,000 - $100,000" },
            { label: "Job Role", value: "Software Engineer" },
          ]}
        />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-gray-200 p-4 gap-3">
        <TouchableOpacity className="flex-1 p-3 rounded-lg border border-gray-300">
          <Text className="text-gray-700 text-center font-medium">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 p-3 rounded-lg bg-blue-600">
          <Text className="text-white text-center font-medium">Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
