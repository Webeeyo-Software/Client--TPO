import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import Header from 'components/ui/Header';
import ProfileCard from 'components/profile/ProfileCard';
import DetailsCard from 'components/profile/DetailsCard';


import PrimaryButton from 'components/ui/PrimaryButton';
import { useRouter } from 'expo-router';
const ProfileScreen = () => {
  const router = useRouter();
  return(
    <View className="flex-1 bg-white ">
      <Header title="Profile" />
      <ProfileCard/>
      <ScrollView className="">
      <DetailsCard label="Personal Details" onPress={() => router.push('/app/screens/profile/PersonalDetails.tsx')}  />
      <DetailsCard label="Address Details" onPress={() => router.push('/app/screens/profile/AddressDetails.tsx')} />
      <DetailsCard label="Examination Details" onPress={() => router.push('/app/screens/profile/ExaminationDetails.tsx')} />
      <DetailsCard label="Academics" onPress={() => router.push('/app/screens/profile/Academics.tsx')} />
      <DetailsCard label="Offer Letter" onPress={() => router.push('/app/screens/profile/OfferLetter.tsx')} />
      <DetailsCard label="Upload CV" onPress={() => router.push('/app/screens/profile/UploadCV.tsx')} />
      <PrimaryButton label="Save Changes" onPress={() => {}}  />
      
      </ScrollView>
      </View>
  
  );
}
export default ProfileScreen;