import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ContactOption from 'components/auth/ForgotPass/ContactOption';
import PrimaryButton from 'components/ui/PrimaryButton';
import { router } from 'expo-router';
import Header from 'components/ui/Header';

const ForgotPasswordScreen = () => {
  const [selected, setSelected] = useState<'email' | 'sms'>('email');

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="" />
      <View className="px-5 pt-5">
        <Text className="text-3xl font-extrabold text-gray-900">Forgot{'\n'}Password ?</Text>
        <Text className="mt-2 leading-5 text-gray-500">
          Don’t worry! It happens. Please select the email or number associated with your account.
        </Text>

        <View className="mt-6 gap-5 space-y-4">
          <ContactOption
            type="email"
            value="example@youremail.com"
            selected={selected === 'email'}
            onPress={() => setSelected('email')}
          />
          <ContactOption
            type="sms"
            value="+62-8421-4512-2531"
            selected={selected === 'sms'}
            onPress={() => setSelected('sms')}
          />
        </View>

        <View className="mt-10">
          <PrimaryButton label="Submit" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
