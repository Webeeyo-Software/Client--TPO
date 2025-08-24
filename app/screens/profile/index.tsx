
import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Header from 'components/ui/Header';
import ProfileCard from 'components/profile/ProfileCard';
import DetailsCard from 'components/profile/DetailsCard';
import PrimaryButton from 'components/ui/PrimaryButton';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const handleSave = () => {
    Alert.alert("Success",
      "Your changes have been saved successfully.",
      [{ text: "OK" }]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Profile" />
      <ProfileCard />
      <ScrollView>
        <DetailsCard label="Personal Details" onPress={() => {}} />
        <DetailsCard label="Address Details" onPress={() => {}} />
        <DetailsCard label="Examination Details" onPress={() => {}} />
        <DetailsCard label="Academics" onPress={() => {}} />
        <DetailsCard label="Offer Letter" onPress={() => router.push('/dashboard')} />
        <DetailsCard label="Upload CV" onPress={() => {}} />
        <PrimaryButton 
          label="Save Changes" 
          onPress={handleSave} 
          variant="save"  
        />
      </ScrollView>
    </View>
  );
}
