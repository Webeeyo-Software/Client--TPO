import { View, ScrollView, Alert, Image } from 'react-native';
import { useState } from 'react';
import OffcampusCard, { OffcampusCardProps } from 'components/offCampus/OffCampusCard';
import axios from 'axios';
import Header from 'components/ui/Header';
import PrimaryButton from 'components/ui/PrimaryButton';
import InputField from 'components/ui/InputField';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function App() {
  const [offCampus, setOffcampus] = useState<OffcampusCardProps[]>([]);
  const [Skill, setSkill] = useState('');
  const [City, setCity] = useState('');
  const fetchCompanies = () => {
    if (!Skill.trim() && !City.trim()) {
      Alert.alert('Missing Input', 'Please enter a Skill or a City.');
      return;
    }
    axios
      .get('API_URL', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer',
        },
        params: {
          skill: Skill,
          city: City,
        },
      })
      .then((res) => {
        setOffcampus(res.data.results || []);
        console.log(res.data.results);
      })

      .catch((err) => {
        console.error('Failed to fetch off campus card:', err);
      });
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="Off Campus" mode="normal" />
      <View className="mx-5 mt-5">
        <InputField
          placeholder="Enter your skill"
          value={Skill}
          onChangeText={setSkill}
          frontIcon={
            <Image
              source={require('../../../assets/images/location-pin.png')}
              className="h-5 w-5"
            />
          }
          required
        />
        <InputField
          placeholder="Enter your city"
          value={City}
          onChangeText={setCity}
          frontIcon={
            <Image source={require('../../../assets/images/skill.png')} className="h-5 w-5" />
          }
          required
        />
      </View>
      <PrimaryButton label="Fetch" onPress={fetchCompanies} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className="flex-1 bg-white ">
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
      </ScrollView>
    </View>
  );
}
