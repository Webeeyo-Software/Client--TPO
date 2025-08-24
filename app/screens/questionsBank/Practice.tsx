import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import CompanyCard from "components/questionsBank/CompanyCard";
import Header from "components/ui/Header";
const QuestionBankScreen = () => {
  const companies = [
    {
      id: "1",
      name: "Microsoft Corporation",
      role: "Placement",
      logo: require("../../../assets/images/micro.png"),
    },
    {
      id: "2",
      name: "Amazon.com, Inc.",
      role: "Internship",
      logo: require("../../../assets/images/micro.png"),
    },
    {
      id: "3",
      name: "Cisco Systems, Inc.",
      role: "Industrial Training",
      logo: require("../../../assets/images/micro.png"),
    },
    {
      id: "4",
      name: "Google LLC",
      role: "Internship + Placement",
      logo: require("../../../assets/images/micro.png"),
    },
  ];

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title='Companies for Practice'/>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 , paddingTop:10, marginHorizontal:7}}
        showsVerticalScrollIndicator={false}
      >
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </ScrollView>
    </View>
  );
};

export default QuestionBankScreen;
