import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Title from 'components/auth/Login/Title';
import InputField from 'components/ui/InputField';
import CheckboxWithLabel from 'components/auth/Login/CheckboxWithLabel';
import PrimaryButton from 'components/ui/PrimaryButton';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomAlert from '../../../components/ui/CustomAlert';
import { API_BASE_URL } from 'utils/api';

interface SavedCredential {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: string;
  role: string;
  firstname?: string;
}

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [savedCredentials, setSavedCredentials] = useState<SavedCredential[]>([]);
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);

  const router = useRouter();

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const credsStr = await AsyncStorage.getItem('savedCredentials');
        if (credsStr) {
          const creds: SavedCredential[] = JSON.parse(credsStr);
          setSavedCredentials(creds);
          if (creds.length > 0) {
            setPickerVisible(true);
          }
        }
      } catch (err) {
        console.log('Error loading saved credentials:', err);
      }
    };
    loadSavedCredentials();
  }, []);

  const selectSavedCredential = (cred: SavedCredential) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setRememberMe(true);
    setPickerVisible(false);
  };

  const saveCredential = async (emailToSave: string, passwordToSave: string) => {
    try {
      let updatedCreds = [...savedCredentials];
      const index = updatedCreds.findIndex(
        (c) => c.email.toLowerCase() === emailToSave.toLowerCase()
      );
      if (index >= 0) {
        updatedCreds[index] = { email: emailToSave, password: passwordToSave };
      } else {
        updatedCreds.push({ email: emailToSave, password: passwordToSave });
      }
      await AsyncStorage.setItem('savedCredentials', JSON.stringify(updatedCreds));
      setSavedCredentials(updatedCreds);
    } catch (e) {
      console.log('Error saving credentials:', e);
    }
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      showAlert('Validation Error', 'Email field is required');
      return;
    }
    if (!password.trim()) {
      showAlert('Validation Error', 'Password field is required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      const { token, userId, role, firstname } = response.data;

      // Save token + user data securely in AsyncStorage
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify({ userId, role, firstname }));

      // Save credentials if "Remember Me" checked
      if (rememberMe) {
        await saveCredential(email.trim().toLowerCase(), password.trim());
      }

      showAlert('Login', 'Successful');
      router.replace('/navigation/drawer');
    } catch (error: any) {
      showAlert(
        'Login Failed',
        error.response?.data?.message || 'Incorrect email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Title title1={'Empower\nYour Skills'} title2={'Explore Top\nPlacements'} />
      <View className="mx-5 mt-2">
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          required
          frontIcon={<Feather name="user" size={24} color="#999" />}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChangeText={setPassword}
          required
          frontIcon={<MaterialIcons name="password" size={24} color="#999" />}
        />
      </View>

      <View className="mx-6 mb-6 mt-1 flex-row items-center justify-between">
        <CheckboxWithLabel
          checked={rememberMe}
          onToggle={() => setRememberMe(!rememberMe)}
          label="Remember me"
        />
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: 'screens/auth/ForgotPasswordScreen',
              params: { email },
            })
          }>
          <Text className="text-sm font-medium text-[#1877F2]">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton label="Login" onPress={handleLogin} />

      <Modal transparent visible={pickerVisible} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-8">
          <View className="w-full bg-white rounded-lg p-6">
            <Text className="text-lg font-semibold mb-4">Select saved account</Text>
            <FlatList
              data={savedCredentials}
              keyExtractor={(item) => item.email}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => selectSavedCredential(item)}
                  className="border border-gray-300 rounded p-3 mb-2"
                >
                  <Text className="text-base text-gray-900">{item.email}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text className="text-center text-gray-500">No saved accounts</Text>
              }
            />
            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              className="mt-4 bg-gray-200 rounded py-2"
            >
              <Text className="text-center text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={loading}>
        <View className="flex-1 items-center justify-center bg-white/80">
          <LottieView
            source={require('../../../assets/images/loader.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
          <Text style={{  color: 'white', fontSize: 16 }}>Logging in...</Text>
        </View>
      </Modal>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;
