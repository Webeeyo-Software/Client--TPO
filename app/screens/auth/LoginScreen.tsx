import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Title from '../../../components/auth/Login/Title';
import InputField from '../../../components/ui/InputField';
import CheckboxWithLabel from '../../../components/auth/Login/CheckboxWithLabel';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
const router = useRouter();
  return (
    <View className="flex-1 gap-3 bg-white px-6 pt-14">
      <Title />
      <View>
        <InputField
          label="Username"
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
          required
        />
      </View>
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChangeText={setPassword}
        required
      />

      <View className="mb-6 mt-1 flex-row items-center justify-between">
        <CheckboxWithLabel
          checked={rememberMe}
          onToggle={() => setRememberMe(!rememberMe)}
          label="Remember me"
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-sm font-medium text-[#1877F2]">Forgot the password ?</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton label="Login" onPress={() => {router.push('')}} />
    </View>
  );
};

export default LoginScreen;
