import { SafeAreaView, ScrollView,Alert } from "react-native";
import { useState } from "react";
import OffcampusCard,{OffcampusCardProps} from "components/offCampus/OffCampusCard";
import axios from "axios";
import Header from "components/ui/Header";
import PrimaryButton from "components/ui/PrimaryButton";
import InputField from "components/ui/InputField";

export default function App() {
  const [offCampus, setOffcampus] = useState<OffcampusCardProps[]>([]);
  const [Skill, setSkill] = useState("");
  const [City, setCity] = useState("");
  const fetchCompanies = () => {
    if (!Skill.trim() && !City.trim()) {
    Alert.alert(
      "Missing Input",
      "Please enter a Skill or a City."
    );
    return;
  }
    axios.get("API_URL", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer"
      },
      params: {
          skill: Skill,
          city: City,
        },
    })
    .then((res)=>{
      setOffcampus(res.data.results||[]);
      console.log(res.data.results);
    })

    .catch((err)=>{
      console.error("Failed to fetch off campus card:",err);

    })
  }

 return (
    <ScrollView showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false} 
      className="flex-1 bg-white ">
    <SafeAreaView className="flex-1 bg-white px-2 pt-4">
    <Header title="Off Campus"/>
     <InputField
      placeholder="Enter your Skill"
      value={Skill}
      onChangeText={setSkill}
        required
      />
      <InputField
        placeholder="Enter your city"
        value={City}
        onChangeText={setCity}
        required
      />
     <PrimaryButton label="Fetch" onPress={fetchCompanies}/>

      <OffcampusCard
        company_name="Mastercard"
        overview="Looking for Senior Product Manager Technical - Java"
        location="Pune, Maharashtra"
        date="Thu, 31 Jul 2025"
        description="Potential title and summary: Senior Product Management - Technical - Java Overview"
      />
      <OffcampusCard
        company_name="Mastercard"
        overview="Looking for Senior Product Manager Technical - Java"
        location="Pune, Maharashtra"
        date="Thu, 31 Jul 2025"
        description="Potential title and summary: Senior Product Management - Technical - Java Overview"
      />

    <OffcampusCard
      company_name="Mastercard"
      overview="Looking for Senior Product Manager Technical - Java"
      location="Pune, Maharashtra"
      date="Thu, 31 Jul 2025"
      description="Potential title and summary: Senior Product Management - Technical - Java Overview"
    />
      {/* {offCampus.map((item, index) => (
      <OffcampusCard
          key={index}
          company_name={item.company_name}
          overview={item.overview}
          location={item.location}
          date={item.date}
          description={item.description}
        />
      
      ))} */}
    </SafeAreaView>
    </ScrollView>
  );
}