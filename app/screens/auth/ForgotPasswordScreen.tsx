import { useState, useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import Header from 'components/ui/Header';
import InputField from 'components/ui/InputField';
import PrimaryButton from 'components/ui/PrimaryButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { API_BASE_URL } from 'utils/api';
import Title from 'components/auth/Login/Title';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current && params?.email) {
      setEmail(params.email as string);
      mounted.current = true;
    }
  }, [params]);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "OTP sent to your email");
        router.push({ pathname: '/screens/auth/otp', params: { email } });
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Header title="" />
      <View className=" mt-4">
        <Title 
        title1={"Forgot  "} 
        title2={"Password..?"} 
      />
        <Text className="text-gray-500 mt-2 mb-8 ml-4">
          Don’t worry! It happens. Enter the email associated with your account.
        </Text>
        <View className="px-4">
        <InputField
          label="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          required
        />
        </View>
        <View className="mt-8">
          <PrimaryButton label={loading ? "Sending..." : "Send OTP"} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
