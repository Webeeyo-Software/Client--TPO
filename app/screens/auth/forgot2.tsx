import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Header from 'components/ui/Header';
import InputField from 'components/ui/InputField';
import PrimaryButton from 'components/ui/PrimaryButton';
import { useRouter } from 'expo-router';

const forgot2 = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const router = useRouter();



  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="" />
      <View className="px-5 pt-5">
        <Text className="text-3xl font-extrabold text-gray-900">Forgot{'\n'}Password ?</Text>
        <Text className="mt-2 leading-5 text-gray-500">
          Don’t worry! it happens. Please enter the address associated with your account.
        </Text>
        <View className='mt-10'>
        <InputField
          label="Email ID/ Mobile Number"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          required
        />
        </View>
      </View>
      <View className="mt-96 pt-36">
        <PrimaryButton label="Submit" onPress={()=>{router.push('screens/auth/otp')}} />
        </View>
    </View>
  );
};

export default forgot2;
