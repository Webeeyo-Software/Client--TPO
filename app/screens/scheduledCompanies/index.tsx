import { View, Text } from "react-native";
import Header from "components/ui/Header";
import JobCard from "components/scheduledCompanies/card";

export default function Index() {
  return (
    <View className="flex-1 bg-white pt-[50px] px-4">
      {/* Header */}
      <Header title="Scheduled Companies" />
      <JobCard
        logo={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png' }}
        company="Microsoft corporation"
        type="Placement"
        mode="Regular"
        date="04-Aug-2025"
        onApply={() => alert("Applied successfully")}
        onMore={() => alert("More details")}
      />
      <JobCard
        logo={{ uri: 'https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo.png' }}
        company="Amazon"
        type="Internship"
        mode="Regular"
        date="04-Aug-2025"
        onApply={() => alert("Applied successfully")}
        onMore={() => alert("More details")}
      />
        <JobCard
            logo={{ uri: 'https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp' }}
            company="Google"
            type="Placement"
            mode="Regular"
            date="04-Aug-2025"
            onApply={() => alert("Applied successfully")}
            onMore={() => alert("More details")}
        />
        <JobCard
            logo={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/018/930/698/small/facebook-logo-facebook-icon-transparent-free-png.png' }}
            company="Facebook"
            type="Placement"
            mode="Regular"
            date="04-Aug-2025"
            onApply={() => alert("Applied successfully")}
            onMore={() => alert("More details")}
        />
    </View>
  );
}
